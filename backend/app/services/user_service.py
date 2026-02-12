from ..repositories.base import UserRepository

class UserService:
    @staticmethod
    def list_users():
        return [user.to_dict() for user in UserRepository.get_all()]
    
    @staticmethod
    def create_user(data):
        if not data.get('name') or not data.get('email'):
            raise ValueError("Nombre y email son requeridos")
        
        existing = UserRepository.get_by_email(data['email'])
        if existing:
            raise ValueError("El email ya está registrado")
            
        password = data.get('password', '123') 
        user = UserRepository.create(data['name'], data['email'], password)
        return user.to_dict()

    @staticmethod
    def authenticate(email, password):
        user = UserRepository.get_by_email(email)
        if user and user.password == password:
            return user
        return None
