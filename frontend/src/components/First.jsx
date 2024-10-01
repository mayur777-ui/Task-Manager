import { Link, useNavigate } from "react-router-dom";
import { TypewriterEffect } from './Typewritter.jsx';
import '../styles/first.css'; // Ensure you have the CSS file

export default function First() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="futuristic-first-container">
            <div className="futuristic-overlay"></div>
            <div className="futuristic-content">
                <TypewriterEffect text="Welcome to Our Innovative Application" />
                <p className="futuristic-description">Experience task management like never before!</p>
                <div className="futuristic-button-group">
                    <button className="futuristic-btn" onClick={handleLogin}>
                        <i className="fas fa-sign-in-alt"></i> Login
                    </button>
                    <button className="futuristic-btn futuristic-btn-register" onClick={handleRegister}>
                        <i className="fas fa-user-plus"></i> Register
                    </button>
                </div>
                <div className="futuristic-social-icons">
                    <Link to="#" className="futuristic-icon" aria-label="Facebook"><i className="fab fa-facebook-f"></i></Link>
                    <Link to="https://github.com/mayur777-ui" className="futuristic-icon" aria-label="github"><i className="fab fa-github"></i></Link>
                    <Link to="https://www.linkedin.com/in/mayur-lakshkar/" className="futuristic-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></Link>
                </div>
                <div className="futuristic-testimonial">
                    <blockquote>
                        "This application has revolutionized my task management. A must-try!"
                    </blockquote>
                    <cite>- Happy User</cite>
                </div>
            </div>
            <div className="futuristic-background">
                <div className="background-blob"></div>
                <div className="background-blob"></div>
            </div>
        </div>
    );
}
