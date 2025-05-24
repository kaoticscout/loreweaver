import { render, screen, fireEvent } from '@testing-library/react';
import { RegionView } from '../RegionView';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Region } from '../../types/region';

// Mock scrollTo
const scrollToMock = vi.fn();
Element.prototype.scrollTo = scrollToMock;
window.scrollTo = scrollToMock;

// Mock data
const mockRegion: Region = {
  id: '1',
  name: 'Test Region',
  description: 'A test region description',
  biography: 'A brief history of the test region',
  color: '#FF0000',
  banner: '/banners/test-region.jpg',
  images: ['/test-image-1.jpg', '/test-image-2.jpg'],
  notableFeatures: ['Feature 1', 'Feature 2'],
  history: {
    founding: 'Founded in ancient times',
    majorEvents: ['Event 1', 'Event 2'],
    currentEra: 'Modern Era'
  },
  keyFigures: [
    {
      id: '1',
      name: 'Test Figure',
      title: 'Leader',
      era: 'Current',
      significance: 'Important leader',
      image: '/figures/test-figure.jpg',
      avatarStyle: 'modern'
    }
  ],
  economy: {
    primaryIndustry: 'Agriculture',
    gdp: '1000000',
    currency: 'Gold',
    tradeGoods: [
      {
        name: 'Wheat',
        type: 'export',
        value: '100',
        tariff: '10%',
        description: 'High quality wheat'
      }
    ],
    tradePartners: [
      {
        name: 'Neighboring Region',
        relationship: 'Friendly',
        primaryGoods: ['Wheat', 'Iron'],
        tradeAgreement: 'Free Trade'
      }
    ],
    transportationRoutes: [
      {
        name: 'Main Road',
        type: 'Land',
        description: 'Well-maintained road',
        security: 'High',
        frequency: 'Daily'
      }
    ],
    economicPolicies: ['Free Trade'],
    marketRegulations: ['No restrictions']
  },
  seasons: [],
  magicalItems: [],
  cities: [],
  locations: []
};

// Mock functions
const mockOnCitySelect = vi.fn();
const mockOnAddCity = vi.fn();
const mockOnAddRegion = vi.fn();
const mockOnClose = vi.fn();
const mockOnBack = vi.fn();
const mockRenderCharacterCard = vi.fn((figure) => (
  <div data-testid="character-card">{figure.name}</div>
));
const mockRenderSeasonalInfo = vi.fn((entity) => (
  <div data-testid="seasonal-info">
    {entity.seasons.map((season: any) => (
      <div key={season.season}>{season.season}</div>
    ))}
  </div>
));
const mockRenderMagicalItems = vi.fn((entity) => (
  <div data-testid="magical-items">
    {entity.magicalItems.map((item: any) => (
      <div key={item.name}>{item.name}</div>
    ))}
  </div>
));

