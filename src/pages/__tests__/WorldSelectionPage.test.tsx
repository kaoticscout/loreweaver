import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '../../utils/test-utils';
import { WorldSelectionPage } from '../WorldSelectionPage';
import { worlds } from '../../data/worlds';
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

// Mock the worlds data
vi.mock('../../data/worlds', () => ({
  worlds: [
    {
      id: 'sword-coast',
      name: 'Sword Coast',
      description: 'A test world description',
      thumbnail: '/art/worlds/sword-coast/thumbnail.jpg',
      banner: '/art/worlds/sword-coast/banner.jpg',
      theme: 'Fantasy',
      rating: {
        averageRating: 4.5,
        totalRatings: 100,
        upvotes: 90,
        downvotes: 10
      },
      tags: ['Fantasy', 'D&D'],
      createdAt: '2024-01-01T00:00:00Z',
      lastUpdated: '2024-01-01T00:00:00Z',
      creator: {
        id: 'test',
        name: 'Test Creator',
        avatar: '/art/avatars/test.png'
      },
      featured: true,
      popularity: 1000,
      difficulty: 'Intermediate',
      recommendedLevel: '1-10',
      estimatedPlayTime: '10+ hours',
      languages: ['English'],
      contentWarnings: []
    },
    {
      id: 'test-world',
      name: 'Test World',
      description: 'Another test world',
      thumbnail: '/art/worlds/test-world/thumbnail.jpg',
      banner: '/art/worlds/test-world/banner.jpg',
      theme: 'Sci-Fi',
      rating: {
        averageRating: 4.0,
        totalRatings: 50,
        upvotes: 40,
        downvotes: 10
      },
      tags: ['Sci-Fi', 'Space'],
      createdAt: '2024-01-02T00:00:00Z',
      lastUpdated: '2024-01-02T00:00:00Z',
      creator: {
        id: 'test2',
        name: 'Test Creator 2',
        avatar: '/art/avatars/test2.png'
      },
      featured: false,
      popularity: 500,
      difficulty: 'Beginner',
      recommendedLevel: '1-5',
      estimatedPlayTime: '5+ hours',
      languages: ['English'],
      contentWarnings: []
    }
  ]
}));

describe('WorldSelectionPage', () => {
  const mockNavigate = vi.fn();
  const mockSetSelectedWorld = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    vi.spyOn(WorldContext, 'useWorld').mockImplementation(() => ({
      setSelectedWorld: mockSetSelectedWorld,
      selectedWorld: null,
      isWorldSelected: false
    }));
  });

  it('renders without crashing', () => {
    render(<WorldSelectionPage />);
    expect(screen.getByText('Explore Worlds')).toBeInTheDocument();
  });

  it('displays world cards', () => {
    render(<WorldSelectionPage />);
    const swordCoastCard = screen.getByTestId('world-title-sword-coast');
    const testWorldCard = screen.getByTestId('world-title-test-world');
    expect(swordCoastCard).toHaveTextContent('Sword Coast');
    expect(testWorldCard).toHaveTextContent('Test World');
  });

  it('handles world selection', () => {
    render(<WorldSelectionPage />);
    const worldCard = screen.getByTestId('world-card-sword-coast');
    fireEvent.click(worldCard);
    
    expect(mockSetSelectedWorld).toHaveBeenCalledWith(expect.objectContaining({
      id: 'sword-coast'
    }));
    expect(mockNavigate).toHaveBeenCalledWith('/world');
  });

  it('filters worlds by theme', () => {
    render(<WorldSelectionPage />);
    
    const themeSelect = screen.getAllByRole('combobox')[1]; // Theme is the second select
    fireEvent.change(themeSelect, { target: { value: 'Fantasy' } });
    
    const worldTitles = screen.getAllByRole('heading', { level: 3 });
    expect(worldTitles[0]).toHaveTextContent('Sword Coast');
    expect(screen.queryByRole('heading', { level: 3, name: 'Test World' })).not.toBeInTheDocument();
  });

  it('filters worlds by difficulty', () => {
    render(<WorldSelectionPage />);
    
    const difficultySelect = screen.getAllByRole('combobox')[2]; // Difficulty is the third select
    fireEvent.change(difficultySelect, { target: { value: 'Beginner' } });
    
    const swordCoastCard = screen.queryByTestId('world-title-sword-coast');
    const testWorldCard = screen.queryByTestId('world-title-test-world');
    
    expect(swordCoastCard).not.toBeInTheDocument();
    expect(testWorldCard).toBeInTheDocument();
  });

  it('filters worlds by type (all/my/featured)', () => {
    render(<WorldSelectionPage />);
    
    const filterTypeSelect = screen.getAllByRole('combobox')[0]; // Filter type is the first select
    fireEvent.change(filterTypeSelect, { target: { value: 'featured' } });
    
    const swordCoastCard = screen.queryByTestId('world-title-sword-coast');
    const testWorldCard = screen.queryByTestId('world-title-test-world');
    
    expect(swordCoastCard).toBeInTheDocument();
    expect(testWorldCard).not.toBeInTheDocument();
  });

  it('sorts worlds by rating', () => {
    render(<WorldSelectionPage />);
    
    const sortSelect = screen.getAllByRole('combobox')[3]; // Sort is the fourth select
    fireEvent.change(sortSelect, { target: { value: 'rating' } });
    
    const worldTitles = screen.getAllByRole('heading', { level: 3 })
      .filter(h => !h.hasAttribute('data-testid') || h.getAttribute('data-testid')?.startsWith('world-title-'))
      .map(h => h.textContent);
    
    expect(worldTitles[0]).toBe('Sword Coast'); // Higher rated world should be first
    expect(worldTitles[1]).toBe('Test World');
  });

  it('handles world liking', () => {
    render(<WorldSelectionPage />);
    
    const likeButton = screen.getByTestId('like-button-sword-coast');
    fireEvent.click(likeButton);
    
    expect(screen.getByTestId('heart-solid-icon-sword-coast')).toBeInTheDocument();
  });

  it('handles setting active world', () => {
    render(<WorldSelectionPage />);
    
    const setActiveButton = screen.getByRole('button', { name: 'Set as Active' });
    if (!setActiveButton) throw new Error('Set active button not found');
    
    fireEvent.click(setActiveButton);
    
    // The button should change to "Currently Active"
    expect(screen.getByRole('button', { name: 'Currently Active' })).toBeInTheDocument();
  });

  it('handles search functionality', () => {
    render(<WorldSelectionPage />);
    
    const searchInput = screen.getByPlaceholderText('Search worlds...');
    fireEvent.change(searchInput, { target: { value: 'Sword' } });
    
    // Get all headings with the name "Sword Coast"
    const swordCoastHeadings = screen.getAllByRole('heading', { level: 3, name: 'Sword Coast' });
    expect(swordCoastHeadings.length).toBeGreaterThan(0);
    expect(screen.queryByRole('heading', { level: 3, name: 'Test World' })).not.toBeInTheDocument();
  });
}); 