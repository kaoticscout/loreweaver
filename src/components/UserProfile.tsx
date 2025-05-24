import { Fragment, useState } from 'react';
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
import { LoginModal } from './LoginModal';
import { useNavigate } from 'react-router-dom';

export function UserProfile() {
  const { user, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
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
      <>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#fcedbe] hover:bg-[#B67C3C]/20 transition-all duration-200 border border-[#B67C3C]/30 hover:border-[#B67C3C]/50"
          onClick={() => setIsLoginModalOpen(true)}
        >
          <UserCircleIcon className="h-5 w-5" />
          Sign In
        </button>
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      </>
    );
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-[#fcedbe] hover:bg-[#B67C3C]/20 transition-all duration-200 border border-[#B67C3C]/30 hover:border-[#B67C3C]/50 group">
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="h-8 w-8 rounded-full ring-2 ring-[#B67C3C]/50 group-hover:ring-[#B67C3C] transition-all duration-200"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#B67C3C] to-[#fcedbe] flex items-center justify-center ring-2 ring-[#B67C3C]/50 group-hover:ring-[#B67C3C] transition-all duration-200">
              <span className="text-sm font-bold text-[#2A1B3D]">{user.username.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full ring-2 ring-[#1B0A20]"></div>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-semibold">{user.username}</span>
          <span className="text-xs text-[#B67C3C] font-medium">Free Plan</span>
        </div>
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-[#1B0A20] py-2 shadow-xl ring-1 ring-[#B67C3C]/20 focus:outline-none border border-[#B67C3C]/20">
          <div className="px-4 py-2 border-b border-[#B67C3C]/20">
            <p className="text-sm text-[#fcedbe] font-medium">{user.email}</p>
            <p className="text-xs text-[#B67C3C]">Free Plan</p>
          </div>
          
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-[#B67C3C]/20' : ''
                } flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-[#fcedbe] transition-colors duration-200`}
                onClick={() => navigate('/profile')}
              >
                <div className="relative">
                  <UserIcon className="h-4 w-4" />
                  {totalNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {totalNotifications}
                    </span>
                  )}
                </div>
                Your Profile
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-[#B67C3C]/20' : ''
                } flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-[#fcedbe] transition-colors duration-200`}
                onClick={() => navigate('/messages')}
              >
                <div className="relative">
                  <EnvelopeIcon className="h-4 w-4" />
                  {messages.unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {messages.unread}
                    </span>
                  )}
                </div>
                Messages
              </button>
            )}
          </Menu.Item>
          
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-[#B67C3C]/20' : ''
                } flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-[#fcedbe] transition-colors duration-200`}
                onClick={() => navigate('/settings')}
              >
                <Cog6ToothIcon className="h-4 w-4" />
                Settings
              </button>
            )}
          </Menu.Item>

          <div className="px-4 py-2 border-t border-[#B67C3C]/20">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-[#B67C3C]/20' : ''
                  } flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-[#fcedbe] transition-colors duration-200`}
                  onClick={() => navigate('/premium')}
                >
                  <SparklesIcon className="h-4 w-4 text-yellow-400" />
                  <span className="flex items-center gap-2">
                    Upgrade to Premium
                    <span className="px-2 py-0.5 text-xs bg-yellow-400/20 text-yellow-400 rounded-full">PRO</span>
                  </span>
                </button>
              )}
            </Menu.Item>
          </div>

          <div className="px-4 py-2 border-t border-[#B67C3C]/20">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-[#B67C3C]/20' : ''
                  } flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-red-400 hover:text-red-300 transition-colors duration-200`}
                  onClick={() => logout()}
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 