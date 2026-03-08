"""
Authentication Routes
Handles user registration, login, and profile
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from extensions import db
from models.user import User

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Register a new user
    
    Request Body:
        - name: string (required)
        - email: string (required)
        - password: string (required, min 6 chars)
    
    Returns:
        - user: User object
        - access_token: JWT token
    """
    data = request.get_json()
    
    # Validate required fields
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    
    if not name:
        return jsonify({'error': 'Name is required'}), 400
    
    if not email:
        return jsonify({'error': 'Email is required'}), 400
    
    if not password or len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters'}), 400
    
    # Check if user exists
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 409
    
    # Create user
    try:
        user = User(name=name, email=email, password=password)
        db.session.add(user)
        db.session.commit()
        
        # Generate token
        access_token = create_access_token(identity=str(user.id))
        
        return jsonify({
            'message': 'Registration successful',
            'user': user.to_dict(),
            'access_token': access_token
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Registration failed', 'details': str(e)}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Login user
    
    Request Body:
        - email: string (required)
        - password: string (required)
    
    Returns:
        - user: User object
        - access_token: JWT token
    """
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400
    
    # Find user
    user = User.query.filter_by(email=email).first()
    
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Generate token
    access_token = create_access_token(identity=str(user.id))
    
    return jsonify({
        'message': 'Login successful',
        'user': user.to_dict(),
        'access_token': access_token
    }), 200


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """
    Get current authenticated user
    
    Headers:
        - Authorization: Bearer <token>
    
    Returns:
        - user: User object
    """
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'user': user.to_dict()
    }), 200


@auth_bp.route('/oauth/callback', methods=['POST'])
def oauth_callback():
    """
    Handle OAuth callback (Google/GitHub)
    
    Request Body:
        - provider: string ('google' or 'github')
        - oauth_id: string (unique ID from provider)
        - email: string
        - name: string
    
    Returns:
        - user: User object
        - access_token: JWT token
    """
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    provider = data.get('provider')
    oauth_id = data.get('oauth_id')
    email = data.get('email', '').strip().lower()
    name = data.get('name', '').strip()
    
    if not provider or not oauth_id or not email:
        return jsonify({'error': 'Provider, oauth_id, and email are required'}), 400
    
    if provider not in ['google', 'github']:
        return jsonify({'error': 'Invalid OAuth provider'}), 400
    
    # Check for existing OAuth user
    user = User.query.filter_by(oauth_provider=provider, oauth_id=oauth_id).first()
    
    if user:
        # Existing OAuth user - login
        access_token = create_access_token(identity=str(user.id))
        return jsonify({
            'message': 'Login successful',
            'user': user.to_dict(),
            'access_token': access_token
        }), 200
    
    # Check if email exists (link accounts)
    user = User.query.filter_by(email=email).first()
    
    if user:
        # Update existing user with OAuth info
        user.oauth_provider = provider
        user.oauth_id = oauth_id
        db.session.commit()
        
        access_token = create_access_token(identity=str(user.id))
        return jsonify({
            'message': 'Account linked successfully',
            'user': user.to_dict(),
            'access_token': access_token
        }), 200
    
    # Create new OAuth user (with placeholder password)
    try:
        user = User(
            name=name or email.split('@')[0],
            email=email,
            password='oauth_placeholder_' + oauth_id,  # Won't be used for login
            oauth_provider=provider,
            oauth_id=oauth_id
        )
        db.session.add(user)
        db.session.commit()
        
        access_token = create_access_token(identity=str(user.id))
        
        return jsonify({
            'message': 'Registration successful',
            'user': user.to_dict(),
            'access_token': access_token
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Registration failed', 'details': str(e)}), 500


@auth_bp.route('/change-password', methods=['PUT'])
@jwt_required()
def change_password():
    """
    Change user password
    
    Request Body:
        - current_password: string
        - new_password: string (min 6 chars)
    
    Returns:
        - message: Success message
    """
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    data = request.get_json()
    current_password = data.get('current_password', '')
    new_password = data.get('new_password', '')
    
    if not user.check_password(current_password):
        return jsonify({'error': 'Current password is incorrect'}), 401
    
    if len(new_password) < 6:
        return jsonify({'error': 'New password must be at least 6 characters'}), 400
    
    user.set_password(new_password)
    db.session.commit()
    
    return jsonify({'message': 'Password changed successfully'}), 200
