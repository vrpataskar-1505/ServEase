import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';

// This context holds the logged-in user across the whole app
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, check if user is already logged in (has a session cookie)
  useEffect(() => {
    API.get('/users/me/')
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (username, password) => {
    const res = await API.post('/users/login/', { username, password });
    setUser(res.data.user);
    return res.data;
  };

  const register = async (formData) => {
    const res = await API.post('/users/register/', formData);
    setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    await API.post('/users/logout/');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — use this in any component to get auth info
export function useAuth() {
  return useContext(AuthContext);
}
