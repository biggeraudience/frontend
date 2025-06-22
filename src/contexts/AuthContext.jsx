// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // Will store { email, role }
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // On app load, check for stored token/user info
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token'); // Or actual JWT/session token

        if (storedUser && storedToken) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Failed to parse stored user data:", error);
                handleLogout(); // Clear invalid data
            }
        }
        setLoading(false);
    }, []);

    const handleLogin = async (email, password) => {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });
        // const data = await response.json();

        // Simulate API call delay and response
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'admin@example.com' && password === 'adminpass') {
                    const adminUser = { email: email, role: 'admin' };
                    localStorage.setItem('user', JSON.stringify(adminUser));
                    localStorage.setItem('token', 'fake-admin-token');
                    setUser(adminUser);
                    setIsAuthenticated(true);
                    resolve({ success: true, user: adminUser });
                } else if (email === 'user@example.com' && password === 'userpass') {
                    const regularUser = { email: email, role: 'user' };
                    localStorage.setItem('user', JSON.stringify(regularUser));
                    localStorage.setItem('token', 'fake-user-token');
                    setUser(regularUser);
                    setIsAuthenticated(true);
                    resolve({ success: true, user: regularUser });
                } else {
                    reject({ success: false, message: 'Invalid credentials' });
                }
                setLoading(false);
            }, 1000);
        });
    };

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        // Simulate API call delay and response
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // In a real app, you'd check if email is unique and save to DB
                console.log("Registering:", { username, email, password });
                // For simplicity, let's assume all registrations are 'user' roles for now
                const newUser = { email: email, role: 'user' };
                // Don't log them in immediately, just simulate registration success
                resolve({ success: true, user: newUser });
                setLoading(false);
            }, 1000);
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/auth/login'); // Redirect to login after logout
    };

    const value = {
        isAuthenticated,
        user,
        loading,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};