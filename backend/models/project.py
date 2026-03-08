"""
Project Model
"""
from datetime import datetime
from extensions import db


class Project(db.Model):
    """Project model for storing user projects with layout and code"""
    
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    
    # Layout data for drag-drop builder (JSON structure)
    layout_json = db.Column(db.JSON, nullable=True, default=dict)
    
    # Code files storage (JSON: {filename: content})
    code_files = db.Column(db.JSON, nullable=True, default=dict)
    
    # Project settings
    domain = db.Column(db.String(100), nullable=True, unique=True)
    status = db.Column(db.String(20), default='draft')  # draft, deployed
    deployed_url = db.Column(db.String(255), nullable=True)
    
    # Template reference (if created from template)
    template_id = db.Column(db.Integer, db.ForeignKey('templates.id'), nullable=True)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deployed_at = db.Column(db.DateTime, nullable=True)
    
    def __init__(self, user_id, name, **kwargs):
        self.user_id = user_id
        self.name = name
        self.description = kwargs.get('description')
        self.layout_json = kwargs.get('layout_json', {})
        self.code_files = kwargs.get('code_files', {
            'index.html': '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Website</title>\n</head>\n<body>\n  <h1>Welcome</h1>\n</body>\n</html>',
            'styles.css': '/* Add your styles here */\nbody {\n  font-family: sans-serif;\n}',
            'script.js': '// Add your JavaScript here\nconsole.log("Hello World!");'
        })
        self.template_id = kwargs.get('template_id')
        self.domain = kwargs.get('domain')
    
    def to_dict(self, include_files=False):
        """Serialize project to dictionary"""
        data = {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'domain': self.domain,
            'status': self.status,
            'deployed_url': self.deployed_url,
            'template_id': self.template_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'deployed_at': self.deployed_at.isoformat() if self.deployed_at else None,
        }
        
        if include_files:
            data['layout_json'] = self.layout_json
            data['code_files'] = self.code_files
        
        return data
    
    def __repr__(self):
        return f'<Project {self.name}>'
