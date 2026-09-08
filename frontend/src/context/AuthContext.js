import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: Cookies.get('token') || localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
    userName: localStorage.getItem('userName') || null,
  });

  const login = ({ token, role, userName }) => {
    
    Cookies.set('token', token, { expires: 1, path: '/' });
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userName', userName);
    
    
    setAuth({ token, role, userName });
  };

  const logout = () => {
    Cookies.remove('token');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    
    
    setAuth({ token: null, role: null, userName: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
