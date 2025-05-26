import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '../../utils/test-utils';
import { WorldSelectionPage } from '../WorldSelectionPage';
import { DatabaseService } from '../../services/database';
import * as WorldContext from '../../contexts/WorldContext';
import { useNavigate } from 'react-router-dom';

// Mock the react-router-dom's useNavigate hook
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    useNavigate: vi.fn()
  };
});

// Mock the WorldContext
vi.mock('../../contexts/WorldContext', () => ({
  useWorld: () => ({
    setSelectedWorld: vi.fn(),
    selectedWorld: null,
    isWorldSelected: false
  })
}));

// Mock the WorldProgressContext
vi.mock('../../contexts/WorldProgressContext', () => ({
  useWorldProgress: () => ({
    hasCreatedWorld: vi.fn().mockReturnValue(false),
    getCurrentChapter: vi.fn().mockReturnValue(1)
  })
}));

// Mock the DatabaseService
vi.mock('../../services/database', () => ({
  DatabaseService: {
    getAllWorlds: vi.fn().mockResolvedValue([
      {
        id: 'sword-coast',
        name: 'Sword Coast',
        description: 'A fantasy world',
        banner: '/banner.jpg',
        thumbnail: '/thumbnail.jpg',
        theme: 'Fantasy',
        rating: {
          averageRating: 4.5,
          totalRatings: 100,
          upvotes: 80,
          downvotes: 20
        },
        tags: ['Fantasy', 'Adventure'],
        createdAt: '2024-01-01',
        lastUpdated: '2024-03-15',
        creator: {
          id: 'creator1',
          name: 'Creator One',
          avatar: '/avatar.jpg'
        },
        featured: true,
        popularity: 1000,
        difficulty: 'Beginner',
        recommendedLevel: '1-5',
        estimatedPlayTime: '20+ hours',
        languages: ['English'],
        contentWarnings: [],
        regions: []
      }
    ]),
    getFeaturedWorlds: vi.fn().mockResolvedValue([
      {
        id: 'sword-coast',
        name: 'Sword Coast',
        description: 'A fantasy world',
        banner: '/banner.jpg',
        thumbnail: '/thumbnail.jpg',
        theme: 'Fantasy',
        rating: {
          averageRating: 4.5,
          totalRatings: 100,
          upvotes: 80,
          downvotes: 20
        },
        tags: ['Fantasy', 'Adventure'],
        createdAt: '2024-01-01',
        lastUpdated: '2024-03-15',
        creator: {
          id: 'creator1',
          name: 'Creator One',
          avatar: '/avatar.jpg'
        },
        featured: true,
        popularity: 1000,
        difficulty: 'Beginner',
        recommendedLevel: '1-5',
        estimatedPlayTime: '20+ hours',
        languages: ['English'],
        contentWarnings: [],
        regions: []
      }
    ]),
    getWorldsByTheme: vi.fn().mockResolvedValue([])
  }
}));

describe('WorldSelectionPage', () => {
  const navigate = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(navigate);
  });

  it('renders the world selection page', async () => {
    render(<WorldSelectionPage />);
    expect(screen.getByText('Explore Worlds')).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    render(<WorldSelectionPage />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays worlds after loading', async () => {
    render(<WorldSelectionPage />);
    const worldTitle = await screen.findByText('Sword Coast');
    expect(worldTitle).toBeInTheDocument();
  });

  it('filters worlds by search query', async () => {
    render(<WorldSelectionPage />);
    const searchInput = await screen.findByPlaceholderText('Search worlds...');
    fireEvent.change(searchInput, { target: { value: 'Sword' } });
    expect(screen.getByText('Sword Coast')).toBeInTheDocument();
  });

  it('sorts worlds by different criteria', async () => {
    render(<WorldSelectionPage />);
    const sortSelect = await screen.findByRole('combobox', { name: /sort/i });
    fireEvent.change(sortSelect, { target: { value: 'name' } });
    expect(screen.getByText('Sword Coast')).toBeInTheDocument();
  });

  it('navigates to world preview on world click', async () => {
    render(<WorldSelectionPage />);
    const worldCard = await screen.findByTestId('world-card-sword-coast');
    fireEvent.click(worldCard);
    expect(navigate).toHaveBeenCalledWith('/world/sword-coast/preview');
  });
}); 