import React from 'react';
import '../styles/BalanceDisplay.css';

const BalanceDisplay = ({ balance }) => {
    if (!balance) return <div>Cargando balance...</div>;

    return (
        <div className="balance-card">
            <div className="balance-item">
                <div className="balance-label">Ingresos</div>
                <div className="balance-value income">${balance.total_ingresos.toLocaleString()}</div>
            </div>
            <div className="balance-item">
                <div className="balance-label">Egresos</div>
                <div className="balance-value expense">${balance.total_egresos.toLocaleString()}</div>
            </div>
            <div className="balance-item">
                <div className="balance-label">Balance Total</div>
                <div className="balance-value total">${balance.balance.toLocaleString()}</div>
            </div>
        </div>
    );
};

export default BalanceDisplay;
