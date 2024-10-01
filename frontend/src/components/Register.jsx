import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/register.css'; // Ensure you have the styles imported

export default function Register() {
    const [showPassword,setShowPassword] = useState(false);
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
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        setShowAnimation(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error when typing
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation

        let newErrors = { name: '', email: '', password: '' ,all: ''};

        if(!input.name && !input.email && !input.password){
            newErrors.all = 'Please fill all fields!';
        }
        if (!input.name){
             newErrors.name = 'Username is required!';
             newErrors.all = 'Username is required!';
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input.email) {
            newErrors.email = 'Email is required!';
            newErrors.all = 'Email is required!';
        } else if (!emailPattern.test(input.email)) {
            newErrors.email = 'Invalid email format!';
            newErrors.all = 'Invalid email format!';
        }
        if (!input.password) {
            newErrors.password = 'Password is required!';
            newErrors.all = 'Password is required!';
        } else if (input.password.length < 8 || input.password.length > 20) {
            newErrors.password = 'Password must be between 8 and 20 characters long!';
            newErrors.all = 'Password must be between 8 and 20 characters long!';
        } else {
            // Checking if the password contains the required characters
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
            if (!passwordPattern.test(input.password)) {
                newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character!';
                newErrors.all = 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character!';
            }
        }
        
        
        setErrors(newErrors);



        if (newErrors.name || newErrors.email || newErrors.password) return;

        try {
            const response = await axios.post(`${USER_API_END_POINT}/register`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            setInput({ name: "", email: "", password: "" });
            navigate("/login");
        } catch (error) {
            if(error.response && error.response.status == 409){
                setErrors({ ...errors, all: 'Username or Email already exists!' });
            }else{
                setErrors({ ...errors, email: 'Registration failed. Please try again.' });
            }
        }
    };
    const togglePasswordVisibility = () =>{
        setShowPassword(!showPassword)
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={showAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="register-container"
        >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="register-card"
            >
                <h2 className="enhanced-title text-center">Register</h2>

                {errors.all && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="enhanced-alert"
                    >
                        {errors.all}
                    </motion.div>
                )}
                <form onSubmit={handleSubmit}>
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="enhanced-form-group"
                    >
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
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="enhanced-form-group"
                    >
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
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="enhanced-form-group"
                    >
                        <label className="enhanced-label">Password:</label>
                        <div className="register-password-input-group">
                        <input
                            type= {showPassword ? "text" : "password"}
                            name="password"
                            value={input.password}
                            onChange={handleChange}
                            className={`enhanced-input ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Enter your password"
                        />
                       <button type="button" className="register-toggle-password" onClick={togglePasswordVisibility}>
                                {showPassword ? 'Hide' : 'Show'}
                        </button>
                        </div>
                        {errors.password && <div className="error-message">{errors.password}</div>}
                    </motion.div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="enhanced-submit-btn"
                    >
                        Submit
                    </motion.button>
                </form>

                <p className="text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="login-link">
                        Login
                    </Link>
                </p>
            </motion.div>
        </motion.div>
    );
}
