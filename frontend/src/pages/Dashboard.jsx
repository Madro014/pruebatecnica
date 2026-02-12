import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { transactionService } from '../services/api';
import BalanceDisplay from '../components/BalanceDisplay';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import Loading from './loading';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { currentUser, logout } = useUser();
    const navigate = useNavigate();
    const [balance, setBalance] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = useCallback(async () => {
        if (!currentUser) return;
        setLoading(true);
        try {
            const [balanceData, transactionsData] = await Promise.all([
                transactionService.getBalance(currentUser.id),
                transactionService.getTransactions(currentUser.id)
            ]);
            setBalance(balanceData);
            setTransactions(transactionsData);
        } catch (err) {
            setError('Error al cargar datos del dashboard');
        } finally {
            setLoading(false);
        }
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        } else {
            fetchData();
        }
    }, [currentUser, navigate, fetchData]);

    const handleCreateTransaction = async (formData) => {
        try {
            await transactionService.createTransaction({
                ...formData,
                user_id: currentUser.id
            });
            fetchData(); // Reload data after success
        } catch (err) {
            setError('Error al crear transacción');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) return <Loading />;

    return (
        <div className="dashboard-container">
            <div className="dashboard-wrapper">
                <nav className="dashboard-nav">
                    <div className="user-welcome">
                        <h2>Hola, {currentUser?.name} </h2>
                        <p>Bienvenido a tu panel de control financiero</p>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        Cerrar Sesión
                    </button>
                </nav>

                {error && <div className="error-banner">{error}</div>}

                <BalanceDisplay balance={balance} />

                <div className="dashboard-grid">
                    <TransactionForm onSubmit={handleCreateTransaction} />
                    <TransactionList transactions={transactions} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
