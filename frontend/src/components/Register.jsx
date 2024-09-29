import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css'; // Ensure you have the styles imported

export default function Register() {
    const USER_API_END_POINT = "http://localhost:4000/user";
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });

        // Clear the corresponding error when the user types
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation before submitting
        let newErrors = { name: '', email: '', password: '' };
        if (!input.name) newErrors.name = 'Username is required!';
        if (!input.email) newErrors.email = 'Email is required!';
        if (!input.password) newErrors.password = 'Password is required!';

        setErrors(newErrors);

        // If there are errors, do not submit the form
        if (newErrors.name || newErrors.email || newErrors.password) return;

        try {
            const response = await axios.post(`${USER_API_END_POINT}/register`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            console.log(response.data);
            setInput({
                name: "",
                email: "",
                password: "",
            });
            navigate("/login");
        } catch (error) {
            console.error("Error during registration:", error);
            setErrors({ ...errors, email: 'Registration failed. Please try again.' });
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="enhanced-title">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="enhanced-form-group">
                        <label className="enhanced-label">Username:</label>
                        <input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={handleChange}
                            className={`enhanced-input ${errors.name ? 'is-invalid' : ''}`}
                            placeholder="Enter your username"
                        />
                        {errors.name && <div className="error-message">{errors.name}</div>}
                    </div>
                    <div className="enhanced-form-group">
                        <label className="enhanced-label">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={handleChange}
                            className={`enhanced-input ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>
                    <div className="enhanced-form-group">
                        <label className="enhanced-label">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={handleChange}
                            className={`enhanced-input ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <div className="error-message">{errors.password}</div>}
                    </div>
                    <button type="submit" className="enhanced-button">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
