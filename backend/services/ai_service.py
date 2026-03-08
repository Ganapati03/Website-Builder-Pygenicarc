"""
Unified AI Service
Supports Ollama (local) and Google Gemini (cloud) with automatic fallback
"""
import os
import requests
from flask import current_app


class AIService:
    """
    Unified AI service that supports multiple providers:
    - Ollama (local, free, no API key needed)
    - Google Gemini (cloud, requires API key)
    
    Priority: Ollama first, then Gemini as fallback
    """
    
    def __init__(self):
        self.ollama_url = None
        self.ollama_model = None
        self.gemini_api_key = None
        self.gemini_model = None
        self.ai_provider = None
        self._gemini_client = None
    
    def init_app(self, app):
        """Initialize service with app config"""
        self.ollama_url = app.config.get('OLLAMA_BASE_URL', 'http://localhost:11434')
        self.ollama_model = app.config.get('OLLAMA_MODEL', 'llama2')
        self.gemini_api_key = app.config.get('GEMINI_API_KEY')
        self.gemini_model = app.config.get('GEMINI_MODEL', 'gemini-1.5-flash')
        self.ai_provider = app.config.get('AI_PROVIDER', 'auto')
    
    def _get_config(self):
        """Get config from current app context - always reload to pick up env changes"""
        self.ollama_url = current_app.config.get('OLLAMA_BASE_URL', 'http://localhost:11434')
        self.ollama_model = current_app.config.get('OLLAMA_MODEL', 'llama2')
        self.gemini_api_key = current_app.config.get('GEMINI_API_KEY')
        self.gemini_model = current_app.config.get('GEMINI_MODEL', 'gemini-2.5-flash')
        self.ai_provider = current_app.config.get('AI_PROVIDER', 'auto')
    
    def _init_gemini(self):
        """Initialize Gemini client using new google.genai package"""
        self._get_config()
        if self.gemini_api_key:
            try:
                from google import genai
                self._gemini_client = genai.Client(api_key=self.gemini_api_key)
                return self._gemini_client
            except ImportError:
                current_app.logger.warning("google-genai package not installed. Run: pip install google-genai")
                return None
        return None
    
    def _check_ollama_available(self):
        """Check if Ollama is running"""
        try:
            response = requests.get(f"{self.ollama_url}/api/tags", timeout=3)
            return response.status_code == 200
        except:
            return False
    
    def _get_provider(self):
        """Determine which AI provider to use"""
        self._get_config()
        
        if self.ai_provider == 'ollama':
            return 'ollama'
        elif self.ai_provider == 'gemini':
            return 'gemini' if self.gemini_api_key else None
        else:  # auto mode
            if self._check_ollama_available():
                return 'ollama'
            elif self.gemini_api_key:
                return 'gemini'
            return None
    
    def generate(self, prompt, system_prompt=None):
        """
        Generate text using available AI provider
        
        Args:
            prompt: User prompt
            system_prompt: Optional system instruction
            
        Returns:
            dict: Response with generated text or error
        """
        provider = self._get_provider()
        
        if provider == 'ollama':
            return self._generate_ollama(prompt, system_prompt)
        elif provider == 'gemini':
            return self._generate_gemini(prompt, system_prompt)
        else:
            return {
                "success": False,
                "error": "No AI provider available. Please configure Ollama or provide a Gemini API key."
            }
    
    def _generate_ollama(self, prompt, system_prompt=None):
        """Generate using local Ollama"""
        try:
            url = f"{self.ollama_url}/api/generate"
            
            payload = {
                "model": self.ollama_model,
                "prompt": prompt,
                "stream": False
            }
            
            if system_prompt:
                payload["system"] = system_prompt
            
            response = requests.post(url, json=payload, timeout=120)
            response.raise_for_status()
            
            data = response.json()
            
            return {
                "success": True,
                "response": data.get("response", ""),
                "provider": "ollama",
                "model": self.ollama_model
            }
            
        except requests.exceptions.ConnectionError:
            return {
                "success": False,
                "error": "Cannot connect to Ollama. Trying fallback...",
                "fallback": True
            }
        except requests.exceptions.Timeout:
            return {
                "success": False,
                "error": "Ollama request timed out",
                "fallback": True
            }
        except Exception as e:
            return {
                "success": False,
                "error": f"Ollama error: {str(e)}",
                "fallback": True
            }
    
    def _generate_gemini(self, prompt, system_prompt=None):
        """Generate using Google Gemini (new google.genai SDK)"""
        try:
            client = self._init_gemini()
            if not client:
                return {
                    "success": False,
                    "error": "Gemini not configured. Install google-genai and set GEMINI_API_KEY."
                }
            
            # Combine system prompt and user prompt for Gemini
            full_prompt = prompt
            if system_prompt:
                full_prompt = f"{system_prompt}\n\n{prompt}"
            
            response = client.models.generate_content(
                model=self.gemini_model,
                contents=full_prompt
            )
            
            return {
                "success": True,
                "response": response.text,
                "provider": "gemini",
                "model": self.gemini_model
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Gemini error: {str(e)}"
            }
    
    def generate_with_fallback(self, prompt, system_prompt=None):
        """
        Generate with automatic fallback to secondary provider
        """
        self._get_config()
        
        # Try primary provider based on config
        if self.ai_provider == 'ollama' or self.ai_provider == 'auto':
            result = self._generate_ollama(prompt, system_prompt)
            if result.get("success"):
                return result
            
            # Fallback to Gemini
            if self.gemini_api_key and result.get("fallback"):
                return self._generate_gemini(prompt, system_prompt)
            return result
        
        elif self.ai_provider == 'gemini':
            result = self._generate_gemini(prompt, system_prompt)
            if result.get("success"):
                return result
            
            # Fallback to Ollama
            if self._check_ollama_available():
                return self._generate_ollama(prompt, system_prompt)
            return result
        
        return {
            "success": False,
            "error": "No AI provider configured"
        }
    
    def generate_code(self, description, file_type="html"):
        """
        Generate code based on description
        
        Args:
            description: What code to generate
            file_type: Type of file (html, css, js)
            
        Returns:
            dict: Generated code or error
        """
        system_prompt = f"""You are an expert web developer. Generate clean, production-ready {file_type.upper()} code based on user descriptions.
Only output the code, no explanations. Use modern best practices.
For HTML: Use semantic HTML5 elements.
For CSS: Use modern CSS with flexbox/grid. Include responsive design.
For JavaScript: Use modern ES6+ syntax. No jQuery."""
        
        prompt = f"Generate {file_type} code for: {description}"
        
        result = self.generate_with_fallback(prompt, system_prompt=system_prompt)
        
        if result["success"]:
            code = result["response"]
            code = self._clean_code_response(code)
            result["code"] = code
        
        return result
    
    def modify_code(self, current_code, modification_request, file_type="html"):
        """
        Modify existing code based on request
        
        Args:
            current_code: The existing code
            modification_request: What changes to make
            file_type: Type of file
            
        Returns:
            dict: Modified code or error
        """
        system_prompt = f"""You are an expert web developer. Modify the provided {file_type.upper()} code based on user request.
Only output the complete modified code, no explanations. Maintain the existing structure where possible.
Apply the requested changes cleanly."""
        
        prompt = f"""Current code:
```{file_type}
{current_code}
```

Modification requested: {modification_request}

Output the complete modified code:"""
        
        result = self.generate_with_fallback(prompt, system_prompt=system_prompt)
        
        if result["success"]:
            code = result["response"]
            code = self._clean_code_response(code)
            result["code"] = code
        
        return result
    
    def chat(self, message, conversation_history=None):
        """
        Chat with AI assistant about web development
        
        Args:
            message: User message
            conversation_history: List of previous messages
            
        Returns:
            dict: AI response or error
        """
        system_prompt = """You are an AI assistant for a website builder application. 
Help users build websites by:
- Suggesting design improvements
- Explaining how to implement features
- Writing code snippets when asked
- Answering web development questions
Be concise and practical."""
        
        # Build conversation context
        if conversation_history:
            context_text = "\n".join([
                f"{'User' if msg['role'] == 'user' else 'Assistant'}: {msg['content']}"
                for msg in conversation_history[-5:]  # Last 5 messages for context
            ])
            prompt = f"Previous conversation:\n{context_text}\n\nUser: {message}\nAssistant:"
        else:
            prompt = message
        
        return self.generate_with_fallback(prompt, system_prompt=system_prompt)
    
    def suggest_improvements(self, code, file_type="html"):
        """
        Suggest improvements for existing code
        
        Args:
            code: The code to analyze
            file_type: Type of file
            
        Returns:
            dict: List of suggestions or error
        """
        system_prompt = """You are an expert code reviewer. Analyze the provided code and suggest improvements.
Focus on:
- Accessibility improvements
- Performance optimizations
- Best practices
- Modern syntax updates
Provide 3-5 specific, actionable suggestions."""
        
        prompt = f"""Analyze this {file_type.upper()} code and suggest improvements:

```{file_type}
{code}
```

Provide specific suggestions:"""
        
        return self.generate_with_fallback(prompt, system_prompt=system_prompt)
    
    def _clean_code_response(self, code):
        """Remove markdown code blocks from response"""
        code = code.strip()
        
        if code.startswith("```"):
            lines = code.split("\n")
            # Remove first line (```language)
            lines = lines[1:]
            # Remove last line if it's closing ```
            if lines and lines[-1].strip().startswith("```"):
                lines = lines[:-1]
            code = "\n".join(lines)
        
        return code.strip()
    
    def health_check(self):
        """
        Check status of all AI providers
        
        Returns:
            dict: Health status of providers
        """
        self._get_config()
        
        status = {
            "ollama": {"available": False, "models": []},
            "gemini": {"available": False, "configured": False},
            "active_provider": None
        }
        
        # Check Ollama
        try:
            response = requests.get(f"{self.ollama_url}/api/tags", timeout=5)
            if response.status_code == 200:
                data = response.json()
                models = [m["name"] for m in data.get("models", [])]
                status["ollama"] = {
                    "available": True,
                    "models": models,
                    "configured_model": self.ollama_model,
                    "model_available": self.ollama_model in models or any(self.ollama_model in m for m in models)
                }
        except:
            pass
        
        # Check Gemini
        if self.gemini_api_key:
            status["gemini"]["configured"] = True
            try:
                client = self._init_gemini()
                if client:
                    status["gemini"]["available"] = True
                    status["gemini"]["model"] = self.gemini_model
            except:
                pass
        
        # Determine active provider
        provider = self._get_provider()
        status["active_provider"] = provider
        
        return status


# Singleton instance
ai_service = AIService()
