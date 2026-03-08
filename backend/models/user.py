"""
User Model
"""
from datetime import datetime
from extensions import db
import bcrypt


class User(db.Model):
    """User model for authentication and project ownership"""
    
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    oauth_provider = db.Column(db.String(50), nullable=True)  # 'google', 'github', or null
    oauth_id = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    projects = db.relationship('Project', backref='owner', lazy='dynamic', cascade='all, delete-orphan')
    
    def __init__(self, name, email, password=None, oauth_provider=None, oauth_id=None):
        self.name = name
        self.email = email.lower()
        if password:
            self.set_password(password)
        self.oauth_provider = oauth_provider
        self.oauth_id = oauth_id
    
    def set_password(self, password):
        """Hash and set password"""
        password_bytes = password.encode('utf-8')
        salt = bcrypt.gensalt()
        self.password_hash = bcrypt.hashpw(password_bytes, salt).decode('utf-8')
    
    def check_password(self, password):
        """Verify password"""
        password_bytes = password.encode('utf-8')
        hash_bytes = self.password_hash.encode('utf-8')
        return bcrypt.checkpw(password_bytes, hash_bytes)
    
    def to_dict(self):
        """Serialize user to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'oauth_provider': self.oauth_provider,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
    
    def __repr__(self):
        return f'<User {self.email}>'
