import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { userService, authService } from '../services/api';
import { Mail, Lock, User, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Login.css';
import flumeIcon from '../images/flume.webp';
import Loading from './loading';

const Login = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 4;
    const [password, setPassword] = useState('123');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { loginSuccess } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await userService.getUsers();
            setUsers(data);
        } catch (err) {
            setError('No se pudieron cargar los usuarios de prueba');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = selectedUser ? selectedUser.email : '';
        if (!email) {
            setError('Por favor selecciona un usuario');
            return;
        }
        try {
            const data = await authService.login(email, password);
            loginSuccess(data.user, data.token);
            navigate('/dashboard');
        } catch (err) {
            setError('Credenciales incorrectas');
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="login-container">
            <div className="auth-card">
                <div className="auth-header">
                    <img src={flumeIcon} alt="Flume Icon" className="brand-icon" />
                </div>

                {error && <div className="error-msg">{error}</div>}

                <div className="user-selector-container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="user-selector"
                        >
                            {users.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage).map(user => (
                                <div
                                    key={user.id}
                                    className={`mini-user-card ${selectedUser?.id === user.id ? 'selected' : ''}`}
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setError('');
                                    }}
                                >
                                    <User size={20} style={{ marginBottom: '0.5rem', color: '#818cf8' }} />
                                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'white' }}>{user.name.split(' ')[0]}</div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {users.length > usersPerPage && (
                        <div className="selector-navigation">
                            <button
                                className="nav-arrow"
                                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                disabled={currentPage === 0}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <span className="page-indicator">
                                {currentPage + 1} / {Math.ceil(users.length / usersPerPage)}
                            </span>
                            <button
                                className="nav-arrow"
                                onClick={() => setCurrentPage(prev => Math.min(Math.ceil(users.length / usersPerPage) - 1, prev + 1))}
                                disabled={currentPage >= Math.ceil(users.length / usersPerPage) - 1}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email del Usuario</label>
                        <div className="input-wrapper">
                            <Mail size={18} />
                            <input
                                type="email"
                                className="auth-input"
                                value={selectedUser?.email || ''}
                                placeholder="Selecciona un usuario arriba"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Contraseña</label>
                        <div className="input-wrapper">
                            <Lock size={18} />
                            <input
                                type="password"
                                className="auth-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Tu contraseña"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-btn">
                        Iniciar Sesión
                    </button>
                </form>

                <div className="auth-footer">
                    ¿No tienes una cuenta?
                    <Link to="/register" className="auth-link">Regístrate gratis</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;