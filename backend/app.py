"""
WebBuilder AI - Flask Backend Application
Production-ready backend for the WebBuilder AI website builder
"""
import os
from flask import Flask, jsonify
from config import config
from extensions import db, jwt, cors, migrate


def create_app(config_name=None):
    """
    Application factory for creating Flask app instances
    
    Args:
        config_name: Configuration name ('development', 'production', 'testing')
    
    Returns:
        Flask application instance
    """
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    
    # Configure CORS
    cors.init_app(app, 
        origins=app.config['CORS_ORIGINS'],
        supports_credentials=True,
        allow_headers=['Content-Type', 'Authorization'],
        methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    )
    
    # Initialize AI services
    from services.ollama_service import ollama_service
    from services.ai_service import ai_service
    ollama_service.init_app(app)
    ai_service.init_app(app)
    
    # Register blueprints
    from routes import auth_bp, projects_bp, templates_bp, ai_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(projects_bp)
    app.register_blueprint(templates_bp)
    app.register_blueprint(ai_bp)
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        """API health check endpoint"""
        return jsonify({
            'status': 'healthy',
            'service': 'WebBuilder AI Backend',
            'version': '1.0.0'
        }), 200
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Resource not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return jsonify({'error': 'Internal server error'}), 500
    
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({
            'error': 'Token has expired',
            'code': 'token_expired'
        }), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({
            'error': 'Invalid token',
            'code': 'invalid_token'
        }), 401
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({
            'error': 'Authorization token required',
            'code': 'authorization_required'
        }), 401
    
    return app


# Create app instance
app = create_app()


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=int(os.getenv('PORT', 5000)),
        debug=app.config['DEBUG']
    )
