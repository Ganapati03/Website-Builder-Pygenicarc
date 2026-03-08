"""
Flask Extensions
Centralized initialization of Flask extensions
"""
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate

# Database
db = SQLAlchemy()

# JWT Authentication
jwt = JWTManager()

# CORS
cors = CORS()

# Database Migrations
migrate = Migrate()
