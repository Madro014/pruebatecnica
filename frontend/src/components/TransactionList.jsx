import React from 'react';
import '../styles/TransactionList.css';

const TransactionList = ({ transactions }) => {
    return (
        <div className="transaction-list-card">
            <h3>Historial de Transacciones</h3>
            {transactions.length === 0 ? (
                <p style={{ color: '#94a3b8', marginTop: '1rem', textAlign: 'center' }}>No hay transacciones registradas.</p>
            ) : (
                transactions.map((t) => (
                    <div key={t.id} className="transaction-item">
                        <div className="transaction-info">
                            <h4>{t.description}</h4>
                            <span>{t.date}</span>
                        </div>
                        <div className={`transaction-amount ${t.type}`}>
                            {t.type === 'income' ? '+ ' : '- '}${t.amount.toLocaleString()}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TransactionList;
