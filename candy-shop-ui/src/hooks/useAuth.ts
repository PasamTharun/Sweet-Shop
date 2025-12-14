import { useState, useEffect, useCallback } from 'react';
import api from '../lib/api';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUser({ token });
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await api.post('/auth/login', 
        new URLSearchParams({ username: email, password })
      );
      localStorage.setItem('token', data.access_token);
      toast.success('🌌 Welcome to Cosmic Candy Galaxy!');
      return true;
    } catch {
      toast.error('Login failed! 👽');
      return false;
    }
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await api.post('/auth/register', { email, password });
      localStorage.setItem('token', data.access_token);
      toast.success('🌠 New candy citizen created!');
      return true;
    } catch {
      toast.error('Registration failed!');
      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast('🌙 Sweet dreams!');
  };

  return { user: !!localStorage.getItem('token'), login, register, logout, loading };
};
