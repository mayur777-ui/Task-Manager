// Import dependencies
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/login.css'; // CSS import

// Define the Login component
export default function Login() {
    // State management for form input and error handling
    const [input, setInput] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '', both: '' });
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    // Constants
    const USER_API_END_POINT = "http://localhost:4000/user";
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear specific error message
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form reload

        // Initialize error object
        let newErrors = { email: '', password: '', both: '' };

        // Validation logic
        if (!input.email) {
            newErrors.email = 'Email is required!';
            newErrors.both = 'Email is required!';
        }
        if (!input.password) {
            newErrors.password = 'Password is required!';
            newErrors.both = 'Password is required!';
        }

        if (!input.email && !input.password) {
            newErrors.both = 'Both credentials are required!';
        }

        // Set error state
        setErrors(newErrors);

        // Stop form submission if there are any errors
        if (newErrors.email || newErrors.password || newErrors.both) return;

        // If validation passes, proceed with login API request
        try {
            const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            const id = response.data.user._id;
            const token = response.data.token;

            // Store token in localStorage
            localStorage.setItem('token', token);
            setInput({ email: '', password: '' }); // Clear form input
            navigate(`/showtask/${id}`); // Redirect to task page
        } catch (err) {
            if (err.response && err.response.status === 404) {
                // If user does not exist
                setErrors({ ...errors, both: 'User does not exist' });
            } else if (err.response && err.response.status === 401) {
                // If invalid credentials
                setErrors({ ...errors, both: 'Invalid credentials' });
            } else {
                // For other types of errors
                setErrors({ ...errors, both: 'Login failed. Please try again.' });
            }
        }
    };

    // Animation control
    const [showAnimation, setShowAnimation] = useState(false);
    useEffect(() => {
        setShowAnimation(true); // Trigger animation on mount
    }, []);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the visibility
    };

    // JSX return for rendering the login form with animation and validation
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

                {/* Display both credentials error */}
                {errors.both && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="enhanced-alert"
                    >
                        {errors.both}
                    </motion.div>
                )}

                {/* Login form */}
                <form onSubmit={handleSubmit}>
                    {/* Email input field */}
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

                    {/* Password input field */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="enhanced-form-group"
                    >
                        <label className="enhanced-label">Password</label>
                        <div className="password-input-group">
                            <input
                                type={showPassword ? 'text' : 'password'} // Toggle between text and password
                                name="password"
                                value={input.password}
                                onChange={handleChange}
                                className={`enhanced-input ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Enter your password"
                            />
                            <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                                {showPassword ? 'Hide' : 'Show'} {/* Button text */}
                            </button>
                        </div>
                        {errors.password && <div className="enhanced-error-message">{errors.password}</div>}
                    </motion.div>

                    {/* Submit button */}
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

                {/* Link to registration page */}
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
