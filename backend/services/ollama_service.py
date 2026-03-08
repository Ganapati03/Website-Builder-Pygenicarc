"""
Ollama AI Service
Handles communication with local Ollama LLM endpoint
"""
import requests
from flask import current_app


class OllamaService:
    """Service for interacting with local Ollama instance"""
    
    def __init__(self):
        self.base_url = None
        self.model = None
    
    def init_app(self, app):
        """Initialize service with app config"""
        self.base_url = app.config.get('OLLAMA_BASE_URL', 'http://localhost:11434')
        self.model = app.config.get('OLLAMA_MODEL', 'llama2')
    
    def _get_config(self):
        """Get config from current app context"""
        if self.base_url is None:
            self.base_url = current_app.config.get('OLLAMA_BASE_URL', 'http://localhost:11434')
            self.model = current_app.config.get('OLLAMA_MODEL', 'llama2')
    
    def generate(self, prompt, context=None, system_prompt=None):
        """
        Generate text using Ollama
        
        Args:
            prompt: User prompt
            context: Optional conversation context
            system_prompt: Optional system instruction
            
        Returns:
            dict: Response with generated text or error
        """
        self._get_config()
        
        try:
            url = f"{self.base_url}/api/generate"
            
            payload = {
                "model": self.model,
                "prompt": prompt,
                "stream": False
            }
            
            if system_prompt:
                payload["system"] = system_prompt
            
            if context:
                payload["context"] = context
            
            response = requests.post(url, json=payload, timeout=120)
            response.raise_for_status()
            
            data = response.json()
            
            return {
                "success": True,
                "response": data.get("response", ""),
                "context": data.get("context"),
                "model": self.model
            }
            
        except requests.exceptions.ConnectionError:
            return {
                "success": False,
                "error": "Cannot connect to Ollama. Ensure Ollama is running on localhost:11434"
            }
        except requests.exceptions.Timeout:
            return {
                "success": False,
                "error": "Request to Ollama timed out. Try a shorter prompt."
            }
        except requests.exceptions.RequestException as e:
            return {
                "success": False,
                "error": f"Ollama request failed: {str(e)}"
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
        
        result = self.generate(prompt, system_prompt=system_prompt)
        
        if result["success"]:
            # Clean up code block markers if present
            code = result["response"]
            code = code.strip()
            
            # Remove markdown code blocks if present
            if code.startswith("```"):
                lines = code.split("\n")
                lines = lines[1:-1] if lines[-1].startswith("```") else lines[1:]
                code = "\n".join(lines)
            
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
        
        result = self.generate(prompt, system_prompt=system_prompt)
        
        if result["success"]:
            code = result["response"]
            code = code.strip()
            
            if code.startswith("```"):
                lines = code.split("\n")
                lines = lines[1:-1] if lines[-1].startswith("```") else lines[1:]
                code = "\n".join(lines)
            
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
        
        return self.generate(prompt, system_prompt=system_prompt)
    
    def health_check(self):
        """
        Check if Ollama is running and accessible
        
        Returns:
            dict: Health status
        """
        self._get_config()
        
        try:
            response = requests.get(f"{self.base_url}/api/tags", timeout=5)
            response.raise_for_status()
            
            data = response.json()
            models = [m["name"] for m in data.get("models", [])]
            
            return {
                "healthy": True,
                "available_models": models,
                "configured_model": self.model,
                "model_available": self.model in models or any(self.model in m for m in models)
            }
        except Exception as e:
            return {
                "healthy": False,
                "error": str(e)
            }


# Singleton instance
ollama_service = OllamaService()
