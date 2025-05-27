import { City, Location } from '../types/location'
// NOTE: spotlightImages is an optional property on City for carousel support
import { InformationCircleIcon, BookOpenIcon, BanknotesIcon, SparklesIcon, MapPinIcon, UserGroupIcon, BuildingStorefrontIcon, HomeIcon, XMarkIcon, ArrowLeftIcon, ArrowPathIcon, ArrowUpIcon, ArrowDownIcon, MagnifyingGlassIcon, FunnelIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { DungeonView } from './DungeonView'
import { useState, useEffect, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import type { InventoryItem } from '../types/location'
import { useBorderColor } from '../hooks/useBorderColor'
import { 
  LocationSection, 
  BasicInformationSection, 
  DeitiesSection,
  KeyFiguresSection,
  PointsOfInterestSection,
  RestAreasSection,
  ShopsSection,
  SeasonalEffectsSection,
  MagicalItemsSection,
  DungeonsSection,
  CitiesSection,
  EconomicPoliciesSection,
  TradeEconomySection,
  BiographySection,
  SpotlightCarousel,
  HeaderSection
} from './shared/LocationComponents'
import { useNavigate } from 'react-router-dom'

interface CityViewProps {
  city: City
  onDungeonSelect: (dungeon: City['dungeons'][0]) => void
  onAddDungeon: () => void
  onAddRestArea: () => void
  onAddPointOfInterest: () => void
  onAddCity: () => void
  onClose: () => void
  onBack: () => void
  renderCharacterCard: (figure: any) => JSX.Element
  renderSeasonalInfo: (entity: any) => JSX.Element
  renderMagicalItems: (entity: any) => JSX.Element
  borderColor?: {
    name: string;
    borderPrimary: string;
    borderSecondary: string;
    bgEdge: string;
    accent: string;
    borderImage: string;
  }
}

// Shop table sorting and searching helpers
function getSortedInventory(
  inventory: InventoryItem[],
  sortKey: keyof InventoryItem,
  sortDir: 'asc' | 'desc'
): InventoryItem[] {
  return [...inventory].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortDir === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });
}

function getFilteredInventory(inventory: InventoryItem[], query: string): InventoryItem[] {
  if (!query) return inventory;
  const q = query.toLowerCase();
  return inventory.filter((item: InventoryItem) =>
    item.name.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.type.toLowerCase().includes(q)
  );
}

interface ShopTableProps {
  shop: {
    id: string;
    name: string;
    owner: string;
    type: string;
    description: string;
    inventory: InventoryItem[];
  };
  borderColor?: {
    name: string;
    borderPrimary: string;
    borderSecondary: string;
    bgEdge: string;
    accent: string;
    borderImage: string;
  }
}

