import { Region } from '../types/region'
import { City } from '../types/location'
import { InformationCircleIcon, BookOpenIcon, BanknotesIcon, SparklesIcon, XMarkIcon, MapPinIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useState, useMemo, useRef, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { useBorderColor } from '../hooks/useBorderColor'
import { 
  LocationSection, 
  BasicInformationSection, 
  KeyFiguresSection, 
  SeasonalEffectsSection, 
  MagicalItemsSection, 
  CitiesSection,
  EconomicPoliciesSection,
  TradeEconomySection,
  BiographySection,
  SpotlightCarousel,
  HeaderSection
} from './shared/LocationComponents'

interface RegionViewProps {
  region: Region
  onCitySelect: (city: City | null) => void
  onAddCity: () => void
  onAddRegion: () => void
  onClose: () => void
  onBack: () => void
  renderCharacterCard: (figure: any) => JSX.Element
  renderSeasonalInfo: (entity: Region | City) => JSX.Element
  renderMagicalItems: (entity: Region | City) => JSX.Element
}

export function RegionView({
  region,
  onCitySelect,
  onAddCity,
  onAddRegion,
  onClose,
  onBack,
  renderCharacterCard,
  renderSeasonalInfo,
  renderMagicalItems
}: RegionViewProps) {
  // Carousel state for spotlight images
  const bannerImages = [
    '/art/banners/necromancer-tower.jpg',
    '/art/banners/elven-ruins.jpg',
    '/art/banners/dragon-lair.jpg',
    '/art/banners/dwarven-forge.jpg',
    '/art/banners/crystal-caverns.jpg',
    '/art/banners/abandoned-mine.jpg',
    '/art/banners/ancient-library.jpg',
  ];
  const getRandomBanners = () => {
    const shuffled = [...bannerImages].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };
  const spotlightImages: string[] = region.images && region.images.length > 0
    ? region.images
    : useMemo(getRandomBanners, []);

  const borderColor = useBorderColor();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [region]);

  // Filter locations to only include cities and convert them to City type
  const cities = (region.locations || [])
    .filter(location => location.type === 'City' || location.type === 'Large City')
    .map(location => ({
      ...location,
      basicInformation: {
        population: location.population?.toString() || '0',
        primaryRaces: location.primaryRaces || [],
        deities: []
      },
      keyFigures: [],
      pointsOfInterest: [],
      restAreas: [],
      shops: [],
      dungeons: [],
      biography: '',
      notableFeatures: location.notableFeatures || []
    })) as City[];

  return (
    <div ref={containerRef} className="space-y-6">
      <HeaderSection
        title={region.name}
        type="Region"
        onBack={onBack}
        onClose={onClose}
        containerRef={containerRef}
      />

      <div className="space-y-6 p-6">
        {/* Spotlight Images Carousel */}
        <SpotlightCarousel 
          images={spotlightImages}
          borderColor={borderColor}
        />

        {/* Location Section */}
        <LocationSection 
          name={region.name}
          description={region.description}
          notableFeatures={region.notableFeatures}
          borderColor={borderColor}
        />

        {/* Basic Information Section */}
        <BasicInformationSection 
          entity={{
            economy: {
              primaryIndustry: region.economy?.primaryIndustry,
              gdp: region.economy?.gdp,
              currency: region.economy?.currency
            },
            basicInformation: {
              population: region.economy?.gdp, // Using GDP as a proxy for population
              primaryRaces: [] // Regions don't have primary races in the current type
            },
            notableFeatures: region.notableFeatures
          }}
          borderColor={borderColor}
        />

        {/* Key Figures Section */}
        {region.keyFigures && region.keyFigures.length > 0 && (
          <KeyFiguresSection
            keyFigures={region.keyFigures}
            renderCharacterCard={renderCharacterCard}
            borderColor={borderColor}
          />
        )}

        {/* Economic Policies Section */}
        {region.economy?.economicPolicies && region.economy.economicPolicies.length > 0 && (
          <EconomicPoliciesSection
            economicPolicies={region.economy.economicPolicies}
            marketRegulations={region.economy.marketRegulations || []}
            borderColor={borderColor}
          />
        )}

        {/* Seasonal Effects Section */}
        {region.seasons && region.seasons.length > 0 && (
          <SeasonalEffectsSection
            seasons={region.seasons}
            borderColor={borderColor}
          />
        )}

        {/* Magical Items Section */}
        {region.magicalItems && region.magicalItems.length > 0 && (
          <MagicalItemsSection
            magicalItems={region.magicalItems}
            borderColor={borderColor}
          />
        )}

        {/* Cities Section */}
        <CitiesSection
          cities={cities}
          parentName={region.name}
          onCitySelect={(city) => onCitySelect(city)}
          onAddCity={onAddCity}
          borderColor={borderColor}
        />
      </div>
    </div>
  )
} 