import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation, Routes, Route, Navigate } from 'react-router-dom'
import { InformationCircleIcon, MapIcon, UserGroupIcon, BanknotesIcon, BuildingLibraryIcon, SparklesIcon, BookOpenIcon, UserIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { City, TransportationRoute, SeasonalEffect, MagicalItem, Dungeon, PointOfInterest, RestArea, Shop, InventoryItem } from './types/city'
import { Region } from './types/region'
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
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
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
  const {
    regions,
    handleAddRegion,
    handleAddCity,
    lastAddedId
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
              <Route path="/" element={<WorldSelectionPage />} />
              <Route path="/world" element={<WorldSelectionPage />} />
              <Route path="/world/:worldId/preview" element={<WorldPreviewPage />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <div>Dashboard (Protected)</div>
                </ProtectedRoute>
              } />
              <Route path="/premium" element={
                <ProtectedRoute>
                  <PremiumPage />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute requiredRole={['admin']}>
                  <div>Admin Dashboard</div>
                </ProtectedRoute>
              } />
              
              {/* Protected world routes */}
              <Route path="/world/:regionId" element={
                <ProtectedRoute>
                  <WorldRouter regions={regions} onAddRegion={handleAddRegion} onAddCity={handleAddCity} lastAddedId={lastAddedId} />
                </ProtectedRoute>
              } />
              <Route path="/world/:regionId/city/:cityId" element={
                <ProtectedRoute>
                  <WorldRouter regions={regions} onAddRegion={handleAddRegion} onAddCity={handleAddCity} lastAddedId={lastAddedId} />
                </ProtectedRoute>
              } />
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
  const [regions, setRegions] = useState<Region[]>([]);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const { selectedWorld } = useWorld();
  const { regionId, cityId, dungeonId } = useParams();
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<City | null>(null);
  const [selectedDungeon, setSelectedDungeon] = useState<Dungeon | null>(null);

  return (
    <div className="min-h-screen bg-[#1B0A20] text-white">
      <Header />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<WorldSelectionPage />} />
          
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