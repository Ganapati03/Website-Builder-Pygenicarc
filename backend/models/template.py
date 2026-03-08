"""
Template Model
"""
from datetime import datetime
from extensions import db


class Template(db.Model):
    """Template model for pre-built website templates"""
    
    __tablename__ = 'templates'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False, index=True)
    description = db.Column(db.Text, nullable=True)
    
    # Template structure (JSON containing components/layout)
    structure_json = db.Column(db.JSON, nullable=False, default=dict)
    
    # Default code files for template
    default_files = db.Column(db.JSON, nullable=True, default=dict)
    
    # Preview image URL
    preview_image = db.Column(db.String(500), nullable=True)
    
    # Metadata
    is_premium = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    usage_count = db.Column(db.Integer, default=0)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    projects = db.relationship('Project', backref='template', lazy='dynamic')
    
    def __init__(self, name, category, **kwargs):
        self.name = name
        self.category = category
        self.description = kwargs.get('description')
        self.structure_json = kwargs.get('structure_json', {})
        self.default_files = kwargs.get('default_files', {})
        self.preview_image = kwargs.get('preview_image')
        self.is_premium = kwargs.get('is_premium', False)
    
    def increment_usage(self):
        """Increment usage counter"""
        self.usage_count = (self.usage_count or 0) + 1
    
    def to_dict(self, include_structure=False):
        """Serialize template to dictionary"""
        data = {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'description': self.description,
            'preview_image': self.preview_image,
            'is_premium': self.is_premium,
            'usage_count': self.usage_count,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
        
        if include_structure:
            data['structure_json'] = self.structure_json
            data['default_files'] = self.default_files
        
        return data
    
    def __repr__(self):
        return f'<Template {self.name}>'
