import { useNavigate } from "react-router-dom";
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
        <div className="unique-first-container">
            <div className="unique-overlay"></div>
            <div className="unique-content">
                <TypewriterEffect text="Welcome to Our Application"/>
                <p>Your gateway to manage tasks effortlessly.</p>
                <div className="unique-button-group">
                    <button className="unique-btn" onClick={handleLogin}>Login</button>
                    <button className="unique-btn unique-btn-register" onClick={handleRegister}>Register</button>
                </div>
                <div className="unique-social-icons">
                    <a href="#" className="unique-icon" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="unique-icon" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="unique-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <div className="unique-testimonial">
                    <blockquote>
                        "This application has changed the way I manage my tasks. Highly recommend!"
                    </blockquote>
                    <cite>- Happy User</cite>
                </div>
            </div>
        </div>
    );
}
