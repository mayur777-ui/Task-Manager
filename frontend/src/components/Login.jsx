import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';
import { motion } from 'framer-motion';

export default function Login() {
    const [input, setInput] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const USER_API_END_POINT = "http://localhost:4000/user";
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = { email: '', password: '' };
        if (!input.email) newErrors.email = 'Email is required!';
        if (!input.password) newErrors.password = 'Password is required!';

        setErrors(newErrors);

        if (newErrors.email || newErrors.password) return;

        try {
            const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            const id = response.data.user._id;
            const token = response.data.token;
            localStorage.setItem('token', token);
            setInput({ email: "", password: "" });
            navigate(`/showtask/${id}`);
        } catch (err) {
            setErrors({ ...errors, email: 'Login failed. Please check your credentials.' });
            console.error(err.message);
        }
    };

    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        setShowAnimation(true);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={showAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="enhanced-login-container"
        >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="enhanced-login-card"
            >
                <h2 className="enhanced-title text-center">Login</h2>

                {errors.email && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="enhanced-alert"
                    >
                        {errors.email}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="enhanced-form-group"
                    >
                        <label className="enhanced-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={handleChange}
                            className={`enhanced-input ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <div className="enhanced-error-message">{errors.email}</div>}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="enhanced-form-group"
                    >
                        <label className="enhanced-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={handleChange}
                            className={`enhanced-input ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <div className="enhanced-error-message">{errors.password}</div>}
                    </motion.div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="enhanced-submit-btn"
                    >
                        Login
                    </motion.button>
                </form>

                {/* Corrected Link and Added Basic Styling */}
                <p>
                    Don't have an account?{' '}
                    <Link to="/register" className="register-link">
                        Register
                    </Link>
                </p>
            </motion.div>
        </motion.div>
    );
}