describe('RegionView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders region name and description', () => {
    render(
      <RegionView
        region={mockRegion}
        onCitySelect={mockOnCitySelect}
        onAddCity={mockOnAddCity}
        onAddRegion={mockOnAddRegion}
        onClose={mockOnClose}
        onBack={mockOnBack}
        renderCharacterCard={mockRenderCharacterCard}
        renderSeasonalInfo={mockRenderSeasonalInfo}
        renderMagicalItems={mockRenderMagicalItems}
      />
    );

    expect(screen.getByRole('heading', { name: 'Test Region', level: 2 })).toBeInTheDocument();
    expect(screen.getByText('A test region description')).toBeInTheDocument();
  });

  it('renders notable features', () => {
    render(
      <RegionView
        region={mockRegion}
        onCitySelect={mockOnCitySelect}
        onAddCity={mockOnAddCity}
        onAddRegion={mockOnAddRegion}
        onClose={mockOnClose}
        onBack={mockOnBack}
        renderCharacterCard={mockRenderCharacterCard}
        renderSeasonalInfo={mockRenderSeasonalInfo}
        renderMagicalItems={mockRenderMagicalItems}
      />
    );

    // Find the notable features heading by its role and text
    const notableFeaturesHeading = screen.getByRole('heading', { name: /notable features/i });
    expect(notableFeaturesHeading).toBeInTheDocument();
    
    // Check for the feature items - use getAllByText and take the first occurrence
    expect(screen.getAllByText('Feature 1')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Feature 2')[0]).toBeInTheDocument();
  });

  it('renders basic information', () => {
    render(
      <RegionView
        region={mockRegion}
        onCitySelect={mockOnCitySelect}
        onAddCity={mockOnAddCity}
        onAddRegion={mockOnAddRegion}
        onClose={mockOnClose}
        onBack={mockOnBack}
        renderCharacterCard={mockRenderCharacterCard}
        renderSeasonalInfo={mockRenderSeasonalInfo}
        renderMagicalItems={mockRenderMagicalItems}
      />
    );

    // Check for section heading
    expect(screen.getByRole('heading', { name: /basic information/i })).toBeInTheDocument();

    // Check for primary industry
    expect(screen.getByText('Primary Industry')).toBeInTheDocument();
    expect(screen.getByText('Agriculture')).toBeInTheDocument();

    // Check for GDP
    expect(screen.getByText('GDP')).toBeInTheDocument();
    expect(screen.getAllByText('1000000')[0]).toBeInTheDocument(); // Use getAllByText and take the first occurrence

    // Check for currency
    expect(screen.getByText('Currency')).toBeInTheDocument();
    expect(screen.getByText('Gold')).toBeInTheDocument();
  });

  it('renders key figures section', () => {
    render(
      <RegionView
        region={mockRegion}
        onCitySelect={mockOnCitySelect}
        onAddCity={mockOnAddCity}
        onAddRegion={mockOnAddRegion}
        onClose={mockOnClose}
        onBack={mockOnBack}
        renderCharacterCard={mockRenderCharacterCard}
        renderSeasonalInfo={mockRenderSeasonalInfo}
        renderMagicalItems={mockRenderMagicalItems}
      />
    );

    expect(mockRenderCharacterCard).toHaveBeenCalledWith(mockRegion.keyFigures[0]);
    expect(screen.getByTestId('character-card')).toBeInTheDocument();
  });

  it('renders economic policies section', () => {
    render(
      <RegionView
        region={mockRegion}
        onCitySelect={mockOnCitySelect}
        onAddCity={mockOnAddCity}
        onAddRegion={mockOnAddRegion}
        onClose={mockOnClose}
        onBack={mockOnBack}
        renderCharacterCard={mockRenderCharacterCard}
        renderSeasonalInfo={mockRenderSeasonalInfo}
        renderMagicalItems={mockRenderMagicalItems}
      />
    );

    expect(screen.getByText('Free Trade')).toBeInTheDocument();
    expect(screen.getByText('No restrictions')).toBeInTheDocument();
  });

  it('handles back and close actions', async () => {
    render(
      <RegionView
        region={mockRegion}
        onCitySelect={mockOnCitySelect}
        onAddCity={mockOnAddCity}
        onAddRegion={mockOnAddRegion}
        onClose={mockOnClose}
        onBack={mockOnBack}
        renderCharacterCard={mockRenderCharacterCard}
        renderSeasonalInfo={mockRenderSeasonalInfo}
        renderMagicalItems={mockRenderMagicalItems}
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
    const minimalRegion: Region = {
      id: '1',
      name: 'Minimal Region',
      description: 'A minimal region',
      biography: '',
      color: '#000000',
      banner: '',
      notableFeatures: [],
      history: {
        founding: '',
        majorEvents: [],
        currentEra: ''
      },
      keyFigures: [],
      economy: {
        primaryIndustry: '',
        gdp: '',
        currency: '',
        tradeGoods: [],
        tradePartners: [],
        transportationRoutes: [],
        economicPolicies: [],
        marketRegulations: []
      },
      seasons: [],
      magicalItems: [],
      cities: [],
      locations: []
    };

    render(
      <RegionView
        region={minimalRegion}
        onCitySelect={mockOnCitySelect}
        onAddCity={mockOnAddCity}
        onAddRegion={mockOnAddRegion}
        onClose={mockOnClose}
        onBack={mockOnBack}
        renderCharacterCard={mockRenderCharacterCard}
        renderSeasonalInfo={mockRenderSeasonalInfo}
        renderMagicalItems={mockRenderMagicalItems}
      />
    );

    expect(screen.getByRole('heading', { name: 'Minimal Region', level: 2 })).toBeInTheDocument();
    expect(screen.getByText('A minimal region')).toBeInTheDocument();
  });

  it('calls scrollTo on mount', () => {
    render(
      <RegionView
        region={mockRegion}
        onCitySelect={mockOnCitySelect}
        onAddCity={mockOnAddCity}
        onAddRegion={mockOnAddRegion}
        onClose={mockOnClose}
        onBack={mockOnBack}
        renderCharacterCard={mockRenderCharacterCard}
        renderSeasonalInfo={mockRenderSeasonalInfo}
        renderMagicalItems={mockRenderMagicalItems}
      />
    );

    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
  });
}); 