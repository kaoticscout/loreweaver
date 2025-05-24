import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, mockWorld as mockWorldFromUtils } from '../../utils/test-utils';
import { WorldView } from '../WorldView';
import { World } from '../../types/world';
import { Region } from '../../types/region';
import { City, Location } from '../../types/location';
import { ReactNode } from 'react';
import React from 'react';
import { locationService } from '../../services/locationService';
import { useLocationManagement } from '../../hooks/useLocationManagement';

// Create mock module factory
const createWorldContextMock = () => {
  const mockContextValue = {
    selectedWorld: {
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
    },
    setSelectedWorld: vi.fn(),
    isWorldSelected: true
  };

  return {
    useWorld: () => mockContextValue,
    WorldProvider: ({ children }: { children: ReactNode }) => (
      <div data-testid="world-provider">
        {children}
      </div>
    )
  };
};

vi.mock('../../contexts/WorldContext', () => createWorldContextMock());

// Mock data
const mockWorld = createWorldContextMock().useWorld().selectedWorld;

const mockRegion: Region = {
  id: 'test-region',
  name: 'Test Region',
  description: 'A test region',
  biography: 'Test biography',
  color: '#000000',
  banner: '/art/regions/test.jpg',
  notableFeatures: ['Feature 1'],
  history: {
    founding: 'Test founding',
    majorEvents: ['Event 1'],
    currentEra: 'Current era'
  },
  keyFigures: [{
    id: 'figure-1',
    name: 'Test Figure',
    title: 'Test Title',
    era: 'Test Era',
    significance: 'Test Significance',
    image: '/art/figures/test.jpg',
    avatarStyle: 'default'
  }],
  economy: {
    primaryIndustry: 'Test Industry',
    gdp: '1000 gold',
    currency: 'Gold',
    tradeGoods: [{
      name: 'Test Good',
      type: 'export',
      value: '100 gold',
      tariff: '10%',
      description: 'Test description'
    }],
    tradePartners: [{
      name: 'Test Partner',
      relationship: 'Good',
      primaryGoods: ['Test Good'],
      tradeAgreement: 'Test Agreement'
    }],
    transportationRoutes: [{
      name: 'Test Route',
      type: 'Land',
      description: 'Test description',
      security: 'High',
      frequency: 'Daily'
    }],
    economicPolicies: ['Test Policy'],
    marketRegulations: ['Test Regulation']
  },
  seasons: [{
    season: 'Summer',
    description: 'Hot',
    economicImpact: 'High trade',
    tradeModifiers: {
      exports: { 'Test Good': 1.1 },
      imports: { 'Test Good': 0.9 }
    },
    specialEvents: ['Test Event']
  }],
  magicalItems: [{
    id: 'item-1',
    name: 'Test Item',
    type: 'Weapon',
    rarity: 'Common',
    description: 'Test description',
    effects: ['Test effect'],
    location: 'Test location',
    requirements: ['Test requirement'],
    value: '100 gold',
    image: '/art/items/test.jpg'
  }],
  cities: [],
  locations: []
};

const mockCity: City = {
  id: 'test-city',
  name: 'Test City',
  description: 'A test city',
  type: 'City',
  coordinates: { x: 100, y: 100 },
  population: 1000,
  primaryRaces: ['Human'],
  notableFeatures: ['Feature 1'],
  services: ['Service 1'],
  localGovernment: 'Democracy'
};

// Mock props
const mockProps = {
  regions: [mockRegion],
  onRegionSelect: vi.fn(),
  onAddRegion: vi.fn(),
  onAddCity: vi.fn(),
  selectedRegion: null,
  selectedLocation: null,
  onLocationSelect: vi.fn(),
  onBack: vi.fn(),
  onHome: vi.fn(),
  lastAddedId: null,
  selectedDungeon: null,
  onDungeonSelect: vi.fn()
};

// Mock locationService
vi.mock('../../services/locationService', () => ({
  locationService: {
    getLocations: vi.fn(),
    saveLocations: vi.fn(),
  }
}));

// Mock useLocationManagement hook
vi.mock('../../hooks/useLocationManagement', () => ({
  useLocationManagement: vi.fn()
}));

