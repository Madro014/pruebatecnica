from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..services.user_service import UserService
from ..services.transaction_service import TransactionService

api_bp = Blueprint('api', __name__)

@api_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = UserService.authenticate(data.get('email'), data.get('password'))
    if not user:
        return jsonify({"msg": "Credenciales invalidas"}), 401
    
    token = create_access_token(identity=str(user.id))
    return jsonify({
        "token": token,
        "user": user.to_dict()
    })

@api_bp.route('/users', methods=['GET'])
def get_users():
    return jsonify(UserService.list_users())

@api_bp.route('/users', methods=['POST'])
def create_user():
    try:
        user = UserService.create_user(request.json)
        return jsonify(user), 201
    except ValueError as e:
        return jsonify({"msg": str(e)}), 400

@api_bp.route('/users/<int:user_id>/transactions', methods=['GET'])
@jwt_required()
def get_transactions(user_id):
    current_user_id = int(get_jwt_identity())
    if current_user_id != user_id:
        return jsonify({"msg": "No autorizado"}), 403
    return jsonify(TransactionService.list_by_user(user_id))

@api_bp.route('/users/<int:user_id>/balance', methods=['GET'])
@jwt_required()
def get_balance(user_id):
    current_user_id = int(get_jwt_identity())
    if current_user_id != user_id:
        return jsonify({"msg": "No autorizado"}), 403
    return jsonify(TransactionService.get_balance(user_id))

@api_bp.route('/transactions', methods=['POST'])
@jwt_required()
def create_transaction():
    current_user_id = int(get_jwt_identity())
    data = request.json
    try:
        # Security: Force transaction to be for the current authenticated user
        data['user_id'] = current_user_id
        transaction = TransactionService.create_transaction(data)
        return jsonify(transaction), 201
    except ValueError as e:
        return jsonify({"msg": str(e)}), 400
