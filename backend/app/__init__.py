import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta
from .database import db, init_db
from .api.routes import api_bp

def create_app():
    app = Flask(__name__)
    
    # Configurations
    db_url = os.getenv('DATABASE_URL')
    if db_url and db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql://", 1)
        
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-1234')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=2)
    
    # Initialize Extensions
    CORS(app)
    db.init_app(app)
    JWTManager(app)
    
    # Register Blueprints
    app.register_blueprint(api_bp, url_prefix='/api')
    
    # Create DB tables
    with app.app_context():
        from .models.user import User, Transaction
        try:
            # Usar la nueva función de inicialización que contiene el SQL manual
            init_db(app)
            
            # Seed initial data if empty
            if not User.query.first():
                from .services.user_service import UserService
                UserService.create_user({"name": "Juan Perez", "email": "juan@example.com", "password": "123"})
                UserService.create_user({"name": "Maria Garcia", "email": "maria@example.com", "password": "123"})
        except Exception as e:
            print(f"Error connecting to database: {e}")

    return app
