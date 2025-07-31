// src/pages/Auth/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [email,    setEmail   ] = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError   ] = useState('');
  const navigate              = useNavigate();
  const { login, loading }    = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const { user } = await login(email, password);
      // role-based routing
      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/',      { replace: true });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-card">
        <h2 className="orbitron-font">Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email"    value={email}    onChange={e => setEmail(e.target.value)}    required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </Button>
        </form>
        <p className="auth-links">
          <Link to="/auth/forgot-password">Forgot Password?</Link>
        </p>
        <p className="auth-links">
          Don't have an account? <Link to="/auth/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
