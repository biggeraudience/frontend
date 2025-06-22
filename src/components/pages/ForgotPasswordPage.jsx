// src/pages/Auth/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/atoms/Button';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Forgot password request for:', email);
        // In a real app, you'd send an API request here
        alert('If an account with that email exists, a password reset link has been sent.');
        navigate('/auth/login');
    };

    return (
        <div className="auth-page forgot-password-page">
            <div className="auth-card">
                <h2 className="orbitron-font">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <p>Enter your email address to receive a password reset link.</p>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="primary-button">
                        Send Reset Link
                    </Button>
                </form>
                <div className="auth-links">
                    <p>
                        <Link to="/auth/login">Back to Sign In</Link> {/* Changed "Back to Login" */}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;