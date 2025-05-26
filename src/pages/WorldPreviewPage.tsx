import { useParams, useNavigate } from 'react-router-dom'
import { 
  StarIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  HeartIcon,
  ShareIcon,
  UserGroupIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
  MapIcon,
  BookOpenIcon,
  ShieldExclamationIcon,
  LanguageIcon,
  TagIcon,
  CalendarIcon,
  TrophyIcon,
  ArrowLeftIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  FireIcon,
  SparklesIcon,
  ChartBarIcon,
  HandRaisedIcon,
  BoltIcon,
  ShieldCheckIcon,
  UserIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon,
  PuzzlePieceIcon,
  SwatchIcon,
  RectangleStackIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { useWorld } from '../contexts/WorldContext'
import { useWorldProgress } from '../contexts/WorldProgressContext'
import { WorldsAPI } from '../api/worlds'
import type { World } from '../types/world'

// Mock data for enhanced features
const mockReviews = [
  { id: 1, user: "DragonSlayer92", rating: 5, text: "Incredible world building and attention to detail!", date: "2024-03-10", helpful: 45 },
  { id: 2, user: "QuestMaster", rating: 4, text: "Great storylines, though some areas feel a bit underdeveloped.", date: "2024-03-08", helpful: 32 },
  { id: 3, user: "LoreMaster", rating: 5, text: "The rich history and lore make this world feel truly alive!", date: "2024-03-05", helpful: 28 }
]

const mockAchievements = [
  { id: 1, name: "World Explorer", description: "Discover all major locations", progress: 65, icon: GlobeAltIcon },
  { id: 2, name: "Lore Master", description: "Collect all historical documents", progress: 40, icon: BookOpenIcon },
  { id: 3, name: "Hero of the Realm", description: "Complete all main quests", progress: 30, icon: SparklesIcon }
]

const mockStats = {
  activeQuests: 156,
  completedQuests: 1234,
  totalPlayTime: "45,678 hours",
  activePlayers: "1,234",
  rating: 4.8,
  totalReviews: 2345
}

// New mock data for world content
const worldContent = {
  characters: {
    total: 247,
    breakdown: {
      questGivers: 45,
      merchants: 32,
      companions: 8,
      enemies: 162
    }
  },
  locations: {
    total: 89,
    breakdown: {
      cities: 12,
      dungeons: 28,
      wilderness: 34,
      secretAreas: 15
    }
  },
  items: {
    total: 543,
    breakdown: {
      weapons: 124,
      armor: 86,
      consumables: 178,
      questItems: 95,
      treasures: 60
    }
  },
  content: {
    mainQuests: 24,
    sideQuests: 156,
    dialogueLines: "15,000+",
    cutscenes: 32,
    secretEvents: 18
  },
  customization: {
    classes: 8,
    races: 12,
    backgrounds: 15,
    skills: 124,
    spells: 186
  }
}

export function WorldPreviewPage() {
  const { worldId } = useParams()
  const navigate = useNavigate()
  const [likedWorlds, setLikedWorlds] = useState<Set<string>>(new Set())
  const { setSelectedWorld } = useWorld()
  const { hasCreatedWorld, getCurrentChapter, setWorldProgress } = useWorldProgress()
  const [world, setWorld] = useState<World | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Add useEffect to scroll to top and load world data
  useEffect(() => {
    window.scrollTo(0, 0)
    
    const loadWorld = async () => {
      if (!worldId) return;
      
      try {
        setLoading(true)
        const worldData = await WorldsAPI.getWorldById(worldId)
        if (!worldData) {
          setError('World not found')
          return
        }
        setWorld(worldData)
        setError(null)
      } catch (err) {
        console.error('Error loading world:', err)
        setError('Failed to load world data')
      } finally {
        setLoading(false)
      }
    }

    loadWorld()
  }, [worldId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1B0A20] text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading World...</h1>
        </div>
      </div>
    )
  }

  if (error || !world) {
    return (
      <div className="min-h-screen bg-[#1B0A20] text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">World Not Found</h1>
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Return to World Selection
          </button>
        </div>
      </div>
    )
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedWorlds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(world.id)) {
        newSet.delete(world.id)
      } else {
        newSet.add(world.id)
      }
      return newSet
    })
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: Implement share functionality
  }

  const handlePlay = () => {
    if (!world) return;

    setSelectedWorld(world);
    
    if (!hasCreatedWorld(world.id)) {
      // Create new world progress
      setWorldProgress(world.id, {
        worldId: world.id,
        chapter: 1,
        lastPlayed: new Date().toISOString()
      });
    } else {
      // Update last played time
      setWorldProgress(world.id, {
        worldId: world.id,
        chapter: getCurrentChapter(world.id),
        lastPlayed: new Date().toISOString()
      });
    }
    
    navigate('/world');
  }

  const renderDifficultyBadge = (difficulty: string) => {
    const colors = {
      'Beginner': 'bg-green-500/20 text-green-300',
      'Intermediate': 'bg-yellow-500/20 text-yellow-300',
      'Advanced': 'bg-red-500/20 text-red-300'
    }
    return colors[difficulty as keyof typeof colors] || 'bg-gray-500/20 text-gray-300'
  }

  const renderProgressBar = (progress: number) => (
    <div className="w-full bg-white/10 rounded-full h-2">
      <div 
        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#1B0A20] text-white">
      {/* Back Button */}
      <div className="absolute top-20 left-8 z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-black/30 hover:bg-black/40 px-4 py-2 rounded-lg"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Worlds
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative h-[50vh] w-full">
        <img 
          src={world.banner}
          alt={world.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B0A20] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">{world.name}</h1>
            <div className="flex items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <StarIconSolid className="w-6 h-6 text-yellow-400" />
                <span>{world.rating?.rating?.toFixed(1) || '0.0'}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserGroupIcon className="w-6 h-6 text-purple-400" />
                <span>{world.popularity.toLocaleString()} players</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-6 h-6 text-purple-400" />
                <span>{world.estimatedPlayTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <ChartBarIcon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{mockStats.activeQuests}</div>
                <div className="text-sm text-gray-400">Active Quests</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <UserGroupIcon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{mockStats.activePlayers}</div>
                <div className="text-sm text-gray-400">Active Players</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <ClockIcon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{mockStats.totalPlayTime}</div>
                <div className="text-sm text-gray-400">Total Play Time</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <StarIconSolid className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{world.rating?.rating?.toFixed(1) || '0.0'}</div>
                <div className="text-sm text-gray-400">{world.rating?.votes || 0} Reviews</div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/5 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <BookOpenIcon className="w-6 h-6 text-purple-400" />
                Description
              </h2>
              <p className="text-gray-300 leading-relaxed">{world.description}</p>
            </div>

            {/* World Content Overview */}
            <div className="bg-white/5 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <GlobeAltIcon className="w-6 h-6 text-purple-400" />
                World Content Overview
              </h2>
              
              {/* Characters Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-blue-400" />
                  Characters & NPCs
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-blue-400">{worldContent.characters.breakdown.questGivers}</div>
                    <div className="text-sm text-gray-400">Quest Givers</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-blue-400">{worldContent.characters.breakdown.merchants}</div>
                    <div className="text-sm text-gray-400">Merchants</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-blue-400">{worldContent.characters.breakdown.companions}</div>
                    <div className="text-sm text-gray-400">Companions</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-blue-400">{worldContent.characters.breakdown.enemies}</div>
                    <div className="text-sm text-gray-400">Unique Enemies</div>
                  </div>
                </div>
                <div className="text-sm text-gray-400 text-center">
                  Total of <span className="text-white font-semibold">{worldContent.characters.total}</span> unique characters to interact with
                </div>
              </div>

              {/* Locations Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapIcon className="w-5 h-5 text-green-400" />
                  Locations & Maps
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-green-400">{worldContent.locations.breakdown.cities}</div>
                    <div className="text-sm text-gray-400">Cities & Towns</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-green-400">{worldContent.locations.breakdown.dungeons}</div>
                    <div className="text-sm text-gray-400">Dungeons</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-green-400">{worldContent.locations.breakdown.wilderness}</div>
                    <div className="text-sm text-gray-400">Wilderness Areas</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-green-400">{worldContent.locations.breakdown.secretAreas}</div>
                    <div className="text-sm text-gray-400">Secret Areas</div>
                  </div>
                </div>
                <div className="text-sm text-gray-400 text-center">
                  Total of <span className="text-white font-semibold">{worldContent.locations.total}</span> unique locations to explore
                </div>
              </div>

              {/* Items Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <SwatchIcon className="w-5 h-5 text-yellow-400" />
                  Items & Equipment
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-yellow-400">{worldContent.items.breakdown.weapons}</div>
                    <div className="text-sm text-gray-400">Weapons</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-yellow-400">{worldContent.items.breakdown.armor}</div>
                    <div className="text-sm text-gray-400">Armor</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-yellow-400">{worldContent.items.breakdown.consumables}</div>
                    <div className="text-sm text-gray-400">Consumables</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-yellow-400">{worldContent.items.breakdown.questItems}</div>
                    <div className="text-sm text-gray-400">Quest Items</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-yellow-400">{worldContent.items.breakdown.treasures}</div>
                    <div className="text-sm text-gray-400">Treasures</div>
                  </div>
                </div>
                <div className="text-sm text-gray-400 text-center">
                  Total of <span className="text-white font-semibold">{worldContent.items.total}</span> unique items to discover
                </div>
              </div>

              {/* Additional Content */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <RectangleStackIcon className="w-5 h-5 text-purple-400" />
                  Additional Content
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Quests & Story</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Main Quests</span>
                        <span>{worldContent.content.mainQuests}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Side Quests</span>
                        <span>{worldContent.content.sideQuests}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Dialogue Lines</span>
                        <span>{worldContent.content.dialogueLines}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Cutscenes</span>
                        <span>{worldContent.content.cutscenes}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Character Options</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Classes</span>
                        <span>{worldContent.customization.classes}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Races</span>
                        <span>{worldContent.customization.races}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Backgrounds</span>
                        <span>{worldContent.customization.backgrounds}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Skills</span>
                        <span>{worldContent.customization.skills}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Combat & Magic</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Spells</span>
                        <span>{worldContent.customization.spells}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Enemy Types</span>
                        <span>{worldContent.characters.breakdown.enemies}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Secret Events</span>
                        <span>{worldContent.content.secretEvents}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regions Preview */}
            <div className="bg-white/5 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <MapIcon className="w-6 h-6 text-purple-400" />
                Regions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {world.regions.map(region => (
                  <div key={region.id} className="bg-white/5 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{region.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{region.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white/5 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <ChatBubbleLeftIcon className="w-6 h-6 text-purple-400" />
                Player Reviews
              </h2>
              <div className="space-y-6">
                {mockReviews.map(review => (
                  <div key={review.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                          {review.user.charAt(0)}
                        </div>
                        <span className="font-medium">{review.user}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <StarIconSolid key={i} className="w-4 h-4 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 mb-3">{review.text}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors">
                        <HandRaisedIcon className="w-4 h-4" />
                        <span>{review.helpful} Helpful</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Warnings */}
            {world.contentWarnings && (
              <div className="bg-white/5 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <ShieldExclamationIcon className="w-6 h-6 text-purple-400" />
                  Content Warnings
                </h2>
                <div className="flex flex-wrap gap-2">
                  {world.contentWarnings.map(warning => (
                    <span key={warning} className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">
                      {warning}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Stats & Meta */}
          <div className="space-y-8">
            {/* Action Buttons */}
            <div className="bg-white/5 rounded-lg p-6">
              <button
                onClick={handlePlay}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold mb-4 transition-colors flex items-center justify-center gap-2"
              >
                {hasCreatedWorld(world.id) ? (
                  <>
                    <SparklesIcon className="w-6 h-6" />
                    Resume Chapter {getCurrentChapter(world.id)}
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-6 h-6" />
                    Create World
                  </>
                )}
              </button>
              <div className="flex gap-4">
                <button
                  onClick={handleLike}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 py-3 px-6 rounded-lg transition-colors"
                >
                  {likedWorlds.has(world.id) ? (
                    <HeartIconSolid className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartIcon className="w-6 h-6" />
                  )}
                  Like
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 py-3 px-6 rounded-lg transition-colors"
                >
                  <ShareIcon className="w-6 h-6" />
                  Share
                </button>
              </div>
            </div>

            {/* Recommended Level */}
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AcademicCapIcon className="w-5 h-5 text-purple-400" />
                Recommended Level
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl font-bold">{world.recommendedLevel}</div>
                <div className={`px-3 py-1 rounded-full text-sm ${renderDifficultyBadge(world.difficulty)}`}>
                  {world.difficulty}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BoltIcon className="w-5 h-5 text-yellow-400" />
                  <span>Challenging combat encounters</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpenIcon className="w-5 h-5 text-blue-400" />
                  <span>Complex storylines</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                  <span>Balanced for group play</span>
                </div>
              </div>
            </div>

            {/* Meta Information */}
            <div className="bg-white/5 rounded-lg p-6 space-y-6">
              {/* Creator */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Creator</h3>
                <div className="flex items-center gap-3">
                  <img
                    src={world.creator.avatar}
                    alt={world.creator.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium">{world.creator.name}</span>
                </div>
              </div>

              {/* Theme */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Theme</h3>
                <div className="flex items-center gap-2">
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                    {world.theme}
                  </span>
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Difficulty</h3>
                <div className="flex items-center gap-2">
                  <TrophyIcon className="w-5 h-5 text-purple-400" />
                  <span>{world.difficulty}</span>
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Available Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {world.languages.map(lang => (
                    <span key={lang} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {world.tags.map(tag => (
                    <span key={tag} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Created</span>
                  <span>{new Date(world.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Last Updated</span>
                  <span>{new Date(world.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* World Stats */}
            <div className="bg-white/5 rounded-lg p-6 space-y-6">
              <h3 className="text-lg font-semibold">World Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Completion Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-white/10 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '65%' }} />
                    </div>
                    <span>65%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Player Retention</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-white/10 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }} />
                    </div>
                    <span>82%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Quest Success Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-white/10 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }} />
                    </div>
                    <span>75%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 