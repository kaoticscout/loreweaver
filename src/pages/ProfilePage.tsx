import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  UserIcon, 
  PencilIcon, 
  StarIcon, 
  ClockIcon, 
  TrophyIcon, 
  BookOpenIcon,
  UserGroupIcon,
  MapIcon,
  FlagIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  GlobeAltIcon,
  EyeIcon,
  UserPlusIcon,
  ChartBarIcon,
  UserCircleIcon,
  BellIcon,
  ShareIcon,
  ChatBubbleOvalLeftIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

export function ProfilePage() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [bio, setBio] = useState('Adventure seeker and world builder. Currently exploring the Sword Coast and creating new stories.')
  const [location, setLocation] = useState('San Francisco, CA')
  const [joinedDate] = useState('January 2024')
  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  const [showWorldComments, setShowWorldComments] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  // Mock user data
  const user = {
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    level: 15,
    xp: 7500,
    nextLevelXp: 10000,
    social: {
      followers: 1243,
      following: 567,
      likes: 8920,
      notifications: 5
    },
    notifications: {
      unread: 8,
      items: [
        {
          id: 1,
          type: 'message',
          title: 'New Message',
          description: 'Alice sent you a message',
          time: '2 hours ago',
          unread: true,
          icon: <EnvelopeIcon className="w-5 h-5" />,
          onClick: () => setShowMessages(true)
        },
        {
          id: 2,
          type: 'comment',
          title: 'New Comment',
          description: 'Bob commented on your world "Cyberpunk 2077"',
          time: '3 hours ago',
          unread: true,
          icon: <ChatBubbleLeftIcon className="w-5 h-5" />,
          onClick: () => setShowWorldComments(true)
        },
        {
          id: 3,
          type: 'like',
          title: 'New Like',
          description: 'Carol liked your world "Victorian London"',
          time: '5 hours ago',
          unread: true,
          icon: <HeartIcon className="w-5 h-5" />,
          onClick: () => navigate('/world/victorian-london')
        },
        {
          id: 4,
          type: 'follow',
          title: 'New Follower',
          description: 'David started following you',
          time: '1 day ago',
          unread: true,
          icon: <UserPlusIcon className="w-5 h-5" />,
          onClick: () => setShowFollowers(true)
        },
        {
          id: 5,
          type: 'achievement',
          title: 'Achievement Unlocked',
          description: 'You earned the "World Builder" badge',
          time: '2 days ago',
          unread: false,
          icon: <TrophyIcon className="w-5 h-5" />,
          onClick: () => {}
        }
      ]
    },
    achievements: [
      { id: 1, name: 'World Builder', description: 'Created your first world', icon: '🏗️' },
      { id: 2, name: 'Quest Master', description: 'Completed 50 quests', icon: '📜' },
      { id: 3, name: 'Social Butterfly', description: 'Connected with 20 players', icon: '🦋' },
    ],
    stats: {
      worldsCreated: 3,
      questsCompleted: 52,
      totalPlayTime: '127 hours',
      favoriteWorld: 'Sword Coast',
      activeSince: '2 months',
    },
    publishedWorlds: [
      {
        id: 'sword-coast',
        name: 'Sword Coast',
        views: 1250,
        players: 342,
        rating: 4.8,
        quests: 15,
        regions: 8,
        lastUpdated: '2024-03-15',
        status: 'active',
        completionRate: 78,
        averageSessionTime: '2.5 hours',
        tags: ['Fantasy', 'Adventure', 'Medieval'],
        likes: 234,
        comments: 45,
        shares: 12
      },
      {
        id: 'cyberpunk-2077',
        name: 'Cyberpunk 2077',
        views: 890,
        players: 156,
        rating: 4.6,
        quests: 12,
        regions: 6,
        lastUpdated: '2024-03-10',
        status: 'active',
        completionRate: 65,
        averageSessionTime: '3.2 hours',
        tags: ['Sci-Fi', 'Cyberpunk', 'Action'],
        likes: 189,
        comments: 32,
        shares: 8
      },
      {
        id: 'victorian-london',
        name: 'Victorian London',
        views: 670,
        players: 98,
        rating: 4.9,
        quests: 10,
        regions: 5,
        lastUpdated: '2024-03-05',
        status: 'active',
        completionRate: 82,
        averageSessionTime: '2.8 hours',
        tags: ['Historical', 'Mystery', 'Steampunk'],
        likes: 156,
        comments: 28,
        shares: 5
      }
    ],
    recentActivity: [
      { type: 'quest', world: 'Sword Coast', action: 'Completed "The Lost City"', time: '2 hours ago' },
      { type: 'world', world: 'Cyberpunk 2077', action: 'Started playing', time: '1 day ago' },
      { type: 'achievement', world: 'Victorian London', action: 'Earned "Master Detective"', time: '2 days ago' },
    ],
    badges: [
      { name: 'Early Adopter', color: 'bg-purple-500' },
      { name: 'World Creator', color: 'bg-blue-500' },
      { name: 'Quest Master', color: 'bg-green-500' },
      { name: 'Community Leader', color: 'bg-yellow-500' },
    ],
    followers: [
      { id: 1, name: 'Alice Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', status: 'online' },
      { id: 2, name: 'Bob Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', status: 'offline' },
      { id: 3, name: 'Carol White', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol', status: 'online' },
    ],
    following: [
      { id: 1, name: 'David Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', status: 'online' },
      { id: 2, name: 'Eve Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eve', status: 'offline' },
      { id: 3, name: 'Frank Miller', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank', status: 'online' },
    ],
    messages: {
      unread: 3,
      conversations: [
        {
          id: 1,
          user: {
            name: 'Alice Smith',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
            status: 'online'
          },
          lastMessage: 'Hey! I really enjoyed your Sword Coast world!',
          time: '2 hours ago',
          unread: true
        },
        {
          id: 2,
          user: {
            name: 'Bob Johnson',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
            status: 'offline'
          },
          lastMessage: 'Would you like to collaborate on a new world?',
          time: '1 day ago',
          unread: true
        },
        {
          id: 3,
          user: {
            name: 'Carol White',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
            status: 'online'
          },
          lastMessage: 'Thanks for the feedback on my world!',
          time: '3 days ago',
          unread: true
        }
      ]
    },
    worldComments: {
      unread: 5,
      comments: [
        {
          id: 1,
          world: {
            id: 'sword-coast',
            name: 'Sword Coast',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SwordCoast'
          },
          user: {
            name: 'Alice Smith',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice'
          },
          comment: 'This world is amazing! I love the attention to detail in the cities.',
          time: '2 hours ago',
          unread: true
        },
        {
          id: 2,
          world: {
            id: 'cyberpunk-2077',
            name: 'Cyberpunk 2077',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cyberpunk'
          },
          user: {
            name: 'Bob Johnson',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob'
          },
          comment: 'The quest system in this world is really innovative!',
          time: '1 day ago',
          unread: true
        },
        {
          id: 3,
          world: {
            id: 'victorian-london',
            name: 'Victorian London',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Victorian'
          },
          user: {
            name: 'Carol White',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol'
          },
          comment: 'The atmosphere in this world is perfect!',
          time: '3 days ago',
          unread: true
        }
      ]
    }
  }

  return (
    <div className="min-h-screen bg-[#1B0A20] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 rounded-lg p-8 mb-8">
          <div className="flex items-start gap-8">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-purple-500"
              />
              <div className="absolute -bottom-2 -right-2 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                Level {user.level}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <div className="flex items-center gap-4 text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapIcon className="w-4 h-4" />
                      {location}
                    </span>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      Joined {joinedDate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setShowWorldComments(true)}
                    className="relative text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <ChatBubbleLeftIcon className="w-5 h-5" />
                    {user.worldComments.unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                        {user.worldComments.unread}
                      </span>
                    )}
                  </button>
                  <button 
                    onClick={() => setShowMessages(true)}
                    className="relative text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <EnvelopeIcon className="w-5 h-5" />
                    {user.messages.unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                        {user.messages.unread}
                      </span>
                    )}
                  </button>
                  <button 
                    onClick={() => setShowNotifications(true)}
                    className="relative text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <BellIcon className="w-5 h-5" />
                    {user.notifications.unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                        {user.notifications.unread}
                      </span>
                    )}
                  </button>
                </div>
              </div>
              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-white/10 rounded-lg p-3 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                />
              ) : (
                <p className="text-gray-300 mb-4">{bio}</p>
              )}
              <div className="flex items-center gap-6 mb-4">
                <button 
                  onClick={() => setShowFollowers(true)}
                  className="flex items-center gap-2 hover:text-purple-400 transition-colors"
                >
                  <UserGroupIcon className="w-5 h-5" />
                  <span className="font-medium">{user.social.followers.toLocaleString()}</span>
                  <span className="text-gray-400">Followers</span>
                </button>
                <button 
                  onClick={() => setShowFollowing(true)}
                  className="flex items-center gap-2 hover:text-purple-400 transition-colors"
                >
                  <UserCircleIcon className="w-5 h-5" />
                  <span className="font-medium">{user.social.following.toLocaleString()}</span>
                  <span className="text-gray-400">Following</span>
                </button>
                <div className="flex items-center gap-2">
                  <HeartIcon className="w-5 h-5" />
                  <span className="font-medium">{user.social.likes.toLocaleString()}</span>
                  <span className="text-gray-400">Likes</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.badges.map((badge, index) => (
                  <span
                    key={index}
                    className={`${badge.color} text-white px-3 py-1 rounded-full text-sm`}
                  >
                    {badge.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrophyIcon className="w-5 h-5 text-purple-400" />
              Achievements
            </h2>
            <div className="space-y-4">
              {user.achievements.map(achievement => (
                <div key={achievement.id} className="flex items-center gap-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h3 className="font-medium">{achievement.name}</h3>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-purple-400" />
              Statistics
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Worlds Created</span>
                <span className="font-semibold">{user.stats.worldsCreated}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Quests Completed</span>
                <span className="font-semibold">{user.stats.questsCompleted}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Play Time</span>
                <span className="font-semibold">{user.stats.totalPlayTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Favorite World</span>
                <span className="font-semibold text-purple-400">{user.stats.favoriteWorld}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Active Since</span>
                <span className="font-semibold">{user.stats.activeSince}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <GlobeAltIcon className="w-5 h-5 text-purple-400" />
            Published Worlds
          </h2>
          <div className="space-y-6">
            {user.publishedWorlds.map(world => (
              <div key={world.id} className="bg-white/5 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{world.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <StarIconSolid className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">{world.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-400">Last updated {new Date(world.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => navigate(`/world/${world.id}`)}
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      View World
                    </button>
                    <button className="text-purple-400 hover:text-purple-300 transition-colors">
                      <ShareIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <EyeIcon className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-400">Views</span>
                    </div>
                    <span className="text-lg font-semibold">{world.views.toLocaleString()}</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <UserPlusIcon className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-400">Players</span>
                    </div>
                    <span className="text-lg font-semibold">{world.players.toLocaleString()}</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <ChartBarIcon className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-400">Completion</span>
                    </div>
                    <span className="text-lg font-semibold">{world.completionRate}%</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <ClockIcon className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-400">Avg. Session</span>
                    </div>
                    <span className="text-lg font-semibold">{world.averageSessionTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Quests:</span>
                    <span className="font-medium">{world.quests}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-400">Regions:</span>
                    <span className="font-medium">{world.regions}</span>
                  </div>
                  <div className="flex gap-2">
                    {world.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                    <HeartIcon className="w-5 h-5" />
                    <span>{world.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                    <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                    <span>{world.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                    <ShareIcon className="w-5 h-5" />
                    <span>{world.shares}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-purple-400" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {user.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  {activity.type === 'quest' && <FlagIcon className="w-5 h-5 text-purple-400" />}
                  {activity.type === 'world' && <BookOpenIcon className="w-5 h-5 text-purple-400" />}
                  {activity.type === 'achievement' && <TrophyIcon className="w-5 h-5 text-purple-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.action}</span>
                    {' in '}
                    <span className="text-purple-400">{activity.world}</span>
                  </p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1B0A20] rounded-lg p-6 w-[480px] max-h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <BellIcon className="w-5 h-5" />
                Notifications
                {user.notifications.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {user.notifications.unread}
                  </span>
                )}
              </h3>
              <button 
                onClick={() => setShowNotifications(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4">
              {user.notifications.items.map(notification => (
                <div 
                  key={notification.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={notification.onClick}
                >
                  <div className={`p-2 rounded-lg ${
                    notification.unread ? 'bg-purple-500/20' : 'bg-white/5'
                  }`}>
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className="text-sm text-gray-400">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-300">{notification.description}</p>
                  </div>
                  {notification.unread && (
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Followers Modal */}
      {showFollowers && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1B0A20] rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Followers</h3>
              <button 
                onClick={() => setShowFollowers(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {user.followers.map(follower => (
                <div key={follower.id} className="flex items-center gap-3">
                  <img
                    src={follower.avatar}
                    alt={follower.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{follower.name}</p>
                    <p className="text-sm text-gray-400">
                      {follower.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1B0A20] rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Following</h3>
              <button 
                onClick={() => setShowFollowing(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {user.following.map(following => (
                <div key={following.id} className="flex items-center gap-3">
                  <img
                    src={following.avatar}
                    alt={following.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{following.name}</p>
                    <p className="text-sm text-gray-400">
                      {following.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                  </div>
                  <button className="text-red-400 hover:text-red-300">
                    Unfollow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* World Comments Modal */}
      {showWorldComments && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1B0A20] rounded-lg p-6 w-[480px] max-h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <ChatBubbleLeftIcon className="w-5 h-5" />
                World Comments
                {user.worldComments.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {user.worldComments.unread}
                  </span>
                )}
              </h3>
              <button 
                onClick={() => setShowWorldComments(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4">
              {user.worldComments.comments.map(comment => (
                <div 
                  key={comment.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={() => navigate(`/world/${comment.world.id}`)}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={comment.world.avatar}
                      alt={comment.world.name}
                      className="w-12 h-12 rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-purple-400">{comment.world.name}</h4>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-400">{comment.time}</span>
                      </div>
                      {comment.unread && (
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={comment.user.avatar}
                        alt={comment.user.name}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-sm font-medium">{comment.user.name}</span>
                    </div>
                    <p className="text-sm text-gray-300">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Messages Modal */}
      {showMessages && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1B0A20] rounded-lg p-6 w-[480px] max-h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <EnvelopeIcon className="w-5 h-5" />
                Messages
                {user.messages.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {user.messages.unread}
                  </span>
                )}
              </h3>
              <button 
                onClick={() => setShowMessages(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4">
              {user.messages.conversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="relative">
                    <img
                      src={conversation.user.avatar}
                      alt={conversation.user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#1B0A20] ${
                      conversation.user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium truncate">{conversation.user.name}</h4>
                      <span className="text-sm text-gray-400">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread && (
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 