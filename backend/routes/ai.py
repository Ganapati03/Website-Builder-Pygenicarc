"""
AI Routes
Handles AI-powered code generation and chat
Supports Ollama (local) and Gemini (cloud) with automatic fallback
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.ai_service import ai_service

ai_bp = Blueprint('ai', __name__, url_prefix='/api/ai')


@ai_bp.route('/generate', methods=['POST'])
@jwt_required()
def generate_code():
    """
    Generate code using AI
    
    Request Body:
        - prompt: string (required, description of what to generate)
        - file_type: string (optional, 'html', 'css', 'js', default 'html')
    
    Returns:
        - code: Generated code string
        - file_type: Type of file generated
    """
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    prompt = data.get('prompt', '').strip()
    file_type = data.get('file_type', 'html').lower()
    
    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400
    
    if file_type not in ['html', 'css', 'js', 'javascript']:
        return jsonify({'error': 'Invalid file type. Use: html, css, js'}), 400
    
    # Normalize file type
    if file_type == 'javascript':
        file_type = 'js'
    
    result = ai_service.generate_code(prompt, file_type)
    
    if result['success']:
        return jsonify({
            'success': True,
            'code': result.get('code', result.get('response', '')),
            'file_type': file_type,
            'provider': result.get('provider', 'unknown')
        }), 200
    else:
        return jsonify({
            'success': False,
            'error': result.get('error', 'Failed to generate code')
        }), 500


@ai_bp.route('/modify', methods=['POST'])
@jwt_required()
def modify_code():
    """
    Modify existing code using AI
    
    Request Body:
        - code: string (required, current code)
        - modification: string (required, what changes to make)
        - file_type: string (optional, 'html', 'css', 'js', default 'html')
    
    Returns:
        - code: Modified code string
        - file_type: Type of file
    """
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    code = data.get('code', '')
    modification = data.get('modification', '').strip()
    file_type = data.get('file_type', 'html').lower()
    
    if not code:
        return jsonify({'error': 'Current code is required'}), 400
    
    if not modification:
        return jsonify({'error': 'Modification description is required'}), 400
    
    # Normalize file type
    if file_type == 'javascript':
        file_type = 'js'
    
    result = ai_service.modify_code(code, modification, file_type)
    
    if result['success']:
        return jsonify({
            'success': True,
            'code': result.get('code', result.get('response', '')),
            'file_type': file_type,
            'provider': result.get('provider', 'unknown')
        }), 200
    else:
        return jsonify({
            'success': False,
            'error': result.get('error', 'Failed to modify code')
        }), 500


@ai_bp.route('/chat', methods=['POST'])
@jwt_required()
def chat():
    """
    Chat with AI assistant
    
    Request Body:
        - message: string (required, user message)
        - history: array (optional, conversation history)
    
    Returns:
        - response: AI response string
        - role: 'ai'
    """
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    message = data.get('message', '').strip()
    history = data.get('history', [])
    
    if not message:
        return jsonify({'error': 'Message is required'}), 400
    
    result = ai_service.chat(message, history)
    
    if result['success']:
        return jsonify({
            'success': True,
            'response': result.get('response', ''),
            'role': 'ai',
            'provider': result.get('provider', 'unknown')
        }), 200
    else:
        return jsonify({
            'success': False,
            'error': result.get('error', 'Failed to get response')
        }), 500


@ai_bp.route('/health', methods=['GET'])
def health_check():
    """
    Check AI service health
    
    Returns:
        - healthy: boolean
        - ollama: Ollama status
        - gemini: Gemini status
        - active_provider: Currently active provider
    """
    status = ai_service.health_check()
    is_healthy = status.get('active_provider') is not None
    
    return jsonify({
        'healthy': is_healthy,
        **status
    }), 200 if is_healthy else 503


@ai_bp.route('/suggest', methods=['POST'])
@jwt_required()
def suggest():
    """
    Get AI suggestions for website improvements
    
    Request Body:
        - context: string (description of current page/project)
        - suggestion_type: string ('design', 'content', 'feature', 'seo')
    
    Returns:
        - suggestions: array of suggestion strings
    """
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    context = data.get('context', '').strip()
    suggestion_type = data.get('suggestion_type', 'design')
    
    if not context:
        return jsonify({'error': 'Context is required'}), 400
    
    prompts = {
        'design': f"Suggest 3-5 design improvements for a website with: {context}. Be specific and actionable.",
        'content': f"Suggest 3-5 content improvements for a website with: {context}. Focus on messaging and copy.",
        'feature': f"Suggest 3-5 features to add to a website with: {context}. Focus on user experience.",
        'seo': f"Suggest 3-5 SEO improvements for a website with: {context}. Be specific about meta tags, structure, etc."
    }
    
    prompt = prompts.get(suggestion_type, prompts['design'])
    
    result = ai_service.generate_with_fallback(prompt, system_prompt="You are a web design expert. Give concise, actionable suggestions. Format as a numbered list.")
    
    if result['success']:
        # Parse suggestions from response
        response_text = result.get('response', '')
        suggestions = [line.strip() for line in response_text.split('\n') if line.strip() and line.strip()[0].isdigit()]
        
        return jsonify({
            'success': True,
            'suggestions': suggestions if suggestions else [response_text],
            'type': suggestion_type,
            'provider': result.get('provider', 'unknown')
        }), 200
    else:
        return jsonify({
            'success': False,
            'error': result.get('error', 'Failed to get suggestions')
        }), 500
