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
  
  const { selectedWorld } = useWorld();

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
              <Route path="/" element={
                <ProtectedRoute>
                  <WorldSelectionPage />
                </ProtectedRoute>
              } />
              <Route path="/world" element={
                <ProtectedRoute>
                  <WorldRouter regions={regions} onAddRegion={handleAddRegion} onAddCity={handleAddCity} lastAddedId={lastAddedId} />
                </ProtectedRoute>
              } />
              <Route path="/world/:worldId/preview" element={
                <ProtectedRoute>
                  <WorldPreviewPage />
                </ProtectedRoute>
              } />
              
              {/* Other protected routes */}
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
              <Route path="/world/:regionId/location/:locationId" element={
                <ProtectedRoute>
                  <WorldRouter regions={regions} onAddRegion={handleAddRegion} onAddCity={handleAddCity} lastAddedId={lastAddedId} />
                </ProtectedRoute>
              } />
              <Route path="/world/:regionId/city/:cityId/dungeon/:dungeonId" element={
                <ProtectedRoute>
                  <WorldRouter regions={regions} onAddRegion={handleAddRegion} onAddCity={handleAddCity} lastAddedId={lastAddedId} />
                </ProtectedRoute>
              } />

              {/* Feature routes */}
              <Route path="/campaign" element={
                <ProtectedRoute>
                  <CampaignPage />
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
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              
              {/* Utility Routes */}
              <Route path="/utilities/name-generator" element={
                <ProtectedRoute>
                  <NameGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/encounter-builder" element={
                <ProtectedRoute>
                  <EncounterBuilderPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/dice-roller" element={
                <ProtectedRoute>
                  <DiceRollerPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/loot-generator" element={
                <ProtectedRoute>
                  <LootGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/weather-generator" element={
                <ProtectedRoute>
                  <WeatherGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/tavern-generator" element={
                <ProtectedRoute>
                  <TavernGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/dungeon-generator" element={
                <ProtectedRoute>
                  <DungeonGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/plot-hooks" element={
                <ProtectedRoute>
                  <PlotHookGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/timeline" element={
                <ProtectedRoute>
                  <TimelineGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/faction-generator" element={
                <ProtectedRoute>
                  <FactionGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/map-generator" element={
                <ProtectedRoute>
                  <MapGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/calendar-generator" element={
                <ProtectedRoute>
                  <CalendarGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/currency-generator" element={
                <ProtectedRoute>
                  <CurrencyGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/religion-generator" element={
                <ProtectedRoute>
                  <ReligionGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/language-generator" element={
                <ProtectedRoute>
                  <LanguageGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/magic-system-generator" element={
                <ProtectedRoute>
                  <MagicSystemGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/pantheon-generator" element={
                <ProtectedRoute>
                  <PantheonGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/prophecy-generator" element={
                <ProtectedRoute>
                  <ProphecyGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/treasure-hoard-generator" element={
                <ProtectedRoute>
                  <TreasureHoardGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/battle-map-generator" element={
                <ProtectedRoute>
                  <BattleMapGeneratorPage />
                </ProtectedRoute>
              } />
              <Route path="/utilities/merchant-generator" element={
                <ProtectedRoute>
                  <MerchantGeneratorPage />
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