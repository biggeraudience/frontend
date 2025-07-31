// src/pages/Auth/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterPage() {
  const [username, setUsername]         = useState('');
  const [email,    setEmail   ]         = useState('');
  const [password, setPassword]         = useState('');
  const [confirm,  setConfirm ]         = useState('');
  const [role,     setRole    ]         = useState('user');
  const [error,    setError   ]         = useState('');
  const [success,  setSuccess ]         = useState('');
  const navigate                        = useNavigate();
  const { register, loading }           = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setSuccess('');

    if (password !== confirm) {
      setError("Passwords don't match!");
      return;
    }

    const resp = await register(username, email, password, role);
    if (resp.success) {
      setSuccess('Registered! Redirecting to login…');
      setTimeout(() => navigate('/auth/login'), 1200);
    } else {
      setError(resp.message || 'Registration failed.');
    }
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-card">
        <h2 className="orbitron-font">Register Account</h2>
        {error   && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <Button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Registering…' : 'Register'}
          </Button>
        </form>
        <p className="auth-links">
          Already have an account? <Link to="/auth/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
