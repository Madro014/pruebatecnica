import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { userService, authService } from '../services/api';
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/Login.css';
import '../styles/Register.css';
import flumeIcon from '../images/flume.webp';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { loginSuccess } = useUser();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const newUser = await userService.createUser(formData);
            const data = await authService.login(newUser.email, '123');
            loginSuccess(data.user, data.token);
            navigate('/dashboard');
        } catch (err) {
            setError('No pudimos crear tu perfil. ¿Quizás ese email ya existe?');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-page">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="auth-card register-card"
            >
                <div className="auth-header">
                    <motion.img
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        src={flumeIcon}
                        alt="Flume Logo"
                        className="brand-icon large"
                    />
                    <h1 className="brand-logo gradient-text">Crea tu Cuenta</h1>
                   
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="error-banner"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleRegister} className="auth-form">
                    <div className="input-field">
                        <label>Nombre Completo</label>
                        <div className="input-control">
                            <User size={18} className="input-icon" />
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Tu nombre y apellido"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-field">
                        <label>Correo Electrónico</label>
                        <div className="input-control">
                            <Mail size={18} className="input-icon" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="tu@ejemplo.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-field read-only-field">
                        <label>Contraseña Temporal</label>
                        <div className="input-control">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="text"
                                value="123"
                                readOnly
                            />
                            <div className="security-badge">
                                <Sparkles size={12} /> Pre-asignada
                            </div>
                        </div>
                        <p className="field-hint">Podrás cambiarla luego en tu perfil.</p>
                    </div>

                    <button type="submit" className="submit-action" disabled={isLoading}>
                        {isLoading ? (
                            <span className="loader">Creando cuenta...</span>
                        ) : (
                            <>
                                Empezar ahora <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-switch">
                    <span>¿Ya tienes una cuenta?</span>
                    <Link to="/" className="switch-link">Inicia sesión aquí</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
