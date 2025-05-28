import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapIcon, BookOpenIcon, GlobeAltIcon, CubeIcon, ArrowsPointingInIcon, ClipboardDocumentListIcon, UserGroupIcon, ChevronDownIcon, ArrowRightOnRectangleIcon, BoltIcon, WrenchScrewdriverIcon, ChevronRightIcon, UserPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { UserProfile } from './UserProfile';
import { useWorld } from '../contexts/WorldContext';
import { useAuth } from '../contexts/AuthContext';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { InvitePlayerDialog } from './InvitePlayerDialog';
import { WorldsAPI } from '../api/worlds';

const utilityCategories = {
  "Character Tools": [
    { path: "/utilities/name-generator", label: "Name Generator" }
  ],
  "Combat Tools": [
    { path: "/utilities/encounter-builder", label: "Encounter Builder" },
    { path: "/utilities/dice-roller", label: "Dice Roller" },
    { path: "/utilities/battle-map-generator", label: "Battle Map Generator" }
  ],
  "Location Tools": [
    { path: "/utilities/map-generator", label: "Map Generator" },
    { path: "/utilities/dungeon-generator", label: "Dungeon Generator" },
    { path: "/utilities/tavern-generator", label: "Tavern Generator" },
    { path: "/utilities/merchant-generator", label: "Merchant Generator" }
  ],
  "World Building": [
    { path: "/utilities/faction-generator", label: "Faction Generator" },
    { path: "/utilities/religion-generator", label: "Religion Generator" },
    { path: "/utilities/language-generator", label: "Language Generator" },
    { path: "/utilities/magic-system-generator", label: "Magic System Generator" },
    { path: "/utilities/pantheon-generator", label: "Pantheon Generator" },
    { path: "/utilities/currency-generator", label: "Currency Generator" },
    { path: "/utilities/calendar-generator", label: "Calendar Generator" }
  ],
  "Story Tools": [
    { path: "/utilities/plot-hooks", label: "Plot Hook Generator" },
    { path: "/utilities/timeline", label: "Timeline Generator" },
    { path: "/utilities/prophecy-generator", label: "Prophecy Generator" }
  ],
  "Loot Tools": [
    { path: "/utilities/loot-generator", label: "Loot Generator" },
    { path: "/utilities/treasure-hoard-generator", label: "Treasure Hoard Generator" }
  ],
  "Environment": [
    { path: "/utilities/weather-generator", label: "Weather Generator" }
  ]
};

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedWorld, setSelectedWorld, isWorldSelected } = useWorld();
  const { user } = useAuth();
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const isActive = (path: string) => location.pathname === path;

  const protectedPaths = ['/world', '/quests', '/npcs', '/items', '/enemies', '/campaign'];
  const isProtectedPath = protectedPaths.some(path => location.pathname.startsWith(path));

  const handleSwitchWorld = () => {
    setSelectedWorld(null);
    navigate('/');
  };

  const handleInvitePlayer = async (email: string, role: 'viewer' | 'editor') => {
    if (!selectedWorld) return;
    
    try {
      await WorldsAPI.invitePlayer(selectedWorld.id, email, role);
      setNotification({
        type: 'success',
        message: `Invitation sent to ${email}`
      });
      setTimeout(() => setNotification(null), 5000); // Clear after 5 seconds
    } catch (error) {
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send invitation'
      });
      setTimeout(() => setNotification(null), 5000); // Clear after 5 seconds
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#2A1B3D] border-b border-white/10">
      {/* Notification */}
      {notification && (
        <div
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-b-lg shadow-lg flex items-center gap-2 z-[60] ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          <span className="text-white text-sm">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* App Logo - Left Side */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold hover:text-purple-300 transition-colors">
          <MapIcon className="h-6 w-6" />
          <span>Loreweaver</span>
        </Link>

        {/* Navigation and User Profile - Right Side */}
        <div className="flex items-center gap-6">
          {/* Utilities Dropdown - Always show */}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all">
              <WrenchScrewdriverIcon className="h-5 w-5" />
              <span>Utilities</span>
              <ChevronDownIcon className="h-4 w-4" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 mt-2 w-72 origin-top-left rounded-lg bg-[#2D1B36] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {Object.entries(utilityCategories).map(([category, items]) => (
                    <div key={category} className="group relative">
                      <div className="px-4 py-2 text-sm font-semibold text-gray-400 hover:bg-white/10 cursor-pointer">
                        {category}
                        <ChevronRightIcon className="h-4 w-4 absolute right-2 top-3" />
                      </div>
                      <div className="hidden group-hover:block absolute left-full top-0 w-64 rounded-lg bg-[#2D1B36] shadow-lg ring-1 ring-black ring-opacity-5">
                        {items.map((item) => (
                          <Menu.Item key={item.path}>
                            {({ active }) => (
                              <Link
                                to={item.path}
                                className={`${
                                  active ? 'bg-white/10' : ''
                                } text-gray-300 block px-4 py-2 text-sm hover:bg-white/10`}
                              >
                                {item.label}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* World Selector - Only show when logged in and on protected paths */}
          {user && isProtectedPath && (
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                <BookOpenIcon className="h-5 w-5" />
                <span>{selectedWorld?.name || 'Select World'}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-[#2A1B3D] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-white/10">
                  <div className="py-1">
                    {selectedWorld && (
                      <div className="px-4 py-2 border-b border-gray-700/50">
                        <p className="text-sm font-medium text-white">{selectedWorld.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{selectedWorld.theme}</p>
                      </div>
                    )}
                    {selectedWorld && (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setShowInviteDialog(true)}
                            className={`${
                              active ? 'bg-white/10' : ''
                            } text-gray-300 group flex items-center gap-2 w-full px-4 py-2 text-sm`}
                          >
                            <UserPlusIcon className="h-5 w-5" />
                            Invite Player
                          </button>
                        )}
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleSwitchWorld}
                          className={`${
                            active ? 'bg-white/10' : ''
                          } text-gray-300 group flex items-center gap-2 w-full px-4 py-2 text-sm`}
                        >
                          <ArrowRightOnRectangleIcon className="h-5 w-5" />
                          Switch World
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}

          {/* Navigation Links - Only show when logged in and world is selected */}
          {user && isWorldSelected && (
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/world"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive('/world') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'
                } transition-all`}
              >
                <GlobeAltIcon className="h-5 w-5" />
                Explore
              </Link>
              <Link
                to="/campaign"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive('/campaign') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'
                } transition-all`}
              >
                <BookOpenIcon className="h-5 w-5" />
                Campaign
              </Link>
              <Link
                to="/quests"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive('/quests') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'
                } transition-all`}
              >
                <ClipboardDocumentListIcon className="h-5 w-5" />
                Quests
              </Link>
              <Link
                to="/npcs"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive('/npcs') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'
                } transition-all`}
              >
                <UserGroupIcon className="h-5 w-5" />
                NPCs
              </Link>
              <Link
                to="/enemies"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive('/enemies') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'
                } transition-all`}
              >
                <ArrowsPointingInIcon className="h-5 w-5" />
                Enemies
              </Link>
              <Link
                to="/items"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive('/items') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'
                } transition-all`}
              >
                <CubeIcon className="h-5 w-5" />
                Items
              </Link>
            </nav>
          )}

          <div className="ml-4">
            <UserProfile />
          </div>
        </div>
      </div>

      {/* Invite Player Dialog */}
      <InvitePlayerDialog
        isOpen={showInviteDialog}
        onClose={() => setShowInviteDialog(false)}
        onInvite={handleInvitePlayer}
      />
    </header>
  );
} 