import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import flumeIcon from '../images/flume.webp';
import '../styles/loading.css';

const MESSAGES = [
    "Iniciando motores financieros...",
    "Asegurando tu capital...",
    "Cargando flujos de efectivo...",
    "Sincronizando con la nube...",
    "Casi listo por aquí...",
    "Preparando tu dashboard premium..."
];

const Loading = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading-container">
            <div className="pulse-bg"></div>

            <div className="logo-wrapper">
                <div className="loading-ring"></div>
                <img
                    src={flumeIcon}
                    alt="Loading Logo"
                    className="rotating-logo"
                />
            </div>

            <div className="message-container">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={messageIndex}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1, y: -10 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="loading-text"
                    >
                        {MESSAGES[messageIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>

            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, #6366f1, transparent)",
                    marginTop: "2rem"
                }}
            />
        </div>
    );
};

export default Loading;
