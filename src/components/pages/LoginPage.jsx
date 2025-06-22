// src/pages/Auth/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import { useAuth } from '../../contexts/AuthContext'; // Import AuthContext

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, isAuthenticated, user, loading } = useAuth();

    // If already authenticated, redirect immediately
    if (!loading && isAuthenticated && user) {
        if (user.role === 'admin') {
            navigate('/admin', { replace: true });
        } else {
            navigate('/', { replace: true }); // Or '/dashboard' for regular users
        }
        return null; // Don't render the login form if redirecting
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            const response = await login(email, password);
            if (response.success) {
                // Redirection is now handled by the useAuth effect/logic
                // The page will re-render and the useEffect/if block above will handle it
            } else {
                setError(response.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError(err.message || 'An unexpected error occurred during login.');
        }
    };

    return (
        <div className="auth-page login-page">
            <div className="auth-card">
                <h2 className="orbitron-font">Sign In</h2> {/* Changed from "Admin Login" */}
                {error && <p className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
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
                    <Button type="submit" className="primary-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
                <div className="auth-links">
                    <p>
                        <Link to="/auth/forgot-password">Forgot Password?</Link>
                    </p>
                    {/* Only show register link if registration is allowed for users */}
                    <p>Don't have an account? <Link to="/auth/register">Register here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;