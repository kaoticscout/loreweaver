import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation, Routes, Route, Navigate } from 'react-router-dom'
import { InformationCircleIcon, MapIcon, UserGroupIcon, BanknotesIcon, BuildingLibraryIcon, SparklesIcon, BookOpenIcon, UserIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { City, TransportationRoute, SeasonalEffect, MagicalItem, Dungeon, PointOfInterest, RestArea, Shop, InventoryItem } from './types/city'
import { Region } from './types/world'
import { DungeonView } from './components/DungeonView'
import { dungeonBanners } from '../public/art/banners'
import { WorldSelectionPage } from './pages/WorldSelectionPage'
import { WorldPreviewPage } from './pages/WorldPreviewPage'
import { WorldView } from './components/WorldView'
import { RegionView } from './components/RegionView'
import { CityView } from './components/CityView'
import { RegionSeasonalEffect } from './types/region'
import { useWorldManagement } from './hooks/useWorldManagement'
import WorldRouter from './components/WorldRouter'
import ItemViewer from './components/ItemViewer'
import { Header } from './components/Header'
import QuestsPage from './pages/QuestsPage'
import NPCsPage from './pages/NPCsPage'
import { ProfilePage } from './pages/ProfilePage'
import { SettingsPage } from './pages/SettingsPage'
import { PremiumPage } from './components/PremiumPage'
import { WorldProvider, useWorld } from './contexts/WorldContext'
import EnemiesPage from './pages/EnemiesPage'
import CyberpunkEnemiesPage from './pages/CyberpunkEnemiesPage'
import { NameGeneratorPage } from './pages/utilities/NameGeneratorPage'
import { EncounterBuilderPage } from './pages/utilities/EncounterBuilderPage'
import { DiceRollerPage } from './pages/utilities/DiceRollerPage'
import { LootGeneratorPage } from './pages/utilities/LootGeneratorPage'
import { WeatherGeneratorPage } from './pages/utilities/WeatherGeneratorPage'
import { TavernGeneratorPage } from './pages/utilities/TavernGeneratorPage'
import { DungeonGeneratorPage } from './pages/utilities/DungeonGeneratorPage'
import { PlotHookGeneratorPage } from './pages/utilities/PlotHookGeneratorPage'
import { TimelineGeneratorPage } from './pages/utilities/TimelineGeneratorPage'
import { FactionGeneratorPage } from './pages/utilities/FactionGeneratorPage'
import { MapGeneratorPage } from './pages/utilities/MapGeneratorPage'
import { CalendarGeneratorPage } from './pages/utilities/CalendarGeneratorPage'
import { CurrencyGeneratorPage } from './pages/utilities/CurrencyGeneratorPage'
import { ReligionGeneratorPage } from './pages/utilities/ReligionGeneratorPage'
import { LanguageGeneratorPage } from './pages/utilities/LanguageGeneratorPage'
import { MagicSystemGeneratorPage } from './pages/utilities/MagicSystemGeneratorPage'
import { PantheonGeneratorPage } from './pages/utilities/PantheonGeneratorPage'
import { ProphecyGeneratorPage } from './pages/utilities/ProphecyGeneratorPage'
import { TreasureHoardGeneratorPage } from './pages/utilities/TreasureHoardGeneratorPage'
import { BattleMapGeneratorPage } from './pages/utilities/BattleMapGeneratorPage'
import { MerchantGeneratorPage } from './pages/utilities/MerchantGeneratorPage'
import { CampaignPage } from './pages/CampaignPage'
import { RegionsAPI } from './api/regions'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'

interface Deity {
  name: string
  domain: string
  alignment: string
}

interface PartyInteraction {
  figureId: string
  status: 'met' | 'interacted' | 'quest' | 'none'
  notes: string
}

interface HistoricalFigure {
  id: string
  name: string
  title: string
  era: string
  significance: string
  image: string
  avatarStyle: string
}

interface TradeGood {
  name: string
  type: 'export' | 'import'
  value: string
  tariff: string
  description: string
}

interface TradePartner {
  name: string
  relationship: string
  primaryGoods: string[]
  tradeAgreement: string
}

interface Economy {
  primaryIndustry: string
  gdp: string
  currency: string
  tradeGoods: TradeGood[]
  tradePartners: TradePartner[]
  transportationRoutes: TransportationRoute[]
  economicPolicies: string[]
  marketRegulations: string[]
}

// Add rarity color mapping
const rarityColors: { [key: string]: string } = {
  'Common': 'bg-gray-500',
  'Uncommon': 'bg-green-500',
  'Rare': 'bg-blue-500',
  'Very Rare': 'bg-purple-500',
  'Legendary': 'bg-yellow-500'
}

function App() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const { selectedWorld } = useWorld();

  // Load regions when world changes
  useEffect(() => {
    if (selectedWorld) {
      RegionsAPI.getRegionsByWorldId(selectedWorld.id)
        .then((regions: Region[]) => {
          setRegions(regions || []);
        })
        .catch((error: Error) => {
          console.error(`Failed to load regions for world ${selectedWorld.id}:`, error);
          setRegions([]);
        });
    }
  }, [selectedWorld]);

  const {
    isAddingRegion,
    isAddingCity,
    newRegionData,
    newCityData,
    handleAddRegion,
    handleAddCity,
    handleSaveRegion,
    handleSaveCity,
    setIsAddingRegion,
    setIsAddingCity
  } = useWorldManagement();

  return (
    <AuthProvider>
      <WorldProvider>
        <div className="min-h-screen bg-[#1B0A20] text-white">
          <Header />
          <main className="pt-16">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <div>Dashboard (Protected)</div>
                  </ProtectedRoute>
                }
              />
              
              {/* Admin routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole={['admin']}>
                    <div>Admin Dashboard</div>
                  </ProtectedRoute>
                }
              />
              
              {/* World routes */}
              <Route path="/" element={<WorldSelectionPage />} />
              <Route path="/world" element={
                <ProtectedRoute>
                  <WorldRouter
                    regions={regions}
                    onAddRegion={handleAddRegion}
                    onAddCity={handleAddCity}
                    lastAddedId={lastAddedId}
                  />
                </ProtectedRoute>
              } />
              <Route path="/world/:regionId" element={
                <ProtectedRoute>
                  <WorldRouter
                    regions={regions}
                    onAddRegion={handleAddRegion}
                    onAddCity={handleAddCity}
                    lastAddedId={lastAddedId}
                  />
                </ProtectedRoute>
              } />
              <Route path="/world/:regionId/city/:cityId" element={
                <ProtectedRoute>
                  <WorldRouter
                    regions={regions}
                    onAddRegion={handleAddRegion}
                    onAddCity={handleAddCity}
                    lastAddedId={lastAddedId}
                  />
                </ProtectedRoute>
              } />
              <Route path="/world/:regionId/location/:locationId" element={
                <ProtectedRoute>
                  <WorldRouter
                    regions={regions}
                    onAddRegion={handleAddRegion}
                    onAddCity={handleAddCity}
                    lastAddedId={lastAddedId}
                  />
                </ProtectedRoute>
              } />
              <Route path="/world/:regionId/city/:cityId/dungeon/:dungeonId" element={
                <ProtectedRoute>
                  <WorldRouter
                    regions={regions}
                    onAddRegion={handleAddRegion}
                    onAddCity={handleAddCity}
                    lastAddedId={lastAddedId}
                  />
                </ProtectedRoute>
              } />
              
              {/* Utility Routes */}
              <Route path="/utilities/name-generator" element={<NameGeneratorPage />} />
              <Route path="/utilities/encounter-builder" element={<EncounterBuilderPage />} />
              <Route path="/utilities/dice-roller" element={<DiceRollerPage />} />
              <Route path="/utilities/loot-generator" element={<LootGeneratorPage />} />
              <Route path="/utilities/weather-generator" element={<WeatherGeneratorPage />} />
              <Route path="/utilities/tavern-generator" element={<TavernGeneratorPage />} />
              <Route path="/utilities/dungeon-generator" element={<DungeonGeneratorPage />} />
              <Route path="/utilities/plot-hooks" element={<PlotHookGeneratorPage />} />
              <Route path="/utilities/timeline" element={<TimelineGeneratorPage />} />
              <Route path="/utilities/faction-generator" element={<FactionGeneratorPage />} />
              <Route path="/utilities/map-generator" element={<MapGeneratorPage />} />
              <Route path="/utilities/calendar-generator" element={<CalendarGeneratorPage />} />
              <Route path="/utilities/currency-generator" element={<CurrencyGeneratorPage />} />
              <Route path="/utilities/religion-generator" element={<ReligionGeneratorPage />} />
              <Route path="/utilities/language-generator" element={<LanguageGeneratorPage />} />
              <Route path="/utilities/magic-system-generator" element={<MagicSystemGeneratorPage />} />
              <Route path="/utilities/pantheon-generator" element={<PantheonGeneratorPage />} />
              <Route path="/utilities/prophecy-generator" element={<ProphecyGeneratorPage />} />
              <Route path="/utilities/treasure-hoard-generator" element={<TreasureHoardGeneratorPage />} />
              <Route path="/utilities/battle-map-generator" element={<BattleMapGeneratorPage />} />
              <Route path="/utilities/merchant-generator" element={<MerchantGeneratorPage />} />

              {/* Other Routes */}
              <Route path="/items" element={
                <ProtectedRoute>
                  <ItemViewer />
                </ProtectedRoute>
              } />
              <Route path="/quests" element={
                <ProtectedRoute>
                  <QuestsPage />
                </ProtectedRoute>
              } />
              <Route path="/npcs" element={
                <ProtectedRoute>
                  <NPCsPage />
                </ProtectedRoute>
              } />
              <Route path="/enemies" element={
                <ProtectedRoute>
                  {selectedWorld?.id === 'cyberpunk2077' ? <CyberpunkEnemiesPage /> : <EnemiesPage />}
                </ProtectedRoute>
              } />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/premium" element={<PremiumPage />} />
              <Route path="/campaign" element={
                <ProtectedRoute>
                  <CampaignPage />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </WorldProvider>
    </AuthProvider>
  );
}

