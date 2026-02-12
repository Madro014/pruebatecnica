const API_URL = import.meta.env.VITE_API_URL || 'https://pruebatecnica-1-123e.onrender.com/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const authService = {
    async login(email, password) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) throw new Error('Credenciales inválidas');
        return response.json();
    }
};

export const userService = {
    async getUsers() {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) throw new Error('Error al obtener usuarios');
        return response.json();
    },

    async createUser(userData) {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (!response.ok) throw new Error('Error al crear usuario');
        return response.json();
    }
};

export const transactionService = {
    async getBalance(userId) {
        const response = await fetch(`${API_URL}/users/${userId}/balance`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Error al obtener balance');
        return response.json();
    },

    async getTransactions(userId) {
        const response = await fetch(`${API_URL}/users/${userId}/transactions`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Error al obtener transacciones');
        return response.json();
    },

    async createTransaction(transactionData) {
        const response = await fetch(`${API_URL}/transactions`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(transactionData),
        });
        if (!response.ok) throw new Error('Error al crear transacción');
        return response.json();
    }
};
