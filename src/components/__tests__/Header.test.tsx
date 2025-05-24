import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../Header';
import { vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

// Mock the UserProfile component since we're not testing it here
vi.mock('../UserProfile', () => ({
  UserProfile: () => <div data-testid="user-profile">User Profile</div>,
}));

// Define types
interface World {
  name: string;
  theme: string;
}

interface WorldContextType {
  selectedWorld: World | null;
  setSelectedWorld: (world: World | null) => void;
  isWorldSelected: boolean;
}

// Create mock functions
const mockSetSelectedWorld = vi.fn();
const mockNavigate = vi.fn();
let mockLocation = { pathname: '/' };
let mockWorldContext: WorldContextType = {
  selectedWorld: null,
  setSelectedWorld: mockSetSelectedWorld,
  isWorldSelected: false,
};

// Mock the contexts and router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => mockLocation,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../contexts/WorldContext', () => ({
  useWorld: () => mockWorldContext,
}));

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    login: vi.fn(),
    logout: vi.fn(),
    signup: vi.fn(),
  }),
}));

describe('Header', () => {
  beforeEach(() => {
    // Reset mocks and mock data before each test
    vi.clearAllMocks();
    mockLocation = { pathname: '/' };
    mockWorldContext = {
      selectedWorld: null,
      setSelectedWorld: mockSetSelectedWorld,
      isWorldSelected: false,
    };
  });

  it('renders the app logo and title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check if the logo and title are rendered
    expect(screen.getByText('Loreweaver')).toBeInTheDocument();
  });

  it('shows world selector on protected paths', () => {
    // Set up mock data for this test
    mockLocation = { pathname: '/world' };
    mockWorldContext = {
      selectedWorld: { name: 'Test World', theme: 'Fantasy' },
      setSelectedWorld: mockSetSelectedWorld,
      isWorldSelected: true,
    };

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check if the world selector is rendered with the correct world name
    expect(screen.getByText('Test World')).toBeInTheDocument();
  });

  it('shows navigation links when world is selected', () => {
    // Set up mock data for this test
    mockWorldContext = {
      selectedWorld: { name: 'Test World', theme: 'Fantasy' },
      setSelectedWorld: mockSetSelectedWorld,
      isWorldSelected: true,
    };

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check if all navigation links are rendered
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Quests')).toBeInTheDocument();
    expect(screen.getByText('People')).toBeInTheDocument();
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('highlights active navigation link', () => {
    mockLocation = { pathname: '/world' };
    mockWorldContext = {
      selectedWorld: { name: 'Test World', theme: 'Fantasy' },
      setSelectedWorld: mockSetSelectedWorld,
      isWorldSelected: true,
    };

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const exploreLink = screen.getByText('Explore').closest('a');
    expect(exploreLink).toHaveClass('bg-white/10', 'text-white');
  });

  it('handles world switching', async () => {
    mockLocation = { pathname: '/world' };
    mockWorldContext = {
      selectedWorld: { name: 'Test World', theme: 'Fantasy' },
      setSelectedWorld: mockSetSelectedWorld,
      isWorldSelected: true,
    };

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Use userEvent for better interaction simulation
    const worldSelector = screen.getByRole('button', { name: /Test World/i });
    await act(async () => {
      await userEvent.click(worldSelector);
    });

    // Wait for the menu to appear and click the switch button
    await act(async () => {
      const switchButton = await screen.findByText('Switch World');
      await userEvent.click(switchButton);
    });

    expect(mockSetSelectedWorld).toHaveBeenCalledWith(null);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('does not show navigation links when no world is selected', () => {
    mockWorldContext = {
      selectedWorld: null,
      setSelectedWorld: mockSetSelectedWorld,
      isWorldSelected: false,
    };

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.queryByText('Explore')).not.toBeInTheDocument();
    expect(screen.queryByText('Quests')).not.toBeInTheDocument();
    expect(screen.queryByText('People')).not.toBeInTheDocument();
    expect(screen.queryByText('Items')).not.toBeInTheDocument();
  });

  it('always shows the user profile component', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
  });

  it('shows world theme in selector dropdown', async () => {
    mockLocation = { pathname: '/world' };
    mockWorldContext = {
      selectedWorld: { name: 'Test World', theme: 'Fantasy' },
      setSelectedWorld: mockSetSelectedWorld,
      isWorldSelected: true,
    };

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Use userEvent for better interaction simulation
    const worldSelector = screen.getByRole('button', { name: /Test World/i });
    await act(async () => {
      await userEvent.click(worldSelector);
    });

    // Wait for the theme text to appear in the dropdown
    await waitFor(() => {
      expect(screen.getByText('Fantasy')).toBeInTheDocument();
    });
  });
}); 