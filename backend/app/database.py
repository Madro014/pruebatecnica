from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

db = SQLAlchemy()

SCHEMA_SQL = """
-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Transacciones
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(10) CHECK (type IN ('income', 'expense')) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
"""

def init_db(app):
    with app.app_context():
        # Ejecutamos el SQL crudo para asegurar compatibilidad con la estructura PostgREST que solicitaste
        try:
            db.session.execute(text(SCHEMA_SQL))
            db.session.commit()
            print("Tablas creadas/verificadas con éxito desde database.py")
        except Exception as e:
            db.session.rollback()
            print(f"Error al inicializar la base de datos: {e}")
            # Si falla el SQL crudo (ej: en SQLite), usamos el modelo de SQLAlchemy como backup
            db.create_all()
