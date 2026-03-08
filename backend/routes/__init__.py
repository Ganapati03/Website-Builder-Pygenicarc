"""
Routes Package
"""
from .auth import auth_bp
from .projects import projects_bp
from .templates import templates_bp
from .ai import ai_bp

__all__ = ['auth_bp', 'projects_bp', 'templates_bp', 'ai_bp']
