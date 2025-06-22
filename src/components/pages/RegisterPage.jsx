// src/pages/Auth/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import { useAuth } from '../../contexts/AuthContext'; // Import AuthContext

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { register, loading } = useAuth(); // Assuming register function from AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await register(username, email, password); // Call register from AuthContext
            if (response.success) {
                setSuccess('Registration successful! Please log in.');
                setTimeout(() => {
                    navigate('/auth/login'); // Redirect to login page after successful registration
                }, 1500);
            } else {
                setError(response.message || 'Registration failed.');
            }
        } catch (err) {
            setError(err.message || 'An unexpected error occurred during registration.');
        }
    };

    return (
        <div className="auth-page register-page">
            <div className="auth-card">
                <h2 className="orbitron-font">Register Account</h2> {/* Changed from "Register New Account" */}
                {error && <p className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                {success && <p className="success-message" style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="primary-button" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                </form>
                <div className="auth-links">
                    <p>Already have an account? <Link to="/auth/login">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;