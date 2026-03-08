"""
Template Routes
Handles template listing and retrieval
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models.template import Template

templates_bp = Blueprint('templates', __name__, url_prefix='/api/templates')


@templates_bp.route('', methods=['GET'])
def get_templates():
    """
    Get all active templates
    
    Query Parameters:
        - category: string (optional, filter by category)
        - search: string (optional, search by name)
        - sort: string (optional, 'name', 'usage_count', 'created_at')
    
    Returns:
        - templates: List of Template objects
        - categories: List of unique categories
    """
    # Base query - only active templates
    query = Template.query.filter_by(is_active=True)
    
    # Filter by category
    category = request.args.get('category', '').strip()
    if category and category.lower() != 'all':
        query = query.filter_by(category=category)
    
    # Search by name
    search = request.args.get('search', '').strip()
    if search:
        query = query.filter(Template.name.ilike(f'%{search}%'))
    
    # Sorting
    sort_by = request.args.get('sort', 'usage_count')
    
    if sort_by == 'name':
        query = query.order_by(Template.name.asc())
    elif sort_by == 'created_at':
        query = query.order_by(Template.created_at.desc())
    else:
        query = query.order_by(Template.usage_count.desc())
    
    templates = query.all()
    
    # Get unique categories
    all_categories = Template.query.with_entities(Template.category).distinct().all()
    categories = sorted([c[0] for c in all_categories])
    
    return jsonify({
        'templates': [t.to_dict() for t in templates],
        'categories': categories,
        'total': len(templates)
    }), 200


@templates_bp.route('/<int:template_id>', methods=['GET'])
def get_template(template_id):
    """
    Get a specific template with full structure
    
    URL Parameters:
        - template_id: int
    
    Returns:
        - template: Template object with structure_json
    """
    template = Template.query.filter_by(id=template_id, is_active=True).first()
    
    if not template:
        return jsonify({'error': 'Template not found'}), 404
    
    return jsonify({
        'template': template.to_dict(include_structure=True)
    }), 200


@templates_bp.route('/categories', methods=['GET'])
def get_categories():
    """
    Get all template categories
    
    Returns:
        - categories: List of category names with counts
    """
    from sqlalchemy import func
    
    # Query categories with counts
    results = Template.query \
        .filter_by(is_active=True) \
        .with_entities(Template.category, func.count(Template.id)) \
        .group_by(Template.category) \
        .order_by(func.count(Template.id).desc()) \
        .all()
    
    categories = [
        {'name': cat, 'count': count}
        for cat, count in results
    ]
    
    return jsonify({
        'categories': categories
    }), 200
