import React from 'react';
import { vi } from 'vitest';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
}

export const useAuth = vi.fn((): AuthContextType => ({
  user: null,
  loading: false,
  login: vi.fn(),
  logout: vi.fn(),
  signup: vi.fn(),
}));

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
}; 