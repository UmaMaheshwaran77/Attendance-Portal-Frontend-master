import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = (token) => {
        setCurrentUser(token);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            login(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