function ShopTable({ shop, borderColor: borderColorProp }: ShopTableProps) {
  const defaultColor = useBorderColor();
  const borderColor = borderColorProp || defaultColor;
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof InventoryItem>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const filtered = getFilteredInventory(shop.inventory, search);
  const sorted = getSortedInventory(filtered, sortKey, sortDir);

  function handleSort(key: keyof InventoryItem) {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  return (
    <div 
      className={`bg-gray-800/50 rounded-xl border ${borderColor.borderSecondary} overflow-hidden`}
    >
      {/* Shop Header */}
      <div className={`bg-gray-700/50 p-4 border-b ${borderColor.borderSecondary}`}>
        <div className="flex justify-between items-start">
          <div>
            <h6 className="text-xl font-semibold text-white mb-1">{shop.name}</h6>
            <span className="text-sm text-gray-300 block">Owned by {shop.owner}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm mb-2">{shop.type}</span>
            <span className="text-sm text-gray-300">{shop.inventory.length} items available</span>
          </div>
        </div>
        <p className="text-gray-300 mt-3 italic">{shop.description}</p>
      </div>

      {/* Inventory Table with Integrated Search */}
      <div className="overflow-x-auto">
        <div className="mb-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4-4m0 0A7 7 0 104 4a7 7 0 0013 13z" />
              </svg>
            </span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search items..."
              className="w-full pl-9 pr-3 py-1.5 text-sm rounded-md bg-gray-800/50 text-gray-200 border border-${borderColor.borderSecondary} focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800/50 text-left select-none border-b border-${borderColor.borderSecondary}">
              <th className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider text-right cursor-pointer" onClick={() => handleSort('quantity')}>
                <div className="flex items-center justify-end gap-1">
                  <span>Qty</span>
                  {sortKey === 'quantity' && (sortDir === 'asc' ? '▲' : '▼')}
                </div>
              </th>
              <th className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1">
                  <span>Item</span>
                  {sortKey === 'name' && (sortDir === 'asc' ? '▲' : '▼')}
                </div>
              </th>
              <th className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('description')}>
                <div className="flex items-center gap-1">
                  <span>Description</span>
                  {sortKey === 'description' && (sortDir === 'asc' ? '▲' : '▼')}
                </div>
              </th>
              <th className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('type')}>
                <div className="flex items-center gap-1">
                  <span>Type</span>
                  {sortKey === 'type' && (sortDir === 'asc' ? '▲' : '▼')}
                </div>
              </th>
              <th className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('rarity')}>
                <div className="flex items-center gap-1">
                  <span>Rarity</span>
                  {sortKey === 'rarity' && (sortDir === 'asc' ? '▲' : '▼')}
                </div>
              </th>
              <th className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider text-right cursor-pointer" onClick={() => handleSort('cost')}>
                <div className="flex items-center justify-end gap-1">
                  <span>Cost</span>
                  {sortKey === 'cost' && (sortDir === 'asc' ? '▲' : '▼')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {sorted.map((item) => (
              <tr 
                key={item.id}
                className="hover:bg-gray-800/30 transition-colors"
              >
                <td className="px-3 py-2 text-right">
                  <span className="text-sm text-gray-300">{item.quantity}</span>
                </td>
                <td className="px-3 py-2">
                  <span className="text-sm font-medium text-white">{item.name}</span>
                </td>
                <td className="px-3 py-2">
                  <span className="text-sm text-gray-300 line-clamp-1">{item.description}</span>
                </td>
                <td className="px-3 py-2">
                  <span className="text-sm text-gray-300">{item.type}</span>
                </td>
                <td className="px-3 py-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                    ${item.rarity === 'Common' ? 'bg-gray-700/50 text-gray-200' :
                      item.rarity === 'Uncommon' ? 'bg-green-900/30 text-green-300' :
                      item.rarity === 'Rare' ? 'bg-blue-900/30 text-blue-300' :
                      item.rarity === 'Very Rare' ? 'bg-purple-900/30 text-purple-300' :
                      'bg-yellow-900/30 text-yellow-300'}`}
                  >
                    {item.rarity}
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  <span className="text-sm font-medium text-white">{item.cost}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CityView({
  city,
  onDungeonSelect,
  onAddDungeon,
  onAddRestArea,
  onAddPointOfInterest,
  onAddCity,
  onClose,
  onBack,
  renderCharacterCard,
  renderSeasonalInfo,
  renderMagicalItems,
  borderColor: borderColorProp
}: CityViewProps) {
  const defaultColor = useBorderColor();
  const borderColor = borderColorProp || defaultColor;
  const [selectedDungeon, setSelectedDungeon] = useState<City['dungeons'][0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDungeonSelect = (dungeon: City['dungeons'][0]) => {
    setSelectedDungeon(dungeon);
    onDungeonSelect(dungeon);
    // Reset scroll position immediately without animation
    containerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const spotlightImages = [
    city.banner,
    ...(city.images || [])
  ].filter((img): img is string => !!img);

  useEffect(() => {
    if (selectedDungeon) {
      // Reset scroll position immediately without animation
      containerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [selectedDungeon]);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [city]);

  if (selectedDungeon) {
    return (
      <DungeonView
        dungeon={selectedDungeon}
        onBack={() => setSelectedDungeon(null)}
        onClose={onClose}
      />
    );
  }

  // Ensure we have default values for all required fields
  const cityWithDefaults: City = {
    ...city,
    coordinates: city.coordinates ? [city.coordinates[0], city.coordinates[1]] : undefined,
    basicInformation: {
      population: city.basicInformation?.population || '0',
      primaryRaces: city.basicInformation?.primaryRaces || [],
      deities: (city.basicInformation?.deities || []).map(deity => ({
        name: deity.name,
        titles: deity.titles || [],
        alignment: deity.alignment || 'Neutral',
        pantheon: deity.pantheon || 'Unknown',
        symbol: deity.symbol || 'None',
        domains: deity.domains || [],
        worshippers: deity.worshippers || [],
        lore: deity.lore || '',
        image: deity.image
      }))
    },
    economy: {
      ...(city.economy || {}),
      tradeGoods: (city.economy?.tradeGoods || []).map(good => {
        if (typeof good === 'string') {
          return {
            name: good,
            type: 'export',
            value: '0',
            tariff: '0',
            description: ''
          };
        }
        return good;
      }),
      tradePartners: (city.economy?.tradePartners || []).map(partner => {
        if (typeof partner === 'string') {
          return {
            name: partner,
            relationship: 'Neutral',
            primaryGoods: [],
            tradeAgreement: ''
          };
        }
        return partner;
      }),
      transportationRoutes: (city.economy?.transportationRoutes || []).map(route => {
        if (typeof route === 'string') {
          return {
            name: route,
            type: 'Land',
            description: '',
            security: 'Normal',
            frequency: 'Regular'
          };
        }
        return route;
      }),
      economicPolicies: city.economy?.economicPolicies || [],
      marketRegulations: city.economy?.marketRegulations || []
    },
    keyFigures: city.keyFigures || [],
    seasons: (city.seasons || []).map(season => ({
      name: season.name,
      season: season.season,
      description: season.description || '',
      activities: season.activities || [],
      hazards: season.hazards || [],
      magicalEffects: season.magicalEffects || [],
      economicImpact: season.economicImpact || '',
      tradeModifiers: season.tradeModifiers || { exports: {}, imports: {} },
      specialEvents: season.specialEvents || []
    })),
    magicalItems: (city.magicalItems || []).map(item => ({
      ...item,
      id: item.id || crypto.randomUUID(),
      effects: item.effects || [],
      requirements: item.requirements || [],
      properties: item.properties || []
    })),
    dungeons: (city.dungeons || []).map(dungeon => ({
      ...dungeon,
      encounters: (dungeon.encounters || []).map(encounter => ({
        ...encounter,
        creatures: encounter.creatures || [],
        treasure: encounter.treasure || {}
      })),
      rewards: dungeon.rewards || [],
      hazards: dungeon.hazards || []
    })),
    pointsOfInterest: (city.pointsOfInterest || []).map(poi => ({
      ...poi,
      notableFeatures: poi.notableFeatures || []
    })),
    restAreas: (city.restAreas || []).map(area => ({
      ...area,
      amenities: area.amenities || []
    })),
    shops: (city.shops || []).map(shop => ({
      ...shop,
      inventory: shop.inventory || []
    })),
    biography: city.biography || '',
    notableFeatures: city.notableFeatures || []
  };

  return (
    <div ref={containerRef} className="space-y-6">
      <HeaderSection
        title={cityWithDefaults.name}
        type="City"
        onBack={onBack}
        onClose={onClose}
        containerRef={containerRef}
      />

      <div className="space-y-6 p-6">
        {/* Spotlight Images Carousel */}
        <SpotlightCarousel 
          images={spotlightImages}
          borderColor={defaultColor}
        />

        <LocationSection
          name={cityWithDefaults.name}
          description={cityWithDefaults.description}
          coordinates={cityWithDefaults.coordinates}
          notableFeatures={cityWithDefaults.notableFeatures}
          borderColor={defaultColor}
        />
        <BasicInformationSection
          entity={cityWithDefaults}
          borderColor={defaultColor}
        />
        <BiographySection
          biography={cityWithDefaults.biography}
          borderColor={defaultColor}
        />
        <DeitiesSection
          deities={cityWithDefaults.basicInformation.deities}
          borderColor={defaultColor}
        />
        <KeyFiguresSection
          keyFigures={cityWithDefaults.keyFigures}
          renderCharacterCard={renderCharacterCard}
          borderColor={defaultColor}
        />
        <PointsOfInterestSection
          pointsOfInterest={cityWithDefaults.pointsOfInterest}
          onAddPointOfInterest={onAddPointOfInterest}
          borderColor={defaultColor}
        />
        <RestAreasSection
          restAreas={cityWithDefaults.restAreas}
          onAddRestArea={onAddRestArea}
          borderColor={defaultColor}
        />
        <ShopsSection
          shops={cityWithDefaults.shops}
          borderColor={defaultColor}
        />
        <TradeEconomySection
          tradeGoods={cityWithDefaults.economy?.tradeGoods || []}
          tradePartners={cityWithDefaults.economy?.tradePartners || []}
          transportationRoutes={cityWithDefaults.economy?.transportationRoutes || []}
          borderColor={defaultColor}
        />
        <EconomicPoliciesSection
          economicPolicies={cityWithDefaults.economy?.economicPolicies || []}
          marketRegulations={cityWithDefaults.economy?.marketRegulations || []}
          borderColor={defaultColor}
        />
        <SeasonalEffectsSection
          seasons={cityWithDefaults.seasons}
          borderColor={defaultColor}
        />
        <MagicalItemsSection
          magicalItems={cityWithDefaults.magicalItems}
          borderColor={defaultColor}
        />
        <DungeonsSection
          dungeons={cityWithDefaults.dungeons}
          cityName={cityWithDefaults.name}
          onDungeonSelect={handleDungeonSelect}
          onAddDungeon={onAddDungeon}
          borderColor={defaultColor}
        />
      </div>
    </div>
  );
} 