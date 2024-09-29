import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; 

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

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });

        // Clear the corresponding error when the user types
        setErrors({ ...errors, [name]: '' });

        // Validate email specifically
        if (name === 'email' && value && !validateEmail(value)) {
            setErrors({ ...errors, email: 'Invalid email format' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation before submitting
        let newErrors = { email: '', password: '' };
        if (!input.email) newErrors.email = 'Email is required!';
        if (!input.password) newErrors.password = 'Password is required!';

        setErrors(newErrors);

        // If there are errors, do not submit the form
        if (newErrors.email || newErrors.password) return;

        try {
            const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
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

    return (
        <div className="enhanced-login-container">
            <div className="enhanced-login-card">
                <h2 className="enhanced-title text-center">Login</h2>
                {errors.email && <div className="enhanced-alert">{errors.email}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="enhanced-form-group">
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
                    </div>
                    <div className="enhanced-form-group">
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
                    </div>
                    <button type="submit" className="enhanced-submit-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
