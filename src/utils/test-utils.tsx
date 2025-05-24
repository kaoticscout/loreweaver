import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { vi } from 'vitest';

// Mock WorldContext
export const mockWorld = {
  id: 'test-world',
  name: 'Test World',
  description: 'A test world',
  banner: '/art/banners/test.jpg',
  thumbnail: '/art/banners/test.jpg',
  regions: [],
  theme: 'Fantasy',
  rating: {
    averageRating: 4.5,
    totalRatings: 100,
    upvotes: 90,
    downvotes: 10
  },
  tags: ['Test'],
  createdAt: '2024-01-01T00:00:00Z',
  lastUpdated: '2024-01-01T00:00:00Z',
  creator: {
    id: 'test',
    name: 'Test Creator',
    avatar: '/art/avatars/test.png'
  },
  featured: false,
  popularity: 1000,
  difficulty: 'Intermediate',
  recommendedLevel: '1-10',
  estimatedPlayTime: '10+ hours',
  languages: ['English'],
  contentWarnings: []
};

const mockWorldContext = {
  selectedWorld: mockWorld,
  setSelectedWorld: vi.fn(),
  isWorldSelected: true
};

const WorldProvider = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="world-provider">
    {children}
  </div>
);

vi.mock('../contexts/WorldContext', () => ({
  useWorld: () => mockWorldContext,
  WorldProvider
}));

interface WrapperProps {
  children: React.ReactNode;
}

const AllTheProviders = ({ children }: WrapperProps) => {
  return (
    <MemoryRouter>
      <AuthProvider>
        <WorldProvider>
          {children}
        </WorldProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render }; 