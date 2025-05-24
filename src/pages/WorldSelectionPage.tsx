import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  StarIcon, 
  ArrowUpIcon, 
  ArrowDownIcon, 
  FunnelIcon, 
  AdjustmentsHorizontalIcon, 
  UserIcon, 
  CheckIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  ShareIcon,
  UserGroupIcon,
  ClockIcon,
  FireIcon,
  SparklesIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { World, WorldTheme } from '../types/world'
import { worlds } from '../data/worlds'
import { useWorld } from '../contexts/WorldContext'
import { useWorldProgress } from '../contexts/WorldProgressContext'

type SortOption = 'popularity' | 'rating' | 'name' | 'createdAt'
type FilterOption = {
  theme?: WorldTheme
  difficulty?: World['difficulty']
  featured?: boolean
  myWorlds?: boolean
  filterType?: 'all' | 'my' | 'featured'
}

export function WorldSelectionPage() {
  const navigate = useNavigate()
  const { setSelectedWorld } = useWorld()
  const { hasCreatedWorld, getCurrentChapter } = useWorldProgress()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('popularity')
  const [filters, setFilters] = useState<FilterOption>({
    filterType: 'all',
    featured: true
  })
  const [showFilters, setShowFilters] = useState(true)
  const [activeWorldId, setActiveWorldId] = useState('sword-coast')
  const [likedWorlds, setLikedWorlds] = useState<Set<string>>(new Set())

  // Mock recent activity data
  const recentActivity = [
    { user: 'JD', action: 'started playing', world: 'Sword Coast', time: '2m ago' },
    { user: 'MK', action: 'completed a quest in', world: 'Cyberpunk 2077', time: '5m ago' },
    { user: 'AL', action: 'joined', world: 'Victorian London', time: '10m ago' },
  ]

  const filteredAndSortedWorlds = useMemo(() => {
    // Start with all worlds
    let result = [...worlds];

    // Apply filter type first
    if (filters.filterType === 'my') {
      result = result.filter(world => world.id === 'sword-coast');
    } else if (filters.filterType === 'featured') {
      result = result.filter(world => world.featured);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(world => 
        world.name.toLowerCase().includes(query) ||
        world.description.toLowerCase().includes(query) ||
        world.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply theme and difficulty filters
    if (filters.theme) {
      result = result.filter(world => world.theme === filters.theme);
    }
    if (filters.difficulty) {
      result = result.filter(world => world.difficulty === filters.difficulty);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'rating':
          const ratingDiff = b.rating.averageRating - a.rating.averageRating;
          return ratingDiff !== 0 ? ratingDiff : b.rating.totalRatings - a.rating.totalRatings;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [worlds, searchQuery, sortBy, filters])

  const handleWorldClick = (world: World) => {
    navigate(`/world/${world.id}/preview`)
  }

  const handleSetActive = (worldId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveWorldId(worldId)
  }

  const handleUpvote = (worldId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: Implement upvote functionality
  }

  const handleDownvote = (worldId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: Implement downvote functionality
  }

  const handleLike = (worldId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedWorlds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(worldId)) {
        newSet.delete(worldId)
      } else {
        newSet.add(worldId)
      }
      return newSet
    })
  }

  const handleShare = (worldId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: Implement share functionality
  }

  const handleComment = (worldId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: Implement comment functionality
  }

  const renderWorldCard = (world: World) => (
    <div
      key={world.id}
      data-testid={`world-card-${world.id}`}
      className={`bg-white/5 rounded-lg overflow-hidden cursor-pointer hover:bg-white/10 transition-all duration-300 ${
        world.id === activeWorldId ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
      }`}
      onClick={() => handleWorldClick(world)}
    >
      <div className="relative">
        <img
          src={world.thumbnail}
          alt={world.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {world.featured && (
            <div className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
              Featured
            </div>
          )}
        </div>
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {world.id === 'sword-coast' && (
            <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <UserIcon className="w-3 h-3" />
              My World
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full border-2 border-gray-800 bg-purple-500 flex items-center justify-center text-xs font-bold text-white">JD</div>
                <div className="w-6 h-6 rounded-full border-2 border-gray-800 bg-blue-500 flex items-center justify-center text-xs font-bold text-white">MK</div>
                <div className="w-6 h-6 rounded-full border-2 border-gray-800 bg-green-500 flex items-center justify-center text-xs font-bold text-white">AL</div>
              </div>
              <span className="text-sm text-gray-300">+{Math.floor(Math.random() * 50)} playing now</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">Last updated {new Date(world.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold" role="heading" aria-level={3} data-testid={`world-title-${world.id}`}>
            {world.name}
          </h3>
          <div className="flex items-center gap-1">
            <StarIconSolid className="w-5 h-5 text-yellow-400" />
            <span>{world.rating.averageRating.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{world.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {world.tags.map(tag => (
            <span
              key={tag}
              className="bg-white/10 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-4">
            <span>{world.difficulty}</span>
            <span>{world.estimatedPlayTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => handleUpvote(world.id, e)}
              className="hover:text-green-400 transition-colors"
            >
              <ArrowUpIcon className="w-5 h-5" />
            </button>
            <span>{world.rating.upvotes}</span>
            <button
              onClick={(e) => handleDownvote(world.id, e)}
              className="hover:text-red-400 transition-colors"
            >
              <ArrowDownIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                data-testid={`like-button-${world.id}`}
                onClick={(e) => handleLike(world.id, e)}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                {likedWorlds.has(world.id) ? (
                  <HeartIconSolid data-testid={`heart-solid-icon-${world.id}`} className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                <span>{Math.floor(Math.random() * 100)}</span>
              </button>
              <button 
                onClick={(e) => handleComment(world.id, e)}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                <ChatBubbleLeftIcon className="w-5 h-5" />
                <span>{Math.floor(Math.random() * 50)}</span>
              </button>
            </div>
            <button 
              onClick={(e) => handleShare(world.id, e)}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
            >
              <ShareIcon className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>

        {hasCreatedWorld(world.id) ? (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="w-full bg-purple-500/20 text-purple-300 px-4 py-3 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5" />
                <span className="font-medium">Chapter {getCurrentChapter(world.id)}</span>
              </div>
              <span className="text-sm text-purple-400">In Progress</span>
            </div>
          </div>
        ) : (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="w-full bg-white/5 text-gray-400 px-4 py-3 rounded-lg flex items-center justify-center gap-2">
              <PlusIcon className="w-5 h-5" />
              <span>Start Your Journey</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#1B0A20] text-white p-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Explore Worlds</h1>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-red-500">🔥</span>
              Hot this Week
            </h2>
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              View All
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {worlds
              .filter(world => world.featured)
              .slice(0, 3)
              .map(world => (
                <div
                  key={world.id}
                  className="relative group cursor-pointer"
                  onClick={() => handleWorldClick(world)}
                >
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={world.thumbnail}
                      alt={world.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full border-2 border-gray-800 bg-purple-500 flex items-center justify-center text-xs font-bold text-white">JD</div>
                        <div className="w-6 h-6 rounded-full border-2 border-gray-800 bg-blue-500 flex items-center justify-center text-xs font-bold text-white">MK</div>
                        <div className="w-6 h-6 rounded-full border-2 border-gray-800 bg-green-500 flex items-center justify-center text-xs font-bold text-white">AL</div>
                      </div>
                      <span className="text-sm text-gray-300">+{Math.floor(Math.random() * 50)} playing</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1" data-testid={`featured-world-${world.id}`}>
                      {world.name}
                    </h3>
                    <p className="text-sm text-gray-300 line-clamp-1">{world.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="bg-white/5 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-6">
                {/* Filter Type Dropdown (first) */}
                <div className="flex-1">
                  <select
                    value={filters.filterType || 'all'}
                    onChange={(e) => setFilters(prev => ({ ...prev, filterType: e.target.value as 'all' | 'my' | 'featured' }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Worlds</option>
                    <option value="my">My Worlds</option>
                    <option value="featured">Featured Worlds</option>
                  </select>
                </div>

                {/* Theme Dropdown (second) */}
                <div className="flex-1">
                  <select
                    value={filters.theme || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, theme: e.target.value as WorldTheme || undefined }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">All Themes</option>
                    {Array.from(new Set(worlds.map(world => world.theme))).map(theme => (
                      <option key={theme} value={theme}>{theme}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Dropdown (third) */}
                <div className="flex-1">
                  <select
                    value={filters.difficulty || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value as World['difficulty'] || undefined }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">All Difficulties</option>
                    {Array.from(new Set(worlds.map(world => world.difficulty))).map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>

                {/* Sort Dropdown (fourth) */}
                <div className="flex-1">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="popularity">Sort by Popularity</option>
                    <option value="createdAt">Sort by Newest</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-400">{filteredAndSortedWorlds.length} worlds found</span>
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search worlds..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedWorlds.map(renderWorldCard)}
            </div>
          </div>

          <div className="w-80 flex-shrink-0">
            <div className="bg-white/5 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <UserGroupIcon className="w-5 h-5 text-purple-400" />
                Community Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Active Players</span>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Worlds Created</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Quests</span>
                  <span className="font-semibold">456</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Active Sessions</span>
                  <span className="font-semibold">789</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-purple-400" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold text-white">
                      {activity.user}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{' '}
                        {activity.action}{' '}
                        <span className="text-purple-400">{activity.world}</span>
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 