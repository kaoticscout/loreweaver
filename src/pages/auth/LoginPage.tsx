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
    <div className="min-h-screen bg-[#1B0A20] flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white hover:text-purple-300 transition-colors">
              <MapIcon className="h-6 w-6" />
              <span>Loreweaver</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 mt-2">
              Sign in to continue your journey in world building
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-[#2D1B36] rounded-lg shadow-xl p-6 border border-purple-500/20">
            <LoginForm onSuccess={handleLoginSuccess} />
          </div>

          {/* Additional Links */}
          <div className="text-center space-y-3">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium">
                Sign up
              </Link>
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 