/// <reference types="jest" />
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import React from 'react';

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

interface World {
  name: string;
  theme: string;
}

interface WorldContextType {
  selectedWorld: World | null;
  setSelectedWorld: (world: World | null) => void;
  isWorldSelected: boolean;
}

declare global {
  interface Window {
    matchMedia: (query: string) => MediaQueryList;
  }
}

// Mock auth context
vi.mock('../contexts/AuthContext', () => {
  return require('./__mocks__/contexts/AuthContext');
});

// Mock world context
vi.mock('../contexts/WorldContext', () => {
  return require('./__mocks__/contexts/WorldContext');
});

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}
  observe(target: Element): void {}
  unobserve(target: Element): void {}
  disconnect(): void {}
} as any; 