export default App;

function AppContent() {
  const navigate = useNavigate()
  const { regionId, cityId, dungeonId } = useParams()
  const location = useLocation()
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<City | null>(null)
  const [selectedDungeon, setSelectedDungeon] = useState<Dungeon | null>(null)
  const [partyInteractions, setPartyInteractions] = useState<PartyInteraction[]>([])
  const [editingInteraction, setEditingInteraction] = useState<PartyInteraction | null>(null)
  const [acquiredItems, setAcquiredItems] = useState<string[]>([])
  const [isAddingDungeon, setIsAddingDungeon] = useState(false)
  const [isAddingPointOfInterest, setIsAddingPointOfInterest] = useState(false)
  const [isAddingRestArea, setIsAddingRestArea] = useState(false)
  const [newDungeonData, setNewDungeonData] = useState<Partial<Dungeon>>({})
  const [newPointOfInterestData, setNewPointOfInterestData] = useState<Partial<PointOfInterest>>({})
  const [newRestAreaData, setNewRestAreaData] = useState<Partial<RestArea>>({})

  const {
    isAddingRegion,
    isAddingCity,
    newRegionData,
    newCityData,
    handleAddRegion,
    handleAddCity,
    handleSaveRegion,
    handleSaveCity,
    setIsAddingRegion,
    setIsAddingCity
  } = useWorldManagement()
  const { selectedWorld } = useWorld();
  const [regions, setRegions] = useState<Region[]>([]);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  // Handle URL parameters
  useEffect(() => {
    const loadDataFromParams = async () => {
      if (regionId) {
        const region = regions.find((r: Region) => r.id === regionId);
        if (region) {
          setSelectedRegion(region);
          if (cityId) {
            const city = region.cities.find((c: City) => c.id === cityId);
            if (city) {
              setSelectedLocation(city);
              if (dungeonId) {
                const dungeon = city.dungeons?.find((d: Dungeon) => d.id === dungeonId);
                setSelectedDungeon(dungeon || null);
              } else {
                setSelectedDungeon(null);
              }
            } else {
              setSelectedDungeon(null);
            }
          } else {
            setSelectedLocation(null);
            setSelectedDungeon(null);
          }
        } else {
          // If region not found, navigate to world view
          navigate('/world');
        }
      } else {
        setSelectedRegion(null);
        setSelectedLocation(null);
        setSelectedDungeon(null);
      }
    };

    loadDataFromParams();
  }, [regionId, cityId, dungeonId, regions, navigate]);

  // Handle navigation
  const handleRegionSelect = (region: Region | null) => {
    if (region) {
      navigate(`/world/${region.id}`);
    } else {
      navigate('/world');
    }
  };

  // Load regions when world changes
  useEffect(() => {
    if (selectedWorld) {
      RegionsAPI.getRegionsByWorldId(selectedWorld.id)
        .then((regions: Region[]) => {
          setRegions(regions || []);
        })
        .catch((error: Error) => {
          console.error(`Failed to load regions for world ${selectedWorld.id}:`, error);
          setRegions([]);
        });
    }
  }, [selectedWorld]);

  const handleLocationSelect = (city: City | null) => {
    if (city) {
      // Find the region that contains this city
      const parentRegion = regions.find(region =>
        region.cities.some(c => c.id === city.id)
      );
      if (parentRegion) {
        navigate(`/world/${parentRegion.id}/city/${city.id}`);
      } else if (selectedRegion && selectedRegion.id) {
        navigate(`/world/${selectedRegion.id}/city/${city.id}`);
      }
    } else {
      // Optionally navigate to a higher-level view
    }
  };

  const handleDungeonSelect = (dungeonId: string) => {
    if (selectedLocation) {
      navigate(`/world/${selectedRegion?.id}/city/${selectedLocation.id}/dungeon/${dungeonId}`);
      setRegions([]);
    }
  };

  const handleBack = () => {
    if (selectedDungeon) {
      setSelectedDungeon(null);
      // Always set selectedLocation to the city associated with the dungeon
      let cityToSelect = selectedLocation;
      if ((!cityToSelect || !cityToSelect.id) && selectedRegion && cityId) {
        cityToSelect = selectedRegion.cities.find(c => c.id === cityId) || null;
      }
      if (cityToSelect) setSelectedLocation(cityToSelect);
      navigate(`/world/${selectedRegion?.id}/city/${cityToSelect?.id || cityId}`);
    } else if (selectedLocation) {
      setSelectedLocation(null);
      navigate(`/world/${selectedRegion?.id}`);
    } else if (selectedRegion) {
      setSelectedRegion(null);
      navigate('/world');
    }
  }

  const handleHome = () => {
    setSelectedRegion(null);
    setSelectedLocation(null);
    setSelectedDungeon(null);
    navigate('/world');
  }

  // Utility functions for rendering
  const renderCharacterCard = (figure: HistoricalFigure) => (
    <div key={figure.id} className="bg-white/5 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-2xl">
          {figure.avatarStyle}
        </div>
        <div>
          <h4 className="font-semibold">{figure.name}</h4>
          <p className="text-sm text-gray-400">{figure.title}</p>
        </div>
      </div>
      <p className="text-sm mb-2">{figure.significance}</p>
      <p className="text-xs text-gray-400">Era: {figure.era}</p>
    </div>
  )

  const renderSeasonalInfo = (entity: Region | City) => (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-2">
        <h4 className="text-xl font-semibold">Seasonal Effects</h4>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {entity.seasons?.map((season: SeasonalEffect | RegionSeasonalEffect, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4">
            <h5 className="font-semibold mb-2">
              {'name' in season ? season.name : season.season}
            </h5>
            <p className="text-sm mb-2">{season.description}</p>
            <div className="space-y-2">
              <div>
                <h6 className="text-sm font-medium">Activities</h6>
                <ul className="list-disc list-inside text-sm">
                  {('activities' in season ? season.activities : []).map((activity: string, i) => (
                    <li key={i}>{activity}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h6 className="text-sm font-medium">Hazards</h6>
                <ul className="list-disc list-inside text-sm">
                  {('hazards' in season ? season.hazards : []).map((hazard: string, i) => (
                    <li key={i}>{hazard}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderMagicalItems = (entity: Region | City) => (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-2">
        <h4 className="text-xl font-semibold">Magical Items</h4>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {entity.magicalItems?.map((item: any, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4">
            <h5 className="font-semibold mb-2">{item.name}</h5>
            <p className="text-sm mb-2">{item.description}</p>
            <div className="space-y-1">
              <p className="text-sm"><span className="text-gray-400">Type:</span> {item.type}</p>
              <p className="text-sm"><span className="text-gray-400">Rarity:</span> {item.rarity}</p>
              {'value' in item && <p className="text-sm"><span className="text-gray-400">Value:</span> {item.value}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const handleInteractionUpdate = (figureId: string, status: PartyInteraction['status']) => {
    setPartyInteractions(prev => {
      const existing = prev.find((i: PartyInteraction) => i.figureId === figureId)
      if (existing) {
        return prev.map((i: PartyInteraction) => i.figureId === figureId ? { ...i, status } : i)
      }
      return [...prev, { figureId, status, notes: '' }]
    })
  }

  const getInteractionStatus = (figureId: string): PartyInteraction['status'] => {
    return partyInteractions.find((i: PartyInteraction) => i.figureId === figureId)?.status || 'none'
  }

  const getInteractionNotes = (figureId: string): string => {
    return partyInteractions.find((i: PartyInteraction) => i.figureId === figureId)?.notes || ''
  }

  const handleItemAcquisition = (itemId: string) => {
    setAcquiredItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter((id: string) => id !== itemId)
      }
      return [...prev, itemId]
    })
  }

  const handleAddDungeon = (cityId: string) => {
    setIsAddingDungeon(true)
    setNewDungeonData({
      id: `dungeon-${Date.now()}`,
      name: '',
      description: '',
      level: '',
      difficulty: '',
      inhabitants: [],
      treasures: [],
      hazards: [],
      history: ''
    })
  }

  const handleAddPointOfInterest = (cityId: string) => {
    setIsAddingPointOfInterest(true)
    setNewPointOfInterestData({
      id: `poi-${Date.now()}`,
      name: '',
      type: '',
      description: '',
      significance: '',
      notableFeatures: [],
      associatedFigures: []
    })
  }

  const handleAddRestArea = (cityId: string) => {
    setIsAddingRestArea(true)
    setNewRestAreaData({
      id: `rest-${Date.now()}`,
      name: '',
      type: '',
      description: '',
      quality: '',
      price: '',
      amenities: []
    })
  }

  const handleSaveDungeon = (cityId: string) => {
    if (newDungeonData.name && selectedLocation) {
      const newDungeon: Dungeon = {
        ...newDungeonData as Dungeon,
        id: `dungeon-${Date.now()}`,
        name: newDungeonData.name,
        description: newDungeonData.description || '',
        level: newDungeonData.level || '',
        difficulty: newDungeonData.difficulty || '',
        inhabitants: newDungeonData.inhabitants || [],
        treasures: newDungeonData.treasures || [],
        hazards: newDungeonData.hazards || [],
        history: newDungeonData.history || ''
      }

      // Update the city in the regions state
      setRegions(prev => prev.map((region: Region) => ({
        ...region,
        cities: region.cities.map((city: City) => {
          if (city.id === cityId) {
            return {
              ...city,
              dungeons: [...(city.dungeons || []), newDungeon]
            }
          }
          return city
        })
      })))

      // Update selectedLocation if it's the current city
      if (selectedLocation.id === cityId) {
        setSelectedLocation(prev => ({
          ...prev!,
          dungeons: [...(prev?.dungeons || []), newDungeon]
        }))
      }

      setIsAddingDungeon(false)
      setNewDungeonData({})
      setLastAddedId(newDungeon.id)
    }
  }

  const handleSavePointOfInterest = (cityId: string) => {
    if (newPointOfInterestData.name && selectedLocation) {
      const newPOI: PointOfInterest = {
        ...newPointOfInterestData as PointOfInterest,
        id: `poi-${Date.now()}`,
        name: newPointOfInterestData.name,
        type: newPointOfInterestData.type || '',
        description: newPointOfInterestData.description || '',
        significance: newPointOfInterestData.significance || '',
        notableFeatures: newPointOfInterestData.notableFeatures || [],
        associatedFigures: newPointOfInterestData.associatedFigures || []
      }

      // Update the city in the regions state
      setRegions(prev => prev.map((region: Region) => ({
        ...region,
        cities: region.cities.map((city: City) => {
          if (city.id === cityId) {
            return {
              ...city,
              pointsOfInterest: [...(city.pointsOfInterest || []), newPOI]
            }
          }
          return city
        })
      })))

      // Update selectedLocation if it's the current city
      if (selectedLocation && selectedLocation.id === cityId) {
        setSelectedLocation(prev => ({
          ...prev!,
          pointsOfInterest: [...(prev?.pointsOfInterest || []), newPOI]
        }))
      }

      setIsAddingPointOfInterest(false)
      setNewPointOfInterestData({})
      setLastAddedId(newPOI.id)
    }
  }

  const handleSaveRestArea = (cityId: string) => {
    if (newRestAreaData.name && selectedLocation) {
      const newRestArea: RestArea = {
        ...newRestAreaData as RestArea,
        id: `rest-${Date.now()}`,
        name: newRestAreaData.name,
        type: newRestAreaData.type || '',
        description: newRestAreaData.description || '',
        quality: newRestAreaData.quality || '',
        price: newRestAreaData.price || '',
        amenities: newRestAreaData.amenities || []
      }

      // Update the city in the regions state
      setRegions(prev => prev.map((region: Region) => ({
        ...region,
        cities: region.cities.map((city: City) => {
          if (city.id === cityId) {
            return {
              ...city,
              restAreas: [...(city.restAreas || []), newRestArea]
            }
          }
          return city
        })
      })))

      // Update selectedLocation if it's the current city
      if (selectedLocation.id === cityId) {
        setSelectedLocation(prev => ({
          ...prev!,
          restAreas: [...(prev?.restAreas || []), newRestArea]
        }))
      }

      setIsAddingRestArea(false)
      setNewRestAreaData({})
      setLastAddedId(newRestArea.id)
    }
  }

  // Update the styles to be more visible
  const styles = `
    @keyframes highlight {
      0% {
        background-color: rgba(59, 130, 246, 0.5);
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
      }
      30% {
        background-color: rgba(59, 130, 246, 0.3);
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
      }
      100% {
        background-color: transparent;
        box-shadow: none;
      }
    }
    .animate-highlight {
      animation: highlight 1s ease-out;
    }
  `

  return (
    <div className="min-h-screen bg-[#1B0A20] text-white">
      <Header />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<WorldSelectionPage />} />
          <Route path="/world/:worldId/preview" element={<WorldPreviewPage />} />
          
          
          {/* Protected Routes */}
          <Route path="/campaign" element={
            <ProtectedRoute>
              <CampaignPage />
            </ProtectedRoute>
          } />
          <Route path="/world" element={
            <ProtectedRoute>
              <WorldRouter
                regions={regions}
                onAddRegion={handleAddRegion}
                onAddCity={handleAddCity}
                lastAddedId={lastAddedId}
              />
            </ProtectedRoute>
          } />
          <Route path="/world/:regionId" element={
            <ProtectedRoute>
              <WorldRouter
                regions={regions}
                onAddRegion={handleAddRegion}
                onAddCity={handleAddCity}
                lastAddedId={lastAddedId}
              />
            </ProtectedRoute>
          } />
          <Route path="/world/:regionId/city/:cityId" element={
            <ProtectedRoute>
              <WorldRouter
                regions={regions}
                onAddRegion={handleAddRegion}
                onAddCity={handleAddCity}
                lastAddedId={lastAddedId}
              />
            </ProtectedRoute>
          } />
          <Route path="/world/:regionId/location/:locationId" element={
            <ProtectedRoute>
              <WorldRouter
                regions={regions}
                onAddRegion={handleAddRegion}
                onAddCity={handleAddCity}
                lastAddedId={lastAddedId}
              />
            </ProtectedRoute>
          } />
          <Route path="/world/:regionId/city/:cityId/dungeon/:dungeonId" element={
            <ProtectedRoute>
              <WorldRouter
                regions={regions}
                onAddRegion={handleAddRegion}
                onAddCity={handleAddCity}
                lastAddedId={lastAddedId}
              />
            </ProtectedRoute>
          } />
          <Route path="/items" element={
            <ProtectedRoute>
              <ItemViewer />
            </ProtectedRoute>
          } />
          <Route path="/quests" element={
            <ProtectedRoute>
              <QuestsPage />
            </ProtectedRoute>
          } />
          <Route path="/npcs" element={
            <ProtectedRoute>
              <NPCsPage />
            </ProtectedRoute>
          } />
          <Route path="/enemies" element={
            <ProtectedRoute>
              {selectedWorld?.id === 'cyberpunk2077' ? <CyberpunkEnemiesPage /> : <EnemiesPage />}
            </ProtectedRoute>
          } />
          
          {/* Utility Routes */}
          <Route path="/utilities/name-generator" element={<NameGeneratorPage />} />
          <Route path="/utilities/encounter-builder" element={<EncounterBuilderPage />} />
          <Route path="/utilities/dice-roller" element={<DiceRollerPage />} />
          <Route path="/utilities/loot-generator" element={<LootGeneratorPage />} />
          <Route path="/utilities/weather-generator" element={<WeatherGeneratorPage />} />
          <Route path="/utilities/tavern-generator" element={<TavernGeneratorPage />} />
          <Route path="/utilities/dungeon-generator" element={<DungeonGeneratorPage />} />
          <Route path="/utilities/plot-hooks" element={<PlotHookGeneratorPage />} />
          <Route path="/utilities/timeline" element={<TimelineGeneratorPage />} />
          <Route path="/utilities/faction-generator" element={<FactionGeneratorPage />} />
          <Route path="/utilities/map-generator" element={<MapGeneratorPage />} />
          
          {/* New Utility Routes */}
          <Route path="/utilities/calendar-generator" element={<CalendarGeneratorPage />} />
          <Route path="/utilities/currency-generator" element={<CurrencyGeneratorPage />} />
          <Route path="/utilities/religion-generator" element={<ReligionGeneratorPage />} />
          <Route path="/utilities/language-generator" element={<LanguageGeneratorPage />} />
          <Route path="/utilities/magic-system-generator" element={<MagicSystemGeneratorPage />} />
          <Route path="/utilities/pantheon-generator" element={<PantheonGeneratorPage />} />
          <Route path="/utilities/prophecy-generator" element={<ProphecyGeneratorPage />} />
          <Route path="/utilities/treasure-hoard-generator" element={<TreasureHoardGeneratorPage />} />
          <Route path="/utilities/battle-map-generator" element={<BattleMapGeneratorPage />} />
          <Route path="/utilities/merchant-generator" element={<MerchantGeneratorPage />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/premium" element={<PremiumPage />} />
        </Routes>
      </div>
    </div>
  );
}