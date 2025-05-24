import { render, screen, fireEvent } from '@testing-library/react';
import { DungeonView } from '../DungeonView';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Dungeon } from '../../types/city';

// Mock scrollTo
const scrollToMock = vi.fn();
Element.prototype.scrollTo = scrollToMock;
window.scrollTo = scrollToMock;

// Mock data
const mockDungeon: Dungeon = {
  id: '1',
  name: 'Test Dungeon',
  description: 'A test dungeon description',
  challengeRating: 5,
  location: {
    region: 'Test Region',
    environment: 'Cave'
  },
  encounters: ['encounter1', 'encounter2'],
  treasure: {
    gold: 1000,
    gems: [
      { type: 'Diamond', value: 500 },
      { type: 'Ruby', value: 300 }
    ],
    art: [
      { type: 'Painting', value: 200 },
      { type: 'Statue', value: 400 }
    ],
    magicItems: [
      { name: 'Magic Sword', rarity: 'Rare' },
      { name: 'Potion of Healing', rarity: 'Common' }
    ]
  },
  level: '5',
  difficulty: 'Medium',
  inhabitants: ['Goblins', 'Trolls'],
  treasures: ['Gold Coins', 'Magical Artifacts'],
  hazards: ['Traps', 'Poison Gas'],
  history: 'An ancient dungeon with a dark past',
  images: ['/dungeon/test-image-1.jpg', '/dungeon/test-image-2.jpg']
};

// Mock functions
const mockOnBack = vi.fn();
const mockOnClose = vi.fn();

describe('DungeonView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders basic dungeon information', () => {
    render(
      <DungeonView
        dungeon={mockDungeon}
        onBack={mockOnBack}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByRole('heading', { name: 'Test Dungeon', level: 2 })).toBeInTheDocument();
    expect(screen.getByText('A test dungeon description')).toBeInTheDocument();
  });

  it('renders location information', () => {
    render(
      <DungeonView
        dungeon={mockDungeon}
        onBack={mockOnBack}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getAllByText(mockDungeon.name)[1]).toBeInTheDocument();
    expect(screen.getByText(mockDungeon.description)).toBeInTheDocument();
  });

  it('renders basic information section', () => {
    render(
      <DungeonView
        dungeon={mockDungeon}
        onBack={mockOnBack}
        onClose={mockOnClose}
      />
    );

    // Check for section heading
    expect(screen.getByText('Basic Information')).toBeInTheDocument();

    // Check for population (level)
    expect(screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'span' && 
             element?.classList.contains('text-xs') && 
             element?.classList.contains('text-purple-300') && 
             content === 'Population';
    })).toBeInTheDocument();
    expect(screen.getByText('Level 5')).toBeInTheDocument();

    // Check for primary races (environment)
    expect(screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'span' && 
             element?.classList.contains('text-xs') && 
             element?.classList.contains('text-pink-300') && 
             content === 'Primary Races';
    })).toBeInTheDocument();
    expect(screen.getByText('Cave')).toBeInTheDocument();
  });

  it('renders inhabitants section', () => {
    render(
      <DungeonView
        dungeon={mockDungeon}
        onBack={mockOnBack}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Inhabitants')).toBeInTheDocument();
    expect(screen.getByText('Goblins')).toBeInTheDocument();
    expect(screen.getByText('Trolls')).toBeInTheDocument();
  });

  it('renders hazards section', () => {
    render(
      <DungeonView
        dungeon={mockDungeon}
        onBack={mockOnBack}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Hazards')).toBeInTheDocument();
    expect(screen.getByText('Traps')).toBeInTheDocument();
    expect(screen.getByText('Poison Gas')).toBeInTheDocument();
  });

  it('renders treasure information', () => {
    render(
      <DungeonView
        dungeon={mockDungeon}
        onBack={mockOnBack}
        onClose={mockOnClose}
      />
    );

    // Check for treasure section heading
    expect(screen.getByText('Treasure')).toBeInTheDocument();

    // Check for gold section
    expect(screen.getByText('Gold')).toBeInTheDocument();
    expect(screen.getByText('1000 gp')).toBeInTheDocument();

    // Check for gems section
    expect(screen.getAllByText('Gems')[0]).toBeInTheDocument();
    expect(screen.getByText('Diamond')).toBeInTheDocument();
    expect(screen.getByText('500 gp')).toBeInTheDocument();
    expect(screen.getByText('Ruby')).toBeInTheDocument();
    expect(screen.getByText('300 gp')).toBeInTheDocument();

    // Check for art section
    expect(screen.getByText('Art')).toBeInTheDocument();
    expect(screen.getByText('Painting')).toBeInTheDocument();
    expect(screen.getByText('200 gp')).toBeInTheDocument();
    expect(screen.getByText('Statue')).toBeInTheDocument();
    expect(screen.getByText('400 gp')).toBeInTheDocument();

    // Check for magic items section
    expect(screen.getByText('Magic Items')).toBeInTheDocument();
    expect(screen.getByText('Magic Sword')).toBeInTheDocument();
    expect(screen.getByText('Rare')).toBeInTheDocument();
    expect(screen.getByText('Potion of Healing')).toBeInTheDocument();
    expect(screen.getByText('Common')).toBeInTheDocument();
  });

  it('renders history section', () => {
    render(
      <DungeonView
        dungeon={mockDungeon}
        onBack={mockOnBack}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('An ancient dungeon with a dark past')).toBeInTheDocument();
  });

  it('handles back and close actions', async () => {
    render(
      <DungeonView
        dungeon={mockDungeon}
        onBack={mockOnBack}
        onClose={mockOnClose}
      />
    );

    const backButton = screen.getByRole('button', { name: /back/i });
    const closeButton = screen.getByRole('button', { name: /close/i });

    await userEvent.click(backButton);
    expect(mockOnBack).toHaveBeenCalled();

    await userEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('handles missing optional data gracefully', () => {
    const minimalDungeon: Dungeon = {
      id: '1',
      name: 'Minimal Dungeon',
      description: 'A minimal dungeon',
      challengeRating: 1,
      location: {
        region: 'Test Region',
        environment: 'Cave'
      },
      encounters: [],
      treasure: {
        gold: 0
      },
      level: '1',
      difficulty: 'Easy',
      inhabitants: [],
      treasures: [],
      hazards: [],
      history: ''
    };

    render(
      <DungeonView
        dungeon={minimalDungeon}
        onBack={mockOnBack}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByRole('heading', { name: 'Minimal Dungeon', level: 2 })).toBeInTheDocument();
    expect(screen.getByText('A minimal dungeon')).toBeInTheDocument();
  });

  it('calls scrollTo on mount', () => {
    render(
      <DungeonView
        dungeon={mockDungeon}
        onBack={mockOnBack}
        onClose={mockOnClose}
      />
    );

    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
  });
}); 