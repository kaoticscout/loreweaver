import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { MapIcon } from '@heroicons/react/24/outline';

export function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleRegisterSuccess = () => {
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

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full space-y-8">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Get Started</h1>
            <p className="text-xl text-gray-100 mt-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Create your account with just an email
            </p>
          </div>

          {/* Register Form */}
          <div className="bg-[#2D1B36]/95 backdrop-blur-md rounded-lg shadow-2xl p-8 border border-purple-500/30 ring-1 ring-purple-500/20">
            <RegisterForm onSuccess={handleRegisterSuccess} />
          </div>

          {/* Additional Links */}
          <div className="text-center space-y-3">
            <p className="text-gray-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-300 hover:text-purple-200 font-medium">
                Sign in
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