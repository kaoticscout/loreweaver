import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { 
  UserCircleIcon, 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon, 
  UserIcon, 
  SparklesIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Mock notifications data - this would come from your backend in a real app
  const notifications = {
    worldComments: { unread: 5 },
    notifications: { unread: 8 }
  };

  // Calculate total notifications (excluding messages)
  const totalNotifications = notifications.worldComments.unread + notifications.notifications.unread;

  // Mock messages data - this would come from your backend in a real app
  const messages = {
    unread: 3
  };

  if (!user) {
    return (
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#fcedbe] hover:bg-[#B67C3C]/20 transition-all duration-200 border border-[#B67C3C]/30 hover:border-[#B67C3C]/50"
        onClick={() => navigate('/login')}
      >
        <UserCircleIcon className="h-5 w-5" />
        Sign In
      </button>
    );
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all">
        <div className="relative">
          <UserCircleIcon className="h-6 w-6" />
          {totalNotifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {totalNotifications}
            </span>
          )}
        </div>
        <span>{user.displayName || user.email}</span>
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-[#2D1B36] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => navigate('/profile')}
                  className={`${
                    active ? 'bg-white/10' : ''
                  } text-gray-300 group flex items-center gap-2 w-full px-4 py-2 text-sm`}
                >
                  <UserIcon className="h-5 w-5" />
                  Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => navigate('/settings')}
                  className={`${
                    active ? 'bg-white/10' : ''
                  } text-gray-300 group flex items-center gap-2 w-full px-4 py-2 text-sm`}
                >
                  <Cog6ToothIcon className="h-5 w-5" />
                  Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => navigate('/premium')}
                  className={`${
                    active ? 'bg-white/10' : ''
                  } text-gray-300 group flex items-center gap-2 w-full px-4 py-2 text-sm`}
                >
                  <SparklesIcon className="h-5 w-5" />
                  Premium
                </button>
              )}
            </Menu.Item>
            <div className="border-t border-gray-700/50 my-1"></div>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className={`${
                    active ? 'bg-white/10' : ''
                  } text-gray-300 group flex items-center gap-2 w-full px-4 py-2 text-sm`}
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 