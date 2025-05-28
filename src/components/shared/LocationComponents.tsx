import { useBorderColor } from '../../hooks/useBorderColor'
import { MapPinIcon, InformationCircleIcon, UserGroupIcon, BanknotesIcon, SparklesIcon, HomeIcon, BuildingStorefrontIcon, BookOpenIcon, BoltIcon, ShieldExclamationIcon, CurrencyDollarIcon, ChevronDownIcon, ChevronUpIcon, PaintBrushIcon } from '@heroicons/react/24/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { Dungeon as CityDungeon, City } from '../../types/city'
import { DungeonEncounter } from '../../types/dungeonEncounter'
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/solid'

interface LocationSectionProps {
  name: string
  description: string
  coordinates?: {
    x: number;
    y: number;
  };
  notableFeatures: string[]
  borderColor: {
    borderSecondary: string
  }
}

export function LocationSection({ name, description, coordinates, notableFeatures, borderColor: borderColorProp }: LocationSectionProps) {
  const defaultColor = useBorderColor()
  const borderColor = borderColorProp || defaultColor

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <MapPinIcon className="w-5 h-5" />
        <h4 className="text-xl font-semibold">Location</h4>
      </div>
      <div className={`bg-gray-800/40 rounded-lg p-4 border ${borderColor.borderSecondary}`}>
        <div className="space-y-4">
          <div>
            <h5 className="text-lg font-semibold text-white mb-2">{name}</h5>
            <p className="text-sm text-gray-300">{description}</p>
          </div>
          
          {coordinates && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Coordinates:</span>
              <span className="text-sm text-gray-300">{coordinates.x}, {coordinates.y}</span>
            </div>
          )}
          
          {notableFeatures && notableFeatures.length > 0 && (
            <div>
              <h6 className="text-sm font-semibold text-gray-300 mb-2">Notable Features</h6>
              <div className="flex flex-wrap gap-2">
                {notableFeatures.map((feature, idx) => (
                  <span 
                    key={idx}
                    className="inline-block bg-gray-700/60 text-white text-xs font-semibold rounded-md px-3 py-1"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface BasicInformationSectionProps {
  entity: {
    economy?: {
      primaryIndustry?: string;
      gdp?: string;
      currency?: string;
    };
    basicInformation?: {
      population?: string;
      primaryRaces?: string[];
    };
    notableFeatures?: string[];
  };
  borderColor: {
    borderSecondary: string;
  };
}

export function BasicInformationSection({ entity, borderColor }: BasicInformationSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 font-sans">
        <InformationCircleIcon className="w-5 h-5 text-blue-400" />
        <h4 className="text-xl font-semibold">Basic Information</h4>
      </div>
      <div className={`bg-gray-800/40 rounded-lg p-4 border ${borderColor.borderSecondary} font-sans`}>
        <div className="grid grid-cols-2 gap-4 divide-x divide-gray-700/40">
          <div className="pr-4 flex flex-col gap-2">
            {entity.economy?.primaryIndustry && (
              <>
                <div className="flex items-center gap-2">
                  <BanknotesIcon className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-300">Primary Industry</span>
                </div>
                <span className="inline-block bg-gray-700/60 text-white text-xs font-semibold rounded-md px-3 py-1 mb-1">{entity.economy.primaryIndustry}</span>
              </>
            )}
            {entity.economy?.gdp && (
              <>
                <div className="flex items-center gap-2 mt-2">
                  <BanknotesIcon className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-yellow-200">GDP</span>
                </div>
                <span className="inline-block bg-gray-700/60 text-white text-xs font-semibold rounded-md px-3 py-1 mb-1">{entity.economy.gdp}</span>
              </>
            )}
            {entity.economy?.currency && (
              <>
                <div className="flex items-center gap-2 mt-2">
                  <BanknotesIcon className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-cyan-300">Currency</span>
                </div>
                <span className="inline-block bg-gray-700/60 text-white text-xs font-semibold rounded-md px-3 py-1 mb-1">{entity.economy.currency}</span>
              </>
            )}
            {entity.basicInformation?.population && (
              <>
                <div className="flex items-center gap-2 mt-2">
                  <UserGroupIcon className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-purple-300">Population</span>
                </div>
                <span className="inline-block bg-gray-700/60 text-white text-xs font-semibold rounded-md px-3 py-1 mb-1">{entity.basicInformation.population}</span>
              </>
            )}
            {entity.basicInformation?.primaryRaces && entity.basicInformation.primaryRaces.length > 0 && (
              <>
                <div className="flex items-center gap-2 mt-2">
                  <UserGroupIcon className="w-4 h-4 text-pink-400" />
                  <span className="text-xs text-pink-300">Primary Races</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {entity.basicInformation.primaryRaces.map((race, idx) => (
                    <span key={idx} className="inline-block bg-gray-700/60 border border-pink-900/40 text-white text-xs font-semibold rounded-md px-3 py-1">
                      {race}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="pl-4 flex flex-col gap-2">
            {entity.notableFeatures && entity.notableFeatures.length > 0 && (
              <>
                <div className="flex items-center gap-2 mt-2">
                  <SparklesIcon className="w-4 h-4 text-pink-400" />
                  <span className="text-xs text-pink-300">Notable Features</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {entity.notableFeatures.map((feature, idx) => (
                    <span key={idx} className="inline-block bg-gray-700/60 border border-blue-900/40 text-white text-xs font-semibold rounded-md px-3 py-1">
                      {feature}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface Deity {
  name: string
  titles?: string[]
  alignment: string
  pantheon: string
  symbol: string
  domains?: string[]
  worshippers?: string[]
  lore?: string
  image?: string
}

interface DeitiesSectionProps {
  deities: Deity[]
  borderColor?: {
    name: string
    borderPrimary: string
    borderSecondary: string
    bgEdge: string
    accent: string
    borderImage: string
  }
}

export function DeitiesSection({ deities, borderColor: borderColorProp }: DeitiesSectionProps) {
  const defaultColor = useBorderColor()
  const borderColor = borderColorProp || defaultColor

  if (deities.length === 0) return null

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <SparklesIcon className="w-5 h-5 text-gray-300" />
        <h4 className="text-xl font-semibold text-gray-200">Deities</h4>
      </div>
      <div className={`bg-gray-800/40 rounded-lg p-4 border ${borderColor.borderSecondary}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deities.map((deity, index) => (
            <div key={index} className={`relative bg-gray-900/60 rounded-xl border ${borderColor.borderSecondary} shadow-lg p-6 flex flex-col items-center gap-4`}>
              {/* Deity Image - fixed size */}
              {deity.image && (
                <div className="relative mb-2 flex justify-center items-center w-full">
                  <div className="relative">
                    <img 
                      src={deity.image} 
                      alt={deity.name} 
                      className={`w-32 h-32 object-cover border ${borderColor.borderSecondary} shadow-lg bg-gray-800 rounded-lg`}
                    />
                  </div>
                </div>
              )}
              <div className="flex-1 flex flex-col gap-2 items-center w-full">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl font-bold text-white text-center">{deity.name}</span>
                  {deity.titles && deity.titles.length > 0 && (
                    <span className="text-xs text-blue-300 bg-blue-900/40 px-2 py-1 rounded-full mt-1">{deity.titles.join(', ')}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-gray-400 justify-center">
                  <span className="bg-gray-700/60 px-2 py-1 rounded">Alignment: <span className="text-gray-200">{deity.alignment}</span></span>
                  <span className="bg-gray-700/60 px-2 py-1 rounded">Pantheon: <span className="text-gray-200">{deity.pantheon}</span></span>
                  <span className="bg-gray-700/60 px-2 py-1 rounded">Symbol: <span className="text-gray-200">{deity.symbol}</span></span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-green-300 mt-1 justify-center">
                  {deity.domains && deity.domains.map(domain => (
                    <span key={domain} className="bg-green-900/40 px-2 py-1 rounded-full">{domain}</span>
                  ))}
                </div>
                <div className="text-sm text-gray-300 mt-2 text-center">
                  <span className="font-semibold text-gray-200">Worshippers:</span> {deity.worshippers && deity.worshippers.join(', ')}
                </div>
                <div className="text-xs italic text-gray-400 mt-1 text-center">
                  {deity.lore}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface KeyFiguresSectionProps {
  keyFigures: any[] // Using any since the actual type is passed through renderCharacterCard
  renderCharacterCard: (figure: any) => JSX.Element
  borderColor?: {
    name: string
    borderPrimary: string
    borderSecondary: string
    bgEdge: string
    accent: string
    borderImage: string
  }
}

export function KeyFiguresSection({ keyFigures, renderCharacterCard, borderColor: borderColorProp }: KeyFiguresSectionProps) {
  const defaultColor = useBorderColor()
  const borderColor = borderColorProp || defaultColor

  if (keyFigures.length === 0) return null

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <UserGroupIcon className="w-5 h-5" />
        <h4 className="text-xl font-semibold">Key Figures</h4>
      </div>
      <div className={`bg-gray-800/40 rounded-lg p-4 border ${borderColor.borderSecondary}`}>
        <div className="grid grid-cols-2 gap-4">
          {keyFigures.map((figure) => (
            <div key={figure.id}>
              {renderCharacterCard(figure)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface PointOfInterest {
  id: string
  name: string
  description: string
  significance: string
  type: string
  notableFeatures?: string[]
}

interface PointsOfInterestSectionProps {
  pointsOfInterest: PointOfInterest[]
  onAddPointOfInterest: () => void
  borderColor?: {
    name: string
    borderPrimary: string
    borderSecondary: string
    bgEdge: string
    accent: string
    borderImage: string
  }
}

export function PointsOfInterestSection({ pointsOfInterest, onAddPointOfInterest, borderColor: borderColorProp }: PointsOfInterestSectionProps) {
  const defaultColor = useBorderColor()
  const borderColor = borderColorProp || defaultColor

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <MapPinIcon className="w-5 h-5" />
        <h4 className="text-xl font-semibold">Points of Interest</h4>
      </div>
      <div className={`bg-gray-800/40 rounded-xl border ${borderColor.borderSecondary} p-6`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(pointsOfInterest ?? []).map((poi) => (
            <div key={poi.id} className={`bg-gray-900/60 rounded-xl border ${borderColor.borderSecondary} shadow-lg p-5 flex flex-col gap-2 relative`}>
              <div className="flex items-center mb-1">
                <h6 className="text-lg font-bold text-white flex-1">{poi.name}</h6>
              </div>
              <p className="text-sm text-gray-300 mb-1">{poi.description}</p>
              <p className="text-xs text-gray-400 mb-1 italic">{poi.significance}</p>
              <div className="flex flex-wrap gap-2 my-1">
                <span className="px-2 py-0.5 bg-blue-700/40 text-blue-200 text-xs rounded-md font-semibold">{poi.type}</span>
              </div>
              {Array.isArray(poi.notableFeatures) && poi.notableFeatures.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-400 mb-1">Notable Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {(Array.isArray(poi.notableFeatures) ? poi.notableFeatures : []).map((feature, index) => (
                      <span key={index} className="inline-block bg-gray-700/60 border border-${borderColor.borderSecondary} text-white text-xs font-semibold rounded-md px-2 py-0.5">{feature}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* Add Point of Interest Card */}
          <div
            className={`bg-gray-900/60 rounded-xl border ${borderColor.borderSecondary} shadow-lg p-5 flex flex-col items-center justify-center min-h-[220px] cursor-pointer hover:bg-gray-800/80 transition-colors`}
            onClick={onAddPointOfInterest}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-lg font-bold text-blue-300">Create Point of Interest</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface RestArea {
  id: string
  name: string
  description: string
  type: string
  quality: string
  price: string
  amenities?: string[]
}

interface RestAreasSectionProps {
  restAreas: RestArea[]
  onAddRestArea: () => void
  borderColor?: {
    name: string
    borderPrimary: string
    borderSecondary: string
    bgEdge: string
    accent: string
    borderImage: string
  }
}

export function RestAreasSection({ restAreas, onAddRestArea, borderColor: borderColorProp }: RestAreasSectionProps) {
  const defaultColor = useBorderColor()
  const borderColor = borderColorProp || defaultColor

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <HomeIcon className="w-5 h-5" />
        <h4 className="text-xl font-semibold">Rest Areas</h4>
      </div>
      <div className={`bg-gray-800/40 rounded-xl border ${borderColor.borderSecondary} p-6`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(restAreas ?? []).map((area) => (
            <div key={area.id} className={`bg-gray-900/60 rounded-xl border ${borderColor.borderSecondary} shadow-lg p-5 flex flex-col gap-2 relative`}>
              <div className="flex items-center mb-1">
                <h6 className="text-lg font-bold text-white flex-1">{area.name}</h6>
              </div>
              <p className="text-sm text-gray-300 mb-1">{area.description}</p>
              <div className="flex flex-wrap gap-2 my-1">
                <span className="px-2 py-0.5 bg-green-700/40 text-green-200 text-xs rounded-md font-semibold">{area.type}</span>
                <span className="bg-yellow-700/40 text-yellow-100 text-xs rounded-md px-2 py-0.5 font-semibold">Quality: {area.quality}</span>
                <span className="bg-blue-700/40 text-blue-100 text-xs rounded-md px-2 py-0.5 font-semibold">Price: {area.price}</span>
              </div>
              {Array.isArray(area.amenities) && area.amenities.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-400 mb-1">Amenities:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {(Array.isArray(area.amenities) ? area.amenities : []).map((amenity, index) => (
                      <span key={index} className="inline-block bg-gray-700/60 border border-${borderColor.borderSecondary} text-white text-xs font-semibold rounded-md px-2 py-0.5">{amenity}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* Add Rest Area Card */}
          <div
            className={`bg-gray-900/60 rounded-xl border ${borderColor.borderSecondary} shadow-lg p-5 flex flex-col items-center justify-center min-h-[220px] cursor-pointer hover:bg-gray-800/80 transition-colors`}
            onClick={onAddRestArea}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-lg font-bold text-blue-300">Create Rest Area</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface InventoryItem {
  id: string
  name: string
  description: string
  type: string
  rarity: string
  cost: string
  quantity: number
}

interface Shop {
  id: string
  name: string
  owner: string
  type: string
  description: string
  inventory: InventoryItem[]
}

interface ShopsSectionProps {
  shops: Shop[]
  borderColor?: {
    name: string
    borderPrimary: string
    borderSecondary: string
    bgEdge: string
    accent: string
    borderImage: string
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

function ShopTable({ shop, borderColor: borderColorProp }: { shop: Shop, borderColor?: ShopsSectionProps['borderColor'] }) {
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

export function ShopsSection({ shops, borderColor: borderColorProp }: ShopsSectionProps) {
  const defaultColor = useBorderColor()
  const borderColor = borderColorProp || defaultColor

  if (shops.length === 0) return null

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <BuildingStorefrontIcon className="w-6 h-6 text-blue-400" />
        <h4 className="text-2xl font-semibold">Shops & Markets</h4>
      </div>
      <div className="space-y-8">
        {shops.map((shop) => (
          <ShopTable key={shop.id} shop={shop} borderColor={borderColor} />
        ))}
      </div>
    </div>
  )
}

interface SeasonalEffect {
  name?: string
  season?: string
  description: string
  activities?: string[]
  hazards?: string[]
  magicalEffects?: string[]
  economicImpact?: string
  tradeModifiers?: {
    exports: Record<string, number>
    imports: Record<string, number>
  }
  specialEvents?: string[]
}

interface SeasonalEffectsSectionProps {
  seasons: SeasonalEffect[]
  borderColor?: {
    name: string
    borderPrimary: string
    borderSecondary: string
    bgEdge: string
    accent: string
    borderImage: string
  }
}

export function SeasonalEffectsSection({ seasons, borderColor: borderColorProp }: SeasonalEffectsSectionProps) {
  const defaultColor = useBorderColor()
  const borderColor = borderColorProp || defaultColor

  if (seasons.length === 0) return null

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <SparklesIcon className="w-6 h-6 text-yellow-400" />
        <h4 className="text-2xl font-semibold">Seasonal Effects</h4>
      </div>
      <div className={`bg-gray-800/40 rounded-xl border ${borderColor.borderSecondary} p-6`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {seasons.map((season, index) => {
            const name = (typeof season.name === 'string' ? season.name : season.season || '').toLowerCase();
            let gradient = 'bg-gradient-to-br from-gray-900 via-gray-800 to-black';
            let border = borderColor.borderSecondary;
            let emoji = '✨';
            let text = 'text-yellow-200';
            if (name.includes('winter')) {
              gradient = 'bg-gradient-to-br from-blue-900 via-blue-800 to-black';
              border = 'border-blue-400';
              emoji = '❄️';
              text = 'text-blue-200';
            } else if (name.includes('spring')) {
              gradient = 'bg-gradient-to-br from-green-900 via-green-700 to-black';
              border = 'border-green-400';
              emoji = '🌱';
              text = 'text-green-200';
            } else if (name.includes('summer')) {
              gradient = 'bg-gradient-to-br from-yellow-700 via-orange-800 to-black';
              border = 'border-yellow-400';
              emoji = '☀️';
              text = 'text-yellow-200';
            } else if (name.includes('autumn') || name.includes('fall')) {
              gradient = 'bg-gradient-to-br from-orange-900 via-orange-700 to-black';
              border = 'border-orange-400';
              emoji = '🍂';
              text = 'text-orange-200';
            }
            return (
              <div
                key={index}
                className={`${gradient} border ${border} shadow-lg rounded-xl p-6 flex flex-col gap-3 relative`}
              >
                <h5 className={`text-lg font-bold flex items-center gap-2 mb-2 ${text}`}>
                  <span>{emoji}</span>
                  {'name' in season ? season.name : season.season}
                </h5>
                <p className="text-sm text-gray-200 mb-2">{season.description}</p>
                <div className="flex flex-col gap-2">
                  {season.activities && season.activities.length > 0 && (
                    <div>
                      <h6 className="text-xs font-semibold text-blue-300 mb-1">Activities</h6>
                      <ul className="list-disc list-inside text-sm text-blue-100 ml-4">
                        {season.activities.map((activity, i) => (
                          <li key={i}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {season.hazards && season.hazards.length > 0 && (
                    <div>
                      <h6 className="text-xs font-semibold text-pink-300 mb-1">Hazards</h6>
                      <ul className="list-disc list-inside text-sm text-pink-100 ml-4">
                        {season.hazards.map((hazard, i) => (
                          <li key={i}>{hazard}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {season.magicalEffects && season.magicalEffects.length > 0 && (
                    <div>
                      <h6 className="text-xs font-semibold text-purple-300 mb-1">Magical Effects</h6>
                      <ul className="list-disc list-inside text-sm text-purple-100 ml-4">
                        {season.magicalEffects.map((effect, i) => (
                          <li key={i}>{effect}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {season.economicImpact && (
                    <div>
                      <h6 className="text-xs font-semibold text-green-300 mb-1">Economic Impact</h6>
                      <p className="text-sm text-green-100 ml-4">{season.economicImpact}</p>
                    </div>
                  )}
                  {season.specialEvents && season.specialEvents.length > 0 && (
                    <div>
                      <h6 className="text-xs font-semibold text-yellow-300 mb-1">Special Events</h6>
                      <ul className="list-disc list-inside text-sm text-yellow-100 ml-4">
                        {season.specialEvents.map((event, i) => (
                          <li key={i}>{event}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

interface MagicalItem {
  name: string
  type: string
  description: string
  rarity: string
  location?: string
  history?: string
  effects?: string[]
  id: string
  requirements?: string[]
  value?: string
  image?: string
  attunement?: boolean
  charges?: number
  source?: string
  weight?: string
  duration?: string
  range?: string
  activation?: string
  cooldown?: string
  uses?: string
  properties?: string[]
}

interface MagicalItemsSectionProps {
  magicalItems: MagicalItem[]
  borderColor?: {
    name: string
    borderPrimary: string
    borderSecondary: string
    bgEdge: string
    accent: string
    borderImage: string
  }
}

export function MagicalItemsSection({ magicalItems, borderColor: borderColorProp }: MagicalItemsSectionProps) {
  const defaultColor = useBorderColor()
  const borderColor = borderColorProp || defaultColor

  if (magicalItems.length === 0) return null

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <SparklesIcon className="w-6 h-6 text-purple-400" />
        <h4 className="text-2xl font-semibold">Magical Items</h4>
      </div>
      <div className={`bg-gray-800/40 rounded-xl border ${borderColor.borderSecondary} p-6`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {magicalItems.map((item, index) => {
            let rarityBorder = 'border-gray-400';
            let rarityText = 'text-gray-400';
            let rarityBg = 'bg-gray-700';
            let rarityBadge = 'Common';
            switch ((item.rarity || '').toLowerCase()) {
              case 'common':
                rarityBorder = 'border-gray-500';
                rarityText = 'text-gray-500';
                rarityBg = 'bg-gray-800';
                rarityBadge = 'Common';
                break;
              case 'uncommon':
                rarityBorder = 'border-green-400';
                rarityText = 'text-green-400';
                rarityBg = 'bg-green-900';
                rarityBadge = 'Uncommon';
                break;
              case 'rare':
                rarityBorder = 'border-blue-400';
                rarityText = 'text-blue-400';
                rarityBg = 'bg-blue-900';
                rarityBadge = 'Rare';
                break;
              case 'very rare':
                rarityBorder = 'border-purple-400';
                rarityText = 'text-purple-400';
                rarityBg = 'bg-purple-900';
                rarityBadge = 'Very Rare';
                break;
              case 'legendary':
                rarityBorder = 'border-yellow-400';
                rarityText = 'text-yellow-400';
                rarityBg = 'bg-yellow-900';
                rarityBadge = 'Legendary';
                break;
              case 'artifact':
                rarityBorder = 'border-pink-400';
                rarityText = 'text-pink-400';
                rarityBg = 'bg-pink-900';
                rarityBadge = 'Artifact';
                break;
              default:
                rarityBorder = 'border-gray-400';
                rarityText = 'text-gray-400';
                rarityBg = 'bg-gray-700';
                rarityBadge = 'Common';
            }
            return (
              <div key={index} className={`relative flex flex-col md:flex-row shadow-lg rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black ${rarityBorder}`}> 
                {/* Left accent bar */}
                <div className={`w-2 md:w-3 ${rarityBg} ${rarityBorder} rounded-l-xl md:rounded-l-xl md:rounded-tr-none md:rounded-br-none`} />
                {/* Main content */}
                <div className="flex-1 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <SparklesIcon className={`w-7 h-7 ${rarityText}`} />
                    <h5 className={`text-2xl font-extrabold leading-tight flex items-center gap-2 ${rarityText}`}>{item.name}</h5>
                    <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${rarityBg} ${rarityText} border ${rarityBorder}`}>{rarityBadge}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-400">{item.type}</span>
                    {item.attunement && (
                      <span className="text-xs text-pink-300 ml-2">Requires Attunement</span>
                    )}
                    {item.charges && (
                      <span className="text-xs text-blue-300 ml-2">{item.charges} Charges</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-200 mb-2 italic">{item.description}</p>
                  <div className="space-y-1">
                    {item.value && <span className="text-sm"><span className="text-gray-400 font-semibold">Value:</span> {item.value}</span>}
                    {item.source && <span className="text-sm"><span className="text-gray-400 font-semibold">Source:</span> {item.source}</span>}
                    {item.weight && <span className="text-sm"><span className="text-gray-400 font-semibold">Weight:</span> {item.weight}</span>}
                    {item.duration && <span className="text-sm"><span className="text-gray-400 font-semibold">Duration:</span> {item.duration}</span>}
                    {item.range && <span className="text-sm"><span className="text-gray-400 font-semibold">Range:</span> {item.range}</span>}
                    {item.activation && <span className="text-sm"><span className="text-gray-400 font-semibold">Activation:</span> {item.activation}</span>}
                    {item.requirements && <span className="text-sm"><span className="text-gray-400 font-semibold">Requirements:</span> {item.requirements}</span>}
                    {item.cooldown && <span className="text-sm"><span className="text-gray-400 font-semibold">Cooldown:</span> {item.cooldown}</span>}
                    {item.uses && <span className="text-sm"><span className="text-gray-400 font-semibold">Uses:</span> {item.uses}</span>}
                  </div>
                  {/* Additional properties */}
                  {item.effects && (
                    <div className="mt-2">
                      <h6 className="text-xs font-bold text-gray-300 mb-1">Effects</h6>
                      <ul className="list-disc list-inside text-sm text-gray-200 ml-4">
                        {Array.isArray(item.effects) ? item.effects.map((effect, i) => (
                          <li key={i}>{effect}</li>
                        )) : <li>{item.effects}</li>}
                      </ul>
                    </div>
                  )}
                  {item.properties && (
                    <div className="mt-2">
                      <h6 className="text-xs font-bold text-gray-300 mb-1">Properties</h6>
                      <ul className="list-disc list-inside text-sm text-gray-200 ml-4">
                        {Array.isArray(item.properties) ? item.properties.map((prop, i) => (
                          <li key={i}>{prop}</li>
                        )) : <li>{item.properties}</li>}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

interface DungeonsSectionProps {
  dungeons: CityDungeon[]
  cityName: string
  onDungeonSelect: (dungeon: CityDungeon) => void
  onAddDungeon: () => void
  borderColor?: {
    name: string
    borderPrimary: string
    borderSecondary: string
    bgEdge: string
    accent: string
    borderImage: string
  }
}

export function DungeonsSection({ dungeons, cityName, onDungeonSelect, onAddDungeon, borderColor: borderColorProp }: DungeonsSectionProps) {
  const defaultColor = useBorderColor()
  const borderColor = borderColorProp || defaultColor

  return (
    <div>
      <div className="flex items-center mb-4">
        <h3 className="text-2xl font-semibold">Dungeons in {cityName}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dungeons.map(dungeon => (
          <div
            key={dungeon.id}
            className={`bg-gray-900/60 rounded-xl border ${borderColor.borderSecondary} shadow-lg p-5 flex flex-col gap-2 cursor-pointer hover:bg-gray-800/80 transition-colors min-h-[320px]`}
            onClick={() => onDungeonSelect(dungeon)}
          >
            <div className="flex items-center mb-1">
              <h3 className="text-lg font-bold text-white flex-1">{dungeon.name}</h3>
            </div>
            <div className="flex flex-wrap gap-2 my-1">
              <span className="px-2 py-0.5 bg-blue-700/40 text-blue-200 text-xs rounded-md font-semibold">CR {dungeon.challengeRating}</span>
              <span className="px-2 py-0.5 bg-purple-700/40 text-purple-200 text-xs rounded-md font-semibold">Level {dungeon.level}</span>
              <span className="px-2 py-0.5 bg-pink-700/40 text-pink-200 text-xs rounded-md font-semibold">{dungeon.difficulty}</span>
            </div>
            <p className="text-sm text-gray-300 mb-1">{dungeon.description}</p>
            <div className="flex flex-wrap gap-2 my-1">
              <span className="bg-gray-700/60 text-gray-200 text-xs rounded-md px-2 py-0.5 font-semibold">Region: {dungeon.location.region}</span>
              <span className="bg-gray-700/60 text-gray-200 text-xs rounded-md px-2 py-0.5 font-semibold">Environment: {dungeon.location.environment}</span>
            </div>
            {Array.isArray(dungeon.hazards) && dungeon.hazards.length > 0 && (
              <div className="flex flex-wrap gap-1 my-1">
                {(Array.isArray(dungeon.hazards) ? dungeon.hazards : []).map((hazard, idx) => (
                  <span key={idx} className="inline-block bg-yellow-900/40 border border-${borderColor.borderSecondary} text-yellow-100 text-xs font-semibold rounded-md px-2 py-0.5">{hazard}</span>
                ))}
              </div>
            )}
            {Array.isArray(dungeon.inhabitants) && dungeon.inhabitants.length > 0 && (
              <div className="flex flex-wrap gap-1 my-1">
                <span className="text-xs text-gray-400">Inhabitants:</span>
                {(Array.isArray(dungeon.inhabitants) ? dungeon.inhabitants : []).map((inhabitant, idx) => (
                  <span key={idx} className="inline-block bg-gray-700/60 border border-${borderColor.borderSecondary} text-white text-xs font-semibold rounded-md px-2 py-0.5">{inhabitant}</span>
                ))}
              </div>
            )}
            {(dungeon.treasure.gold || (Array.isArray(dungeon.treasure.gems) && dungeon.treasure.gems.length) || (Array.isArray(dungeon.treasure.art) && dungeon.treasure.art.length) || (Array.isArray(dungeon.treasure.magicItems) && dungeon.treasure.magicItems.length)) && (
              <div className="flex flex-wrap gap-2 my-1">
                {dungeon.treasure.gold && <span className="bg-yellow-700/40 text-yellow-100 text-xs rounded-md px-2 py-0.5 font-semibold">Gold: {dungeon.treasure.gold}</span>}
                {Array.isArray(dungeon.treasure.gems) && dungeon.treasure.gems.length > 0 && <span className="bg-blue-700/40 text-blue-100 text-xs rounded-md px-2 py-0.5 font-semibold">Gems: {dungeon.treasure.gems.length}</span>}
                {Array.isArray(dungeon.treasure.art) && dungeon.treasure.art.length > 0 && <span className="bg-pink-700/40 text-pink-100 text-xs rounded-md px-2 py-0.5 font-semibold">Art: {dungeon.treasure.art.length}</span>}
                {Array.isArray(dungeon.treasure.magicItems) && dungeon.treasure.magicItems.length > 0 && <span className="bg-purple-700/40 text-purple-100 text-xs rounded-md px-2 py-0.5 font-semibold">Magic Items: {dungeon.treasure.magicItems.length}</span>}
              </div>
            )}
            {dungeon.history && (
              <p className="text-xs text-gray-400 mt-2 italic">{dungeon.history}</p>
            )}
          </div>
        ))}
        {/* Add Dungeon Card */}
        <div
          className={`bg-gray-900/60 rounded-xl border ${borderColor.borderSecondary} shadow-lg p-5 flex flex-col items-center justify-center min-h-[320px] cursor-pointer hover:bg-gray-800/80 transition-colors`}
          onClick={onAddDungeon}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-lg font-bold text-blue-300">Create Dungeon</span>
        </div>
      </div>
    </div>
  )
}

interface CitiesSectionProps {
  cities: City[];
  parentName: string;
  onCitySelect: (city: City) => void;
  onAddCity: () => void;
  borderColor: {
    borderSecondary: string;
  };
}

export function CitiesSection({ cities, parentName, onCitySelect, onAddCity, borderColor }: CitiesSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4 font-sans">
        <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0c-4.418 0-8 2.239-8 5v2a2 2 0 002 2h12a2 2 0 002-2v-2c0-2.761-3.582-5-8-5z" />
        </svg>
        <h3 className="text-2xl font-semibold">Cities in {parentName}</h3>
      </div>
      <div className="grid grid-cols-2 gap-6 w-full font-sans">
        {cities.length > 0 ? (
          [
            ...cities.map((city, idx) => {
              // Choose a different icon for each city
              const icons = [
                // BanknotesIcon
                <svg key="bank" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M17 9V7a5 5 0 00-10 0v2M5 9h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2zm7 4h.01" /></svg>,
                // MapPinIcon
                <svg key="map" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0c-4.418 0-8 2.239-8 5v2a2 2 0 002 2h12a2 2 0 002-2v-2c0-2.761-3.582-5-8-5z" /></svg>,
                // BuildingStorefrontIcon
                <svg key="store" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2M16 3.13a4 4 0 01-8 0M12 7v4m0 0v4m0-4h4m-4 0H8" /></svg>,
                // SparklesIcon
                <svg key="sparkle" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 15l7-7 7 7" /></svg>,
                // HomeIcon
                <svg key="home" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 9.75V19a2 2 0 002 2h3.5a.5.5 0 00.5-.5V16a2 2 0 012-2h2a2 2 0 012 2v4.5a.5.5 0 00.5.5H19a2 2 0 002-2V9.75a2 2 0 00-.59-1.42l-7-7a2 2 0 00-2.82 0l-7 7A2 2 0 003 9.75z" /></svg>,
              ];
              const icon = icons[idx % icons.length];
              return (
                <div
                  key={city.id}
                  className={`relative bg-gray-800/40 rounded-2xl border-2 ${borderColor.borderSecondary} shadow-2xl pt-4 pr-4 pl-4 pb-2 cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-yellow-400/30 hover:border-yellow-400 flex flex-col items-center gap-3 min-h-[220px] overflow-hidden`}
                  onClick={() => onCitySelect(city)}
                >
                  {/* City Image with glowing ring */}
                  {city.image && (
                    <div className="relative mb-1">
                      <span className="absolute inset-0 rounded-full ring-2 ring-yellow-400/60 blur-sm animate-pulse" />
                      <img src={city.image} alt={city.name} className="w-14 h-14 object-cover rounded-full border-2 border-yellow-300 shadow-xl relative z-10" />
                    </div>
                  )}
                  {/* City Name and Badge */}
                  <div className="flex items-end gap-2 w-full justify-center">
                    <h3 className="text-lg font-extrabold text-white text-center drop-shadow-lg font-sans tracking-wide">{city.name}</h3>
                  </div>
                  {/* Quick Stats (badges) on their own line */}
                  <div className="flex flex-col items-center gap-1 mt-1 w-full mb-1">
                    <div className="flex items-center gap-1 bg-blue-900/60 rounded-lg px-2 py-0.5 shadow-sm w-fit font-sans">
                      <svg className="w-4 h-4 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                      <span className="text-xs text-blue-100 font-bold font-sans">{city.basicInformation?.population || '—'}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-green-900/60 rounded-lg px-2 py-0.5 shadow-sm w-fit font-sans">
                      <svg className="w-4 h-4 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 7v9m0 0H7m5 0h5" /></svg>
                      <span className="text-xs text-green-100 font-bold font-sans">{city.economy?.primaryIndustry || '—'}</span>
                    </div>
                    {city.basicInformation?.primaryRaces && city.basicInformation.primaryRaces.length > 0 && (
                      <div className="flex items-center gap-1 bg-yellow-900/60 rounded-lg px-2 py-0.5 shadow-sm w-fit font-sans">
                        <svg className="w-4 h-4 text-yellow-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="text-xs text-yellow-50 font-bold font-sans">{city.basicInformation.primaryRaces.join(', ')}</span>
                      </div>
                    )}
                  </div>
                  {/* Description */}
                  <p className="text-xs text-yellow-100 text-center w-full font-sans drop-shadow line-clamp-4">{city.description}</p>
                </div>
              )
            }),
            // Add City Card
            <div
              key="add-city"
              className={`bg-gray-900/60 rounded-2xl border-2 ${borderColor.borderSecondary} shadow-lg p-5 flex flex-col items-center justify-center min-h-[220px] cursor-pointer hover:bg-gray-800/80 transition-colors`}
              onClick={onAddCity}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 mb-2 ${borderColor.borderSecondary.replace('border-', 'text-')}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className={`text-lg font-bold ${borderColor.borderSecondary.replace('border-', 'text-')}`}>Add City</span>
            </div>
          ]
        ) : (
          <span className="text-xs text-gray-400 col-span-2">No cities in this region yet.</span>
        )}
      </div>
    </div>
  );
}

interface EconomicPoliciesSectionProps {
  economicPolicies?: string[];
  marketRegulations?: string[];
  borderColor: {
    borderSecondary: string;
  };
}

export function EconomicPoliciesSection({ economicPolicies, marketRegulations, borderColor }: EconomicPoliciesSectionProps) {
  return (
    <>
      {/* Economic Policies Section */}
      {economicPolicies && economicPolicies.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 font-sans">
            <BanknotesIcon className="w-5 h-5 text-green-400" />
            <h4 className="text-xl font-semibold">Economic Policies</h4>
          </div>
          <div className={`bg-gray-800/40 rounded-lg p-4 border ${borderColor.borderSecondary} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-sans`}>
            {economicPolicies.map((policy, idx) => (
              <div key={idx} className="bg-green-900/40 border border-green-700/40 text-green-200 text-xs font-semibold rounded-md px-3 py-1 flex flex-col min-w-[160px] max-w-xs">
                <span className="font-bold text-green-100">{policy}</span>
                <span className="text-xs text-green-300 font-normal mt-1">This policy affects trade tariffs and local business incentives.</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Market Regulations Section */}
      {marketRegulations && marketRegulations.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 font-sans">
            <BanknotesIcon className="w-5 h-5 text-pink-400" />
            <h4 className="text-xl font-semibold">Market Regulations</h4>
          </div>
          <div className={`bg-gray-800/40 rounded-lg p-4 border ${borderColor.borderSecondary} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-sans`}>
            {marketRegulations.map((reg, idx) => (
              <div key={idx} className="bg-pink-900/40 border border-pink-700/40 text-pink-200 text-xs font-semibold rounded-md px-3 py-1 flex flex-col min-w-[160px] max-w-xs">
                <span className="font-bold text-pink-100">{reg}</span>
                <span className="text-xs text-pink-300 font-normal mt-1">This regulation controls market entry and product standards.</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

interface TradeGood {
  name: string;
  type: 'export' | 'import';
  value: string;
  tariff: string;
  description: string;
}

interface TradePartner {
  name: string;
  relationship: string;
  primaryGoods: string[];
  tradeAgreement: string;
}

interface TransportationRoute {
  name: string;
  type: string;
  description: string;
  security: string;
  frequency: string;
}

interface TradeEconomySectionProps {
  tradeGoods: TradeGood[];
  tradePartners: TradePartner[];
  transportationRoutes: TransportationRoute[];
  borderColor: {
    borderSecondary: string;
  };
}

export function TradeEconomySection({ tradeGoods, tradePartners, transportationRoutes, borderColor }: TradeEconomySectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 font-sans">
        <BanknotesIcon className="w-5 h-5" />
        <h4 className="text-xl font-semibold">Trade Economy</h4>
      </div>
      <div className={`bg-gray-800/40 rounded-lg p-4 border ${borderColor.borderSecondary} font-sans`}>
        <div className="space-y-4">
          {/* Combine all economy cards into a single grid */}
          {(() => {
            // Prepare all cards with a type property for sorting
            const goods = tradeGoods.map((good) => ({
              type: 'good',
              key: `good-${good.name}`,
              content: (
                <div key={`good-${good.name}`} className={`relative bg-white/10 backdrop-blur-md rounded-xl border-2 ${borderColor.borderSecondary} shadow-lg flex flex-col p-4 overflow-hidden`}>
                  <div className="absolute left-0 top-0 h-full w-1 bg-green-500/60 rounded-l-xl" />
                  <div className="pl-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-lg text-white">{good.name}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${good.type === 'export' ? 'bg-green-700/40 text-green-300' : 'bg-blue-700/40 text-blue-300'}`}>{(good.type || 'unknown').toUpperCase()}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-1">Value: <span className="font-semibold text-white">{good.value}</span></p>
                    <p className="text-sm text-gray-300 mb-1">Tariff: <span className="font-semibold text-white">{good.tariff}</span></p>
                    <p className="text-xs text-gray-400 italic">{good.description}</p>
                  </div>
                </div>
              )
            }));
            const partners = tradePartners.map((partner) => ({
              type: 'partner',
              key: `partner-${partner.name}`,
              content: (
                <div key={`partner-${partner.name}`} className={`relative bg-white/10 backdrop-blur-md rounded-xl border-2 ${borderColor.borderSecondary} shadow-lg flex flex-col p-4 overflow-hidden`}>
                  <div className="absolute left-0 top-0 h-full w-1 bg-blue-400/60 rounded-l-xl" />
                  <div className="pl-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-lg text-white">{partner.name}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-900/40 text-blue-200">PARTNER</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-1">Relationship: <span className="font-semibold text-white">{partner.relationship}</span></p>
                    <p className="text-sm text-gray-300 mb-1">Primary Goods: <span className="font-semibold text-white">{(partner.primaryGoods || []).join(', ')}</span></p>
                    <p className="text-xs text-gray-400 italic">{partner.tradeAgreement}</p>
                  </div>
                </div>
              )
            }));
            const routes = transportationRoutes.map((route) => ({
              type: 'route',
              key: `route-${route.name}`,
              content: (
                <div key={`route-${route.name}`} className={`relative bg-white/10 backdrop-blur-md rounded-xl border-2 ${borderColor.borderSecondary} shadow-lg flex flex-col p-4 overflow-hidden`}>
                  <div className="absolute left-0 top-0 h-full w-1 bg-yellow-400/60 rounded-l-xl" />
                  <div className="pl-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-lg text-white">{route.name}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-900/40 text-yellow-200">{(route.type || '').toLowerCase() === 'land' ? 'ROUTE' : (route.type || '').toUpperCase()}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-1">{route.description}</p>
                    <p className="text-xs text-gray-400 mb-1">Security: <span className="font-semibold text-white">{route.security}</span></p>
                    <p className="text-xs text-gray-400">Frequency: <span className="font-semibold text-white">{route.frequency}</span></p>
                  </div>
                </div>
              )
            }));
            // Order: goods, partners, routes
            const allCards = [...goods, ...partners, ...routes];
            return (
              <div className="grid grid-cols-2 gap-4">
                {allCards.map(card => (
                  <div key={card.key}>{card.content}</div>
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

interface BiographySectionProps {
  biography: string;
  borderColor: {
    borderSecondary: string;
  };
}

export function BiographySection({ biography, borderColor }: BiographySectionProps) {
  if (!biography) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-2 font-sans">
        <BookOpenIcon className="w-5 h-5 text-yellow-400" />
        <h4 className="text-xl font-semibold">Biography</h4>
      </div>
      <div className={`bg-gray-800/40 rounded-lg p-4 border ${borderColor.borderSecondary} font-sans`}>
        <p className="text-gray-200 text-base whitespace-pre-line">{biography}</p>
      </div>
    </div>
  );
}

interface SpotlightCarouselProps {
  images: string[];
  borderColor: {
    borderSecondary: string;
  };
}

export function SpotlightCarousel({ images, borderColor }: SpotlightCarouselProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const maxCarousel = images.length;
  const handlePrev = () => setCarouselIndex((prev) => (prev - 1 + maxCarousel) % maxCarousel);
  const handleNext = () => setCarouselIndex((prev) => (prev + 1) % maxCarousel);

  return (
    <div className={`bg-gray-800/70 rounded-xl border ${borderColor.borderSecondary} shadow p-6 mt-4`}>
      {maxCarousel > 0 ? (
        <div className="relative w-full flex flex-col items-center">
          <div className="relative w-full h-64 rounded-lg overflow-hidden flex items-center justify-center bg-gray-900">
            <img
              src={images[carouselIndex]}
              alt={`Spotlight ${carouselIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {maxCarousel > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800/70 hover:bg-gray-700/90 text-white rounded-full p-1 shadow"
                  onClick={handlePrev}
                  aria-label="Previous image"
                  type="button"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/70 hover:bg-gray-700/90 text-white rounded-full p-1 shadow"
                  onClick={handleNext}
                  aria-label="Next image"
                  type="button"
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
          {maxCarousel > 1 && (
            <div className="flex gap-2 mt-2">
              {images.slice(0, 3).map((_: unknown, idx: number) => (
                <button
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full ${carouselIndex === idx ? 'bg-blue-400' : 'bg-gray-500/40'} transition-colors`}
                  onClick={() => setCarouselIndex(idx)}
                  aria-label={`Go to image ${idx + 1}`}
                  type="button"
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-md h-48 rounded-lg bg-gray-900 flex items-center justify-center text-gray-500">
          <span>No spotlight images</span>
        </div>
      )}
    </div>
  );
}

interface EncountersSectionProps {
  encounters: DungeonEncounter[]
  borderColor: {
    borderSecondary: string
  }
  loading?: boolean
}

interface Treasure {
  gold?: number;
  gems?: Array<{
    type: string;
    value: number;
  }>;
  art?: Array<{
    type: string;
    value: number;
  }>;
  magicItems?: Array<{
    name: string;
    rarity: string;
  }>;
}

interface TreasureSectionProps {
  treasure: Treasure;
  borderColor: {
    borderSecondary: string;
  };
  className?: string;
}

export function TreasureSection({ treasure, borderColor, className = '' }: TreasureSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <CurrencyDollarIcon className="w-5 h-5" />
        <h4 className="text-xl font-semibold">Treasure</h4>
      </div>
      <div className={`bg-white/5 rounded-lg p-4 border ${borderColor.borderSecondary}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gold Section */}
          {treasure.gold && (
            <div className="bg-white/5 rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-3">
                <CurrencyDollarIcon className="w-5 h-5 text-yellow-400" />
                <h5 className="text-lg font-medium">Gold</h5>
              </div>
              <p className="text-2xl font-bold text-yellow-400">{treasure.gold} gp</p>
            </div>
          )}

          {/* Gems Section */}
          {treasure.gems && treasure.gems.length > 0 && (
            <div className="bg-white/5 rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-3">
                <SparklesIcon className="w-5 h-5 text-purple-400" />
                <h5 className="text-lg font-medium">Gems</h5>
              </div>
              <div className="space-y-2">
                {treasure.gems.map((gem, index) => (
                  <div key={index} className="flex justify-between items-center bg-white/5 rounded px-3 py-2">
                    <span className="font-medium">{gem.type}</span>
                    <span className="text-yellow-400">{gem.value} gp</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Art Section */}
          {treasure.art && treasure.art.length > 0 && (
            <div className="bg-white/5 rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-3">
                <PaintBrushIcon className="w-5 h-5 text-blue-400" />
                <h5 className="text-lg font-medium">Art</h5>
              </div>
              <div className="space-y-2">
                {treasure.art.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-white/5 rounded px-3 py-2">
                    <span className="font-medium">{item.type}</span>
                    <span className="text-yellow-400">{item.value} gp</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Magic Items Section */}
          {treasure.magicItems && treasure.magicItems.length > 0 && (
            <div className="bg-white/5 rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-3">
                <SparklesIcon className="w-5 h-5 text-blue-400" />
                <h5 className="text-lg font-medium">Magic Items</h5>
              </div>
              <div className="space-y-2">
                {treasure.magicItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-white/5 rounded px-3 py-2">
                    <span className="font-medium">{item.name}</span>
                    <span className={`px-2 py-0.5 rounded text-sm ${getRarityColor(item.rarity)}`}>
                      {item.rarity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper function to get color based on item rarity
function getRarityColor(rarity: string): string {
  switch (rarity.toLowerCase()) {
    case 'common':
      return 'bg-gray-500/20 text-gray-300'
    case 'uncommon':
      return 'bg-green-500/20 text-green-300'
    case 'rare':
      return 'bg-blue-500/20 text-blue-300'
    case 'very rare':
      return 'bg-purple-500/20 text-purple-300'
    case 'legendary':
      return 'bg-orange-500/20 text-orange-300'
    default:
      return 'bg-gray-500/20 text-gray-300'
  }
}

export function EncountersSection({ encounters, borderColor, loading = false }: EncountersSectionProps) {
  const [expandedEncounters, setExpandedEncounters] = useState<Set<string>>(new Set())

  const toggleEncounter = (encounterId: string) => {
    setExpandedEncounters(prev => {
      const newSet = new Set(prev)
      if (newSet.has(encounterId)) {
        newSet.delete(encounterId)
      } else {
        newSet.add(encounterId)
      }
      return newSet
    })
  }

  if (loading) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-2">
          <BoltIcon className="w-5 h-5" />
          <h4 className="text-xl font-semibold">Encounters</h4>
        </div>
        <div className={`bg-gray-800/40 rounded-lg p-4 border ${borderColor.borderSecondary}`}>
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-700/50 rounded"></div>
            <div className="h-12 bg-gray-700/50 rounded"></div>
            <div className="h-12 bg-gray-700/50 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!encounters || encounters.length === 0) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-2">
          <BoltIcon className="w-5 h-5" />
          <h4 className="text-xl font-semibold">Encounters</h4>
        </div>
        <div className={`bg-gray-800/40 rounded-lg p-4 border ${borderColor.borderSecondary}`}>
          <p className="text-gray-400 text-center">No encounters found for this area.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <BoltIcon className="w-5 h-5" />
        <h4 className="text-xl font-semibold">Encounters</h4>
      </div>
      <div className={`bg-gray-800/40 rounded-lg p-4 border ${borderColor.borderSecondary}`}>
        <div className="space-y-4">
          {encounters.map(encounter => {
            const isExpanded = expandedEncounters.has(encounter.id)

            return (
              <div key={encounter.id} className="bg-gray-900/40 rounded-lg p-4">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleEncounter(encounter.id)}
                >
                  <div className="flex-1">
                    <h5 className="text-lg font-semibold">{encounter.name}</h5>
                    <p className="text-sm text-gray-400">{encounter.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        encounter.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                        encounter.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        encounter.difficulty === 'Hard' ? 'bg-orange-500/20 text-orange-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {encounter.difficulty}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        encounter.type === 'Combat' ? 'bg-red-500/20 text-red-300' :
                        encounter.type === 'Trap' ? 'bg-yellow-500/20 text-yellow-300' :
                        encounter.type === 'Puzzle' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-purple-500/20 text-purple-300'
                      }`}>
                        {encounter.type}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUpIcon className="w-5 h-5" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 space-y-4">
                    {/* Enemies */}
                    {encounter.enemies && encounter.enemies.length > 0 && (
                      <div>
                        <h6 className="text-sm font-semibold mb-2">Enemies</h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {encounter.enemies.map((enemy, index) => (
                            <div key={index} className="bg-gray-800/40 rounded p-2">
                              <div className="flex items-center justify-between">
                                <span>{enemy.name}</span>
                                <span className="text-sm text-gray-400">×{enemy.count}</span>
                              </div>
                              {enemy.type && (
                                <div className="text-sm text-gray-400">{enemy.type}</div>
                              )}
                              {enemy.cr && (
                                <div className="text-sm text-gray-400">CR {enemy.cr}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Rewards */}
                    {encounter.rewards && encounter.rewards.length > 0 && (
                      <div>
                        <h6 className="text-sm font-semibold mb-2">Rewards</h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {encounter.rewards.map((reward, index) => (
                            <div key={index} className="bg-gray-800/40 rounded p-2">
                              <div className="flex items-center justify-between">
                                <span>{reward.type}</span>
                                {reward.value && (
                                  <span className="text-sm text-gray-400">{reward.value}</span>
                                )}
                              </div>
                              <div className="text-sm text-gray-400">{reward.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Conditions */}
                    {encounter.conditions && encounter.conditions.length > 0 && (
                      <div>
                        <h6 className="text-sm font-semibold mb-2">Conditions</h6>
                        <div className="flex flex-wrap gap-2">
                          {encounter.conditions.map((condition, index) => (
                            <span 
                              key={index}
                              className="bg-gray-800/40 px-2 py-1 rounded text-sm"
                            >
                              {condition}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {encounter.notes && encounter.notes.length > 0 && (
                      <div>
                        <h6 className="text-sm font-semibold mb-2">Notes</h6>
                        <ul className="list-disc list-inside space-y-1">
                          {encounter.notes.map((note, index) => (
                            <li key={index} className="text-sm text-gray-400">{note}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* XP */}
                    {encounter.xp && (
                      <div>
                        <h6 className="text-sm font-semibold mb-2">Experience Points</h6>
                        <span className="text-yellow-400">{encounter.xp} XP</span>
                      </div>
                    )}

                    {/* Treasure */}
                    {encounter.treasure && (
                      <div>
                        <h6 className="text-sm font-semibold mb-2">Treasure</h6>
                        <div className="bg-gray-800/40 rounded p-2">
                          {encounter.treasure.gold && (
                            <div className="flex items-center gap-2">
                              <CurrencyDollarIcon className="w-4 h-4 text-yellow-400" />
                              <span>{encounter.treasure.gold} gold</span>
                            </div>
                          )}
                          {encounter.treasure.items && encounter.treasure.items.length > 0 && (
                            <div className="mt-2">
                              <h6 className="text-sm font-semibold mb-1">Items</h6>
                              <ul className="list-disc list-inside space-y-1">
                                {encounter.treasure.items.map((item, index) => (
                                  <li key={index} className="text-sm text-gray-400">{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

interface HeaderSectionProps {
  title: string
  type: 'Dungeon' | 'City' | 'Region' | 'Location'
  onBack: () => void
  onClose: () => void
  containerRef?: React.RefObject<HTMLDivElement>
}

export function HeaderSection({ title, type, onBack, onClose, containerRef }: HeaderSectionProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Dungeon':
        return 'bg-red-500/80'
      case 'City':
        return 'bg-blue-500/80'
      case 'Region':
        return 'bg-green-500/80'
      case 'Location':
        return 'bg-purple-500/80'
      default:
        return 'bg-gray-500/80'
    }
  }

  return (
    <div className="sticky top-0 z-30 bg-gray-900/95 shadow-lg rounded-t-xl px-8 py-5 flex items-center gap-4 -mt-8" style={{ minHeight: '72px' }}>
      <button
        onClick={() => {
          onBack();
          // Reset scroll position immediately without animation
          containerRef?.current?.scrollTo({ top: 0, behavior: 'auto' });
          window.scrollTo({ top: 0, behavior: 'auto' });
        }}
        className="p-1 hover:bg-gray-700/50 rounded-lg transition-colors"
        aria-label="Back"
      >
        <ArrowLeftIcon className="w-6 h-6" />
      </button>
      <h2 className="text-4xl font-bold text-white">{title}</h2>
      <span className={`px-2 py-0.5 ${getTypeColor(type)} rounded text-sm font-medium`}>{type}</span>
      <button
        onClick={onClose}
        className="ml-auto p-1 hover:bg-gray-700/50 rounded-lg transition-colors"
        aria-label="Close"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>
    </div>
  )
}

interface EncounterTreasureSectionProps {
  treasure: Treasure;
  borderColor: {
    borderSecondary: string;
  };
  className?: string;
}

export function EncounterTreasureSection({ treasure, borderColor, className = '' }: EncounterTreasureSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="bg-gray-800/40 rounded-lg p-3">
        <h6 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
          <CurrencyDollarIcon className="w-4 h-4" />
          Treasure
        </h6>
        <div className="space-y-3">
          {/* Gold Section */}
          {treasure.gold && (
            <div className="bg-gray-900/60 rounded p-2 border border-gray-700/40">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-200">Gold</span>
                <span className="text-sm font-bold text-yellow-400">{treasure.gold} gp</span>
              </div>
            </div>
          )}

          {/* Gems Section */}
          {treasure.gems && treasure.gems.length > 0 && (
            <div className="bg-gray-900/60 rounded p-2 border border-gray-700/40">
              <span className="text-sm font-medium text-gray-200 mb-1 block">Gems</span>
              <div className="space-y-1">
                {treasure.gems.map((gem, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">{gem.type}</span>
                    <span className="text-yellow-400">{gem.value} gp</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Art Section */}
          {treasure.art && treasure.art.length > 0 && (
            <div className="bg-gray-900/60 rounded p-2 border border-gray-700/40">
              <span className="text-sm font-medium text-gray-200 mb-1 block">Art</span>
              <div className="space-y-1">
                {treasure.art.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">{item.type}</span>
                    <span className="text-yellow-400">{item.value} gp</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Magic Items Section */}
          {treasure.magicItems && treasure.magicItems.length > 0 && (
            <div className="bg-gray-900/60 rounded p-2 border border-gray-700/40">
              <span className="text-sm font-medium text-gray-200 mb-1 block">Magic Items</span>
              <div className="space-y-1">
                {treasure.magicItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">{item.name}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${getRarityColor(item.rarity)}`}>
                      {item.rarity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Shared components for location views (City, Region, Dungeon, etc.)
// will be populated with reusable UI components 