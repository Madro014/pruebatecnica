from ..repositories.base import TransactionRepository

class TransactionService:
    @staticmethod
    def list_by_user(user_id):
        return [t.to_dict() for t in TransactionRepository.get_by_user_id(user_id)]
    
    @staticmethod
    def create_transaction(data):
        required = ['user_id', 'type', 'amount', 'description']
        for field in required:
            if field not in data:
                raise ValueError(f"El campo {field} es requerido")
        
        if data['type'] not in ['income', 'expense']:
            raise ValueError("Tipo invalido. Debe ser 'income' o 'expense'")
            
        transaction = TransactionRepository.create(
            data['user_id'], 
            data['type'], 
            data['amount'], 
            data['description']
        )
        return transaction.to_dict()

    @staticmethod
    def get_balance(user_id):
        transactions = TransactionRepository.get_by_user_id(user_id)
        income = sum(t.amount for t in transactions if t.type == 'income')
        expense = sum(t.amount for t in transactions if t.type == 'expense')
        return {
            "total_ingresos": income,
            "total_egresos": expense,
            "balance": income - expense
        }
