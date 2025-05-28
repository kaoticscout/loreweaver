import * as React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthResponse, LoginCredentials, RegisterData, authApi } from '../services/api';
import axios from 'axios';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      console.log('Loading user profile...');
      const token = localStorage.getItem('token');
      console.log('Current token:', token);
      
      const user = await authApi.getProfile();
      console.log('Loaded user:', user);
      setUser(user);
    } catch (err) {
      console.error('Failed to load user:', err);
      // Only remove token if it's an auth error (401 or 403)
      if (axios.isAxiosError(err) && err.response && (err.response.status === 401 || err.response.status === 403)) {
        console.log('Removing invalid token');
        localStorage.removeItem('token');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      const { user, token } = await authApi.login(credentials);
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setError(message);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setError(null);
      const { user, token } = await authApi.register(data);
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      setError(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setError(null);
      const updatedUser = await authApi.updateProfile(data);
      setUser(updatedUser);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update profile';
      setError(message);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 