describe('WorldView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock the location management hook with default values
    (useLocationManagement as jest.Mock).mockReturnValue({
      locations: [],
      selectedLocation: null,
      hoveredLocation: null,
      isEditMode: false,
      addLocation: vi.fn(),
      updateLocation: vi.fn(),
      deleteLocation: vi.fn(),
      selectLocation: vi.fn(),
      setHovered: vi.fn(),
      toggleEditMode: vi.fn(),
      saveLocations: vi.fn(),
      undoLocations: vi.fn(),
      setLocations: vi.fn(),
      setLocationHistory: vi.fn()
    });
  });

  it('renders without crashing', () => {
    render(<WorldView {...mockProps} />);
    expect(screen.getByAltText(`${mockWorldFromUtils.name} Map`)).toBeInTheDocument();
  });

  it('handles image loading error', () => {
    render(<WorldView {...mockProps} />);
    const img = screen.getByAltText(`${mockWorldFromUtils.name} Map`);
    fireEvent.error(img);
    expect(screen.getByText('Map image not found')).toBeInTheDocument();
  });

  it('handles image load success', () => {
    render(<WorldView {...mockProps} />);
    const img = screen.getByAltText(`${mockWorldFromUtils.name} Map`);
    
    // Mock image natural dimensions
    Object.defineProperty(img, 'naturalWidth', { value: 1000 });
    Object.defineProperty(img, 'naturalHeight', { value: 800 });
    
    fireEvent.load(img);
    expect(img.style.transform).toMatch(/scale\(.*\)/);
  });

  it('handles zoom controls', () => {
    render(<WorldView {...mockProps} />);
    const zoomInButton = screen.getByRole('button', { name: /zoom in/i });
    const zoomOutButton = screen.getByRole('button', { name: /zoom out/i });

    if (!zoomInButton || !zoomOutButton) {
      throw new Error('Zoom buttons not found');
    }

    fireEvent.click(zoomInButton);
    fireEvent.click(zoomOutButton);

    // The zoom state changes should be reflected in the image transform
    const img = screen.getByAltText(`${mockWorldFromUtils.name} Map`);
    expect(img.style.transform).toMatch(/scale\(.*\)/);
  });

  it('handles location selection', async () => {
    const location: City = {
      id: 'test-location',
      name: 'Test Location',
      description: 'A test location',
      type: 'City',
      coordinates: { x: 100, y: 100 },
      population: 1000,
      primaryRaces: ['Human'],
      notableFeatures: ['Feature 1'],
      services: ['Service 1'],
      localGovernment: 'Democracy'
    };

    // Mock the location management hook with our test location
    (useLocationManagement as jest.Mock).mockReturnValue({
      locations: [location],
      selectedLocation: null,
      hoveredLocation: null,
      isEditMode: false,
      addLocation: vi.fn(),
      updateLocation: vi.fn(),
      deleteLocation: vi.fn(),
      selectLocation: vi.fn(),
      setHovered: vi.fn(),
      toggleEditMode: vi.fn(),
      saveLocations: vi.fn(),
      undoLocations: vi.fn(),
      setLocations: vi.fn(),
      setLocationHistory: vi.fn()
    });

    const propsWithLocation = {
      ...mockProps,
      regions: [{
        ...mockRegion,
        locations: [location]
      }]
    };

    const { container } = render(<WorldView {...propsWithLocation} />);
    
    // Wait for image to load before locations are rendered
    const img = screen.getByAltText(`${mockWorldFromUtils.name} Map`);
    Object.defineProperty(img, 'naturalWidth', { value: 1000 });
    Object.defineProperty(img, 'naturalHeight', { value: 800 });
    fireEvent.load(img);

    // Give React time to process the image load and render locations
    await new Promise(resolve => setTimeout(resolve, 100));

    // Find the location marker
    const locationMarker = container.querySelector(`div[aria-label="${location.name}"]`);
    expect(locationMarker).not.toBeNull();
    if (!locationMarker) throw new Error('Location marker not found');

    fireEvent.click(locationMarker);

    expect(mockProps.onLocationSelect).toHaveBeenCalledWith(expect.objectContaining({
      name: location.name
    }));
  });

  it('handles location type filtering', async () => {
    const locations: Location[] = [
      {
        id: 'city-1',
        name: 'City 1',
        description: 'A test city',
        type: 'City',
        coordinates: { x: 100, y: 100 },
        population: 1000,
        primaryRaces: ['Human'],
        notableFeatures: ['Feature 1'],
        services: ['Service 1'],
        localGovernment: 'Democracy'
      },
      {
        id: 'village-1',
        name: 'Village 1',
        description: 'A test village',
        type: 'Village',
        coordinates: { x: 200, y: 200 },
        population: 500,
        primaryRaces: ['Human'],
        notableFeatures: ['Feature 1'],
        services: ['Service 1'],
        localGovernment: 'Democracy'
      }
    ];

    // Mock the location management hook with our test locations
    (useLocationManagement as jest.Mock).mockReturnValue({
      locations: locations,
      selectedLocation: null,
      hoveredLocation: null,
      isEditMode: false,
      addLocation: vi.fn(),
      updateLocation: vi.fn(),
      deleteLocation: vi.fn(),
      selectLocation: vi.fn(),
      setHovered: vi.fn(),
      toggleEditMode: vi.fn(),
      saveLocations: vi.fn(),
      undoLocations: vi.fn(),
      setLocations: vi.fn(),
      setLocationHistory: vi.fn()
    });

    const propsWithLocations = {
      ...mockProps,
      regions: [{
        ...mockRegion,
        locations
      }]
    };

    const { container } = render(<WorldView {...propsWithLocations} />);
    
    // Load the image
    const img = screen.getByAltText(`${mockWorldFromUtils.name} Map`);
    Object.defineProperty(img, 'naturalWidth', { value: 1000 });
    Object.defineProperty(img, 'naturalHeight', { value: 800 });
    fireEvent.load(img);

    // Give React time to process the image load and render locations
    await new Promise(resolve => setTimeout(resolve, 100));

    // Find and click the Location Types button to expand the menu
    const locationTypesButton = screen.getByText('Location Types');
    fireEvent.click(locationTypesButton);

    // Wait for the legend to expand
    await new Promise(resolve => setTimeout(resolve, 100));

    // Find all switches in the legend
    const switches = container.querySelectorAll('input[type="checkbox"]');
    console.log('Found switches:', switches.length);

    // Find the City switch by looking at its parent's text content
    const citySwitch = Array.from(switches).find(sw => {
      const parentText = sw.closest('div')?.textContent;
      console.log('Switch parent text:', parentText);
      return parentText?.includes('City');
    });

    expect(citySwitch).not.toBeNull();
    if (!citySwitch) throw new Error('City switch not found');

    fireEvent.click(citySwitch);

    // Wait for the markers to update
    await new Promise(resolve => setTimeout(resolve, 100));

    // Find the markers
    const cityMarker = container.querySelector(`div[aria-label="City 1"]`);
    const villageMarker = container.querySelector(`div[aria-label="Village 1"]`);

    expect(cityMarker).not.toBeNull();
    expect(villageMarker).not.toBeNull();

    if (!cityMarker || !villageMarker) throw new Error('Markers not found');

    // Check the computed styles
    const cityStyles = window.getComputedStyle(cityMarker);
    const villageStyles = window.getComputedStyle(villageMarker);

    expect(cityStyles.opacity).toBe('0.4');
    expect(cityStyles.pointerEvents).toBe('none');
    expect(villageStyles.opacity).toBe('1');
    expect(villageStyles.pointerEvents).toBe('auto');
  });

  it('handles context menu in edit mode', () => {
    render(<WorldView {...mockProps} />);
    
    // Enable edit mode
    const editModeToggle = screen.getByRole('checkbox', { name: 'Edit Mode' });
    fireEvent.click(editModeToggle);

    // Right click on the map
    const mapContainer = screen.getByTestId('map-container');
    fireEvent.contextMenu(mapContainer, {
      clientX: 100,
      clientY: 100
    });

    // Context menu should show location type options
    // Use getAllByText and check the first instance which should be the menu item
    const cityMenuItem = screen.getAllByText('City')[0];
    const villageMenuItem = screen.getAllByText('Village')[0];
    expect(cityMenuItem).toBeInTheDocument();
    expect(villageMenuItem).toBeInTheDocument();
  });

  it('handles map panning', () => {
    render(<WorldView {...mockProps} />);
    const mapContainer = screen.getByTestId('map-container');

    // Load the image first
    const img = screen.getByAltText(`${mockWorldFromUtils.name} Map`);
    Object.defineProperty(img, 'naturalWidth', { value: 1000 });
    Object.defineProperty(img, 'naturalHeight', { value: 800 });
    fireEvent.load(img);

    // Simulate mouse down
    fireEvent.mouseDown(mapContainer, {
      clientX: 100,
      clientY: 100
    });

    // Simulate mouse move
    fireEvent.mouseMove(mapContainer, {
      clientX: 150,
      clientY: 150
    });

    // Simulate mouse up
    fireEvent.mouseUp(mapContainer);

    // The pan state should be reflected in the image transform
    expect(img.style.transform).toMatch(/translate\(.*\)/);
  });
}); 