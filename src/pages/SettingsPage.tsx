import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  BellIcon, 
  PaintBrushIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  LanguageIcon,
  ArrowLeftOnRectangleIcon,
  TrashIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  ClockIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  UserPlusIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailNotifications, setEmailNotifications] = useState({
    messages: true,
    comments: true,
    likes: true,
    follows: true,
    marketing: false
  });
  const [pushNotifications, setPushNotifications] = useState({
    messages: true,
    comments: true,
    likes: true,
    follows: true
  });
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC');
  const [settings, setSettings] = useState({
    account: {
      username: 'johndoe',
      email: 'john@example.com',
      bio: 'World builder and storyteller',
      password: '********'
    },
    notifications: {
      email: {
        messages: true,
        comments: true,
        likes: true,
        follows: true,
        achievements: true
      },
      push: {
        messages: true,
        comments: true,
        likes: true,
        follows: true,
        achievements: true
      }
    },
    appearance: {
      theme: 'dark',
      fontSize: 'medium',
      compactMode: false
    },
    privacy: {
      publicProfile: true,
      showOnlineStatus: true,
      allowMessages: true,
      showActivity: true
    },
    language: {
      interface: 'en',
      timezone: 'UTC-5'
    },
    security: {
      twoFactor: false,
      loginNotifications: true,
      activeSessions: []
    }
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving settings:', settings);
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account...');
    }
  };

  const tabs = [
    { id: 'account', name: 'Account', icon: UserIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'appearance', name: 'Appearance', icon: PaintBrushIcon },
    { id: 'privacy', name: 'Privacy', icon: ShieldCheckIcon },
    { id: 'language', name: 'Language', icon: LanguageIcon },
    { id: 'security', name: 'Security', icon: KeyIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <div className="bg-gray-800 rounded-xl p-6">
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                        <input
                          type="text"
                          value={settings.account.username}
                          onChange={(e) => setSettings({ ...settings, account: { ...settings.account, username: e.target.value } })}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                          type="email"
                          value={settings.account.email}
                          onChange={(e) => setSettings({ ...settings, account: { ...settings.account, email: e.target.value } })}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
                      <textarea
                        value={settings.account.bio}
                        onChange={(e) => setSettings({ ...settings, account: { ...settings.account, bio: e.target.value } })}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Password</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-700">
                    <h2 className="text-xl font-semibold mb-4 text-red-400">Danger Zone</h2>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <TrashIcon className="h-5 w-5 mr-2" />
                      Delete Account
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Email Notifications</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center">
                          <EnvelopeIcon className="h-5 w-5 text-purple-400 mr-3" />
                          <div>
                            <h3 className="font-medium">Messages</h3>
                            <p className="text-sm text-gray-400">Get notified when you receive new messages</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.email.messages}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: {
                                ...settings.notifications,
                                email: { ...settings.notifications.email, messages: e.target.checked }
                              }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center">
                          <ChatBubbleLeftRightIcon className="h-5 w-5 text-purple-400 mr-3" />
                          <div>
                            <h3 className="font-medium">Comments</h3>
                            <p className="text-sm text-gray-400">Get notified when someone comments on your worlds</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.email.comments}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: {
                                ...settings.notifications,
                                email: { ...settings.notifications.email, comments: e.target.checked }
                              }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center">
                          <HeartIcon className="h-5 w-5 text-purple-400 mr-3" />
                          <div>
                            <h3 className="font-medium">Likes</h3>
                            <p className="text-sm text-gray-400">Get notified when someone likes your content</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.email.likes}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: {
                                ...settings.notifications,
                                email: { ...settings.notifications.email, likes: e.target.checked }
                              }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center">
                          <UserPlusIcon className="h-5 w-5 text-purple-400 mr-3" />
                          <div>
                            <h3 className="font-medium">Follows</h3>
                            <p className="text-sm text-gray-400">Get notified when someone follows you</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.email.follows}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: {
                                ...settings.notifications,
                                email: { ...settings.notifications.email, follows: e.target.checked }
                              }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center">
                          <TrophyIcon className="h-5 w-5 text-purple-400 mr-3" />
                          <div>
                            <h3 className="font-medium">Achievements</h3>
                            <p className="text-sm text-gray-400">Get notified when you unlock achievements</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.email.achievements}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: {
                                ...settings.notifications,
                                email: { ...settings.notifications.email, achievements: e.target.checked }
                              }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Push Notifications</h2>
                    <div className="space-y-4">
                      {/* Repeat the same structure for push notifications */}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Theme</h2>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => setSettings({ ...settings, appearance: { ...settings.appearance, theme: 'light' } })}
                        className={`p-4 rounded-lg border-2 ${
                          settings.appearance.theme === 'light'
                            ? 'border-purple-500 bg-gray-700'
                            : 'border-gray-600 bg-gray-700/50'
                        }`}
                      >
                        <div className="h-24 bg-white rounded-lg mb-2"></div>
                        <p className="text-center font-medium">Light</p>
                      </button>
                      <button
                        onClick={() => setSettings({ ...settings, appearance: { ...settings.appearance, theme: 'dark' } })}
                        className={`p-4 rounded-lg border-2 ${
                          settings.appearance.theme === 'dark'
                            ? 'border-purple-500 bg-gray-700'
                            : 'border-gray-600 bg-gray-700/50'
                        }`}
                      >
                        <div className="h-24 bg-gray-800 rounded-lg mb-2"></div>
                        <p className="text-center font-medium">Dark</p>
                      </button>
                      <button
                        onClick={() => setSettings({ ...settings, appearance: { ...settings.appearance, theme: 'system' } })}
                        className={`p-4 rounded-lg border-2 ${
                          settings.appearance.theme === 'system'
                            ? 'border-purple-500 bg-gray-700'
                            : 'border-gray-600 bg-gray-700/50'
                        }`}
                      >
                        <div className="h-24 bg-gradient-to-r from-white to-gray-800 rounded-lg mb-2"></div>
                        <p className="text-center font-medium">System</p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Font Size</h2>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setSettings({ ...settings, appearance: { ...settings.appearance, fontSize: 'small' } })}
                        className={`px-4 py-2 rounded-lg ${
                          settings.appearance.fontSize === 'small'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        Small
                      </button>
                      <button
                        onClick={() => setSettings({ ...settings, appearance: { ...settings.appearance, fontSize: 'medium' } })}
                        className={`px-4 py-2 rounded-lg ${
                          settings.appearance.fontSize === 'medium'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        Medium
                      </button>
                      <button
                        onClick={() => setSettings({ ...settings, appearance: { ...settings.appearance, fontSize: 'large' } })}
                        className={`px-4 py-2 rounded-lg ${
                          settings.appearance.fontSize === 'large'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        Large
                      </button>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Display</h2>
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h3 className="font-medium">Compact Mode</h3>
                        <p className="text-sm text-gray-400">Reduce spacing and padding throughout the interface</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.appearance.compactMode}
                          onChange={(e) => setSettings({
                            ...settings,
                            appearance: { ...settings.appearance, compactMode: e.target.checked }
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Profile Privacy</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div>
                          <h3 className="font-medium">Public Profile</h3>
                          <p className="text-sm text-gray-400">Allow others to view your profile and content</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.privacy.publicProfile}
                            onChange={(e) => setSettings({
                              ...settings,
                              privacy: { ...settings.privacy, publicProfile: e.target.checked }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div>
                          <h3 className="font-medium">Show Online Status</h3>
                          <p className="text-sm text-gray-400">Display when you're active on the platform</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.privacy.showOnlineStatus}
                            onChange={(e) => setSettings({
                              ...settings,
                              privacy: { ...settings.privacy, showOnlineStatus: e.target.checked }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div>
                          <h3 className="font-medium">Allow Messages</h3>
                          <p className="text-sm text-gray-400">Let others send you private messages</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.privacy.allowMessages}
                            onChange={(e) => setSettings({
                              ...settings,
                              privacy: { ...settings.privacy, allowMessages: e.target.checked }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div>
                          <h3 className="font-medium">Show Activity</h3>
                          <p className="text-sm text-gray-400">Display your recent activity on your profile</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.privacy.showActivity}
                            onChange={(e) => setSettings({
                              ...settings,
                              privacy: { ...settings.privacy, showActivity: e.target.checked }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'language' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Interface Language</h2>
                    <select
                      value={settings.language.interface}
                      onChange={(e) => setSettings({
                        ...settings,
                        language: { ...settings.language, interface: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Timezone</h2>
                    <select
                      value={settings.language.timezone}
                      onChange={(e) => setSettings({
                        ...settings,
                        language: { ...settings.language, timezone: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="UTC-12">UTC-12</option>
                      <option value="UTC-8">UTC-8</option>
                      <option value="UTC-5">UTC-5</option>
                      <option value="UTC+0">UTC+0</option>
                      <option value="UTC+1">UTC+1</option>
                      <option value="UTC+8">UTC+8</option>
                      <option value="UTC+12">UTC+12</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Two-Factor Authentication</h2>
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h3 className="font-medium">Enable 2FA</h3>
                        <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.security.twoFactor}
                          onChange={(e) => setSettings({
                            ...settings,
                            security: { ...settings.security, twoFactor: e.target.checked }
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Login Notifications</h2>
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-400">Get notified when someone logs into your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.security.loginNotifications}
                          onChange={(e) => setSettings({
                            ...settings,
                            security: { ...settings.security, loginNotifications: e.target.checked }
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Active Sessions</h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <DevicePhoneMobileIcon className="h-5 w-5 text-purple-400 mr-3" />
                            <div>
                              <h3 className="font-medium">iPhone 12 Pro</h3>
                              <p className="text-sm text-gray-400">Last active: 2 minutes ago</p>
                            </div>
                          </div>
                          <button className="text-red-400 hover:text-red-300">Sign Out</button>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <DevicePhoneMobileIcon className="h-5 w-5 text-purple-400 mr-3" />
                            <div>
                              <h3 className="font-medium">MacBook Pro</h3>
                              <p className="text-sm text-gray-400">Last active: 1 hour ago</p>
                            </div>
                          </div>
                          <button className="text-red-400 hover:text-red-300">Sign Out</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SettingsPage }; 