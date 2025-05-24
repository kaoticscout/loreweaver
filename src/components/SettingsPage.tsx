import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BellIcon, KeyIcon, GlobeAltIcon, ShieldCheckIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export function SettingsPage() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1B0A20]">
        <div className="text-[#fcedbe] text-center">
          <p className="text-xl mb-4">Please sign in to access settings</p>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#B67C3C] to-[#fcedbe] text-[#2A1B3D] font-medium hover:opacity-90 transition-opacity">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1B0A20] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#fcedbe] mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Account Settings */}
          <div className="bg-[#2A1B3D] rounded-xl p-6 border border-[#B67C3C]/20">
            <h2 className="text-xl font-semibold text-[#fcedbe] mb-6">Account Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <KeyIcon className="h-5 w-5 text-[#B67C3C]" />
                  <div>
                    <p className="text-[#fcedbe]">Change Password</p>
                    <p className="text-sm text-[#B67C3C]">Last changed 30 days ago</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-[#B67C3C]/20 text-[#fcedbe] hover:bg-[#B67C3C]/30 transition-colors">
                  Change
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="h-5 w-5 text-[#B67C3C]" />
                  <div>
                    <p className="text-[#fcedbe]">Two-Factor Authentication</p>
                    <p className="text-sm text-[#B67C3C]">Add an extra layer of security</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-[#B67C3C]/20 text-[#fcedbe] hover:bg-[#B67C3C]/30 transition-colors">
                  Enable
                </button>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-[#2A1B3D] rounded-xl p-6 border border-[#B67C3C]/20">
            <h2 className="text-xl font-semibold text-[#fcedbe] mb-6">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? (
                    <MoonIcon className="h-5 w-5 text-[#B67C3C]" />
                  ) : (
                    <SunIcon className="h-5 w-5 text-[#B67C3C]" />
                  )}
                  <div>
                    <p className="text-[#fcedbe]">Dark Mode</p>
                    <p className="text-sm text-[#B67C3C]">Toggle dark/light theme</p>
                  </div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="px-4 py-2 rounded-lg bg-[#B67C3C]/20 text-[#fcedbe] hover:bg-[#B67C3C]/30 transition-colors"
                >
                  {darkMode ? 'Disable' : 'Enable'}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BellIcon className="h-5 w-5 text-[#B67C3C]" />
                  <div>
                    <p className="text-[#fcedbe]">Notifications</p>
                    <p className="text-sm text-[#B67C3C]">Manage notification preferences</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className="px-4 py-2 rounded-lg bg-[#B67C3C]/20 text-[#fcedbe] hover:bg-[#B67C3C]/30 transition-colors"
                >
                  {notifications ? 'Disable' : 'Enable'}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GlobeAltIcon className="h-5 w-5 text-[#B67C3C]" />
                  <div>
                    <p className="text-[#fcedbe]">Language</p>
                    <p className="text-sm text-[#B67C3C]">Choose your preferred language</p>
                  </div>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-[#1B0A20] text-[#fcedbe] border border-[#B67C3C]/30 focus:border-[#B67C3C] focus:outline-none"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="bg-[#2A1B3D] rounded-xl p-6 border border-[#B67C3C]/20">
            <h2 className="text-xl font-semibold text-[#fcedbe] mb-6">Data & Privacy</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="h-5 w-5 text-[#B67C3C]" />
                  <div>
                    <p className="text-[#fcedbe]">Export Data</p>
                    <p className="text-sm text-[#B67C3C]">Download all your data</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-[#B67C3C]/20 text-[#fcedbe] hover:bg-[#B67C3C]/30 transition-colors">
                  Export
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="h-5 w-5 text-[#B67C3C]" />
                  <div>
                    <p className="text-[#fcedbe]">Delete Account</p>
                    <p className="text-sm text-[#B67C3C]">Permanently delete your account and data</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 