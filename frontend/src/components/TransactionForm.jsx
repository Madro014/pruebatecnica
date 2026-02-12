import React, { useState } from 'react';
import '../styles/TransactionForm.css';

const TransactionForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        type: 'income'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.amount || !formData.description) return;
        onSubmit(formData);
        setFormData({ amount: '', description: '', type: 'income' });
    };

    return (
        <div className="transaction-form-card">
            <h3>Nueva Transacción</h3>
            <form onSubmit={handleSubmit} className="transaction-form">
                <div className="form-group">
                    <label>Descripción</label>
                    <input
                        type="text"
                        placeholder="Ej: Alquiler, Comida..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Monto</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Tipo</label>
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                        <option value="income"> Ingreso</option>
                        <option value="expense"> Egreso</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">
                    Registrar Movimiento
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
