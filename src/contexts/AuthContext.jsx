import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [ user, setUser ]             = useState(null);
  const [ isAuthenticated, setAuth ]  = useState(false);
  const [ loading, setLoading ]       = useState(true);

  const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  // on mount, check localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token      = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setAuth(true);
    }
    setLoading(false);
  }, []);

  // register now accepts role
  const register = async (username, email, password, role = 'user') => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role }),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      return { success: true, user: data.user };
    } catch (err) {
      setLoading(false);
      return { success: false, message: err.message };
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) throw new Error(data.message || 'Login failed');

      // persist token + user (with role)
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setUser(data.user);
      setAuth(true);
      return { success: true, user: data.user };
    } catch (err) {
      setLoading(false);
      throw new Error(err.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      register,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
