import { vi } from 'vitest';
import React from 'react';

export const mockAuthContext = {
  useAuth: vi.fn(() => ({
    user: null,
    login: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: false,
  })),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
};

export const mockWorldContext = {
  useWorld: vi.fn(() => ({
    selectedWorld: null,
    setSelectedWorld: vi.fn(),
    isWorldSelected: false,
  })),
  WorldProvider: ({ children }: { children: React.ReactNode }) => children,
}; 