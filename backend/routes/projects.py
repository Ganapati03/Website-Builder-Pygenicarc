"""
Project Routes
Handles CRUD operations for user projects
"""
from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.project import Project
from models.template import Template

projects_bp = Blueprint('projects', __name__, url_prefix='/api/projects')


@projects_bp.route('', methods=['POST'])
@jwt_required()
def create_project():
    """
    Create a new project
    
    Request Body:
        - name: string (required)
        - description: string (optional)
        - template_id: int (optional, to create from template)
        - layout_json: dict (optional)
        - code_files: dict (optional)
    
    Returns:
        - project: Project object
    """
    user_id = int(get_jwt_identity())
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    name = data.get('name', '').strip()
    
    if not name:
        return jsonify({'error': 'Project name is required'}), 400
    
    # Check for duplicate name per user
    existing = Project.query.filter_by(user_id=user_id, name=name).first()
    if existing:
        return jsonify({'error': 'A project with this name already exists'}), 409
    
    try:
        # If creating from template
        template_id = data.get('template_id')
        layout_json = data.get('layout_json', {})
        code_files = data.get('code_files')
        
        if template_id:
            template = Template.query.get(template_id)
            if template:
                layout_json = template.structure_json or {}
                code_files = template.default_files or {}
                template.increment_usage()
        
        project = Project(
            user_id=user_id,
            name=name,
            description=data.get('description'),
            layout_json=layout_json,
            code_files=code_files,
            template_id=template_id
        )
        
        db.session.add(project)
        db.session.commit()
        
        return jsonify({
            'message': 'Project created successfully',
            'project': project.to_dict(include_files=True)
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to create project', 'details': str(e)}), 500


@projects_bp.route('', methods=['GET'])
@jwt_required()
def get_projects():
    """
    Get all projects for current user
    
    Query Parameters:
        - status: string (optional, filter by status)
        - search: string (optional, search by name)
        - sort: string (optional, 'name', 'created_at', 'updated_at')
        - order: string (optional, 'asc' or 'desc', default 'desc')
    
    Returns:
        - projects: List of Project objects
    """
    user_id = int(get_jwt_identity())
    
    # Base query
    query = Project.query.filter_by(user_id=user_id)
    
    # Filter by status
    status = request.args.get('status')
    if status:
        query = query.filter_by(status=status)
    
    # Search by name
    search = request.args.get('search', '').strip()
    if search:
        query = query.filter(Project.name.ilike(f'%{search}%'))
    
    # Sorting
    sort_by = request.args.get('sort', 'updated_at')
    order = request.args.get('order', 'desc')
    
    if sort_by == 'name':
        sort_column = Project.name
    elif sort_by == 'created_at':
        sort_column = Project.created_at
    else:
        sort_column = Project.updated_at
    
    if order == 'asc':
        query = query.order_by(sort_column.asc())
    else:
        query = query.order_by(sort_column.desc())
    
    projects = query.all()
    
    return jsonify({
        'projects': [p.to_dict() for p in projects],
        'total': len(projects)
    }), 200


@projects_bp.route('/<int:project_id>', methods=['GET'])
@jwt_required()
def get_project(project_id):
    """
    Get a specific project
    
    URL Parameters:
        - project_id: int
    
    Query Parameters:
        - include_files: bool (default True)
    
    Returns:
        - project: Project object with files
    """
    user_id = int(get_jwt_identity())
    
    project = Project.query.filter_by(id=project_id, user_id=user_id).first()
    
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    include_files = request.args.get('include_files', 'true').lower() == 'true'
    
    return jsonify({
        'project': project.to_dict(include_files=include_files)
    }), 200


@projects_bp.route('/<int:project_id>', methods=['PUT'])
@jwt_required()
def update_project(project_id):
    """
    Update a project
    
    URL Parameters:
        - project_id: int
    
    Request Body:
        - name: string (optional)
        - description: string (optional)
        - layout_json: dict (optional)
        - code_files: dict (optional)
        - domain: string (optional)
    
    Returns:
        - project: Updated Project object
    """
    user_id = int(get_jwt_identity())
    
    project = Project.query.filter_by(id=project_id, user_id=user_id).first()
    
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    try:
        # Update fields if provided
        if 'name' in data:
            name = data['name'].strip()
            if name:
                # Check for duplicate name
                existing = Project.query.filter(
                    Project.user_id == user_id,
                    Project.name == name,
                    Project.id != project_id
                ).first()
                if existing:
                    return jsonify({'error': 'A project with this name already exists'}), 409
                project.name = name
        
        if 'description' in data:
            project.description = data['description']
        
        if 'layout_json' in data:
            project.layout_json = data['layout_json']
        
        if 'code_files' in data:
            project.code_files = data['code_files']
        
        if 'domain' in data:
            domain = data['domain'].strip().lower() if data['domain'] else None
            if domain:
                # Check domain uniqueness
                existing = Project.query.filter(
                    Project.domain == domain,
                    Project.id != project_id
                ).first()
                if existing:
                    return jsonify({'error': 'This domain is already taken'}), 409
            project.domain = domain
        
        project.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Project updated successfully',
            'project': project.to_dict(include_files=True)
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update project', 'details': str(e)}), 500


@projects_bp.route('/<int:project_id>', methods=['DELETE'])
@jwt_required()
def delete_project(project_id):
    """
    Delete a project
    
    URL Parameters:
        - project_id: int
    
    Returns:
        - message: Success message
    """
    user_id = int(get_jwt_identity())
    
    project = Project.query.filter_by(id=project_id, user_id=user_id).first()
    
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    try:
        db.session.delete(project)
        db.session.commit()
        
        return jsonify({
            'message': 'Project deleted successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete project', 'details': str(e)}), 500


@projects_bp.route('/<int:project_id>/deploy', methods=['POST'])
@jwt_required()
def deploy_project(project_id):
    """
    Deploy a project
    
    URL Parameters:
        - project_id: int
    
    Request Body:
        - domain: string (required)
        - enable_ssl: bool (optional, default True)
    
    Returns:
        - project: Updated Project object with deployment info
    """
    user_id = int(get_jwt_identity())
    
    project = Project.query.filter_by(id=project_id, user_id=user_id).first()
    
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    data = request.get_json() or {}
    domain = data.get('domain', '').strip().lower()
    
    if not domain:
        # Generate domain from project name if not provided
        domain = project.name.lower().replace(' ', '-')
        # Remove special characters
        domain = ''.join(c for c in domain if c.isalnum() or c == '-')
    
    # Check domain uniqueness
    existing = Project.query.filter(
        Project.domain == domain,
        Project.id != project_id
    ).first()
    
    if existing:
        return jsonify({'error': 'This domain is already taken'}), 409
    
    try:
        project.domain = domain
        project.status = 'deployed'
        project.deployed_url = f"{domain}.webbuilder.ai"
        project.deployed_at = datetime.utcnow()
        project.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'message': 'Project deployed successfully',
            'project': project.to_dict(),
            'deployed_url': project.deployed_url
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to deploy project', 'details': str(e)}), 500


@projects_bp.route('/<int:project_id>/files/<path:filename>', methods=['PUT'])
@jwt_required()
def update_file(project_id, filename):
    """
    Update a specific file in a project
    
    URL Parameters:
        - project_id: int
        - filename: string (e.g., 'index.html', 'src/styles.css')
    
    Request Body:
        - content: string (file content)
    
    Returns:
        - message: Success message
        - file: Updated file info
    """
    user_id = int(get_jwt_identity())
    
    project = Project.query.filter_by(id=project_id, user_id=user_id).first()
    
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    data = request.get_json()
    
    if not data or 'content' not in data:
        return jsonify({'error': 'File content is required'}), 400
    
    try:
        code_files = project.code_files or {}
        code_files[filename] = data['content']
        project.code_files = code_files
        project.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'message': 'File updated successfully',
            'file': {
                'name': filename,
                'content': data['content']
            }
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update file', 'details': str(e)}), 500
