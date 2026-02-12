from ..models.user import User, Transaction
from ..database import db

class UserRepository:
    @staticmethod
    def get_all():
        return User.query.all()
    
    @staticmethod
    def get_by_id(user_id):
        return User.query.get(user_id)
    
    @staticmethod
    def get_by_email(email):
        return User.query.filter_by(email=email).first()
    
    @staticmethod
    def create(name, email, password):
        user = User(name=name, email=email, password=password)
        db.session.add(user)
        db.session.commit()
        return user

class TransactionRepository:
    @staticmethod
    def get_by_user_id(user_id):
        return Transaction.query.filter_by(user_id=user_id).order_by(Transaction.created_at.desc()).all()
    
    @staticmethod
    def create(user_id, type, amount, description):
        transaction = Transaction(user_id=user_id, type=type, amount=amount, description=description)
        db.session.add(transaction)
        db.session.commit()
        return transaction