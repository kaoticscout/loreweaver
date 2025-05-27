import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { LoginForm } from '../../components/auth/LoginForm';
import { MapIcon } from '@heroicons/react/24/outline';

export function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleLoginSuccess = () => {
    // Navigate to the page they tried to visit before being redirected to login
    navigate(from, { replace: true });
  };

  return (
    <div 
      className="h-screen overflow-hidden bg-cover bg-center bg-no-repeat relative flex flex-col"
      style={{ 
        backgroundImage: 'url(/assets/wallpaper.jpg)',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Header */}
      <div className="relative z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white hover:text-purple-300 transition-colors">
              <MapIcon className="h-6 w-6" />
              <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Loreweaver</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full space-y-8">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Welcome Back</h1>
            <p className="text-xl text-gray-100 mt-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Sign in to continue your journey in world building
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-[#2D1B36]/95 backdrop-blur-md rounded-lg shadow-2xl p-8 border border-purple-500/30 ring-1 ring-purple-500/20">
            <LoginForm onSuccess={handleLoginSuccess} />
          </div>

          {/* Additional Links */}
          <div className="text-center space-y-3">
            <p className="text-gray-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-300 hover:text-purple-200 font-medium">
                Sign up
              </Link>
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link to="/privacy" className="text-gray-100 hover:text-white transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-100 hover:text-white transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 