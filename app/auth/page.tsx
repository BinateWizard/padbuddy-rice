'use client';

import { signInWithGoogle } from '@/lib/auth';
import { Sprout } from 'lucide-react';

export default function AuthPage() {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Main Container */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Left Side - 2/3 (Branding & Description) */}
        <div className="w-2/3 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 p-12 flex flex-col justify-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Logo & Title */}
            <div className="flex items-center gap-3 mb-6">
              <Sprout className="w-10 h-10" />
              <h1 className="text-4xl font-bold">PadBuddy</h1>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl font-bold mb-6 leading-tight">
              Solar-Powered Rice Monitoring & Scheduler
            </h2>

            {/* Description */}
            <div className="space-y-4 text-green-50">
              <p className="text-lg">
                Monitor your rice paddies in real-time with our IoT-enabled platform. Get instant alerts, track crop health, and optimize irrigation schedules—all powered by renewable solar energy.
              </p>
              <div className="space-y-3 text-base">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">☀️</span>
                  <span>Sustainable energy with solar-powered IoT sensors</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <span>Real-time monitoring and analytics dashboard</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💧</span>
                  <span>Smart irrigation scheduling for better yields</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - 1/3 (Sign In) */}
        <div className="w-1/3 bg-white p-12 flex flex-col justify-center">
          <div>
            {/* Heading */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h3>
            <p className="text-gray-600 mb-8">
              Sign in to manage your rice fields
            </p>

            {/* Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-white border-2 border-gray-300 hover:border-green-500 rounded-lg py-3 px-4 flex items-center justify-center gap-3 font-semibold text-gray-800 hover:text-green-600 transition-all duration-200 hover:shadow-lg mb-6"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>

            {/* Info Text */}
            <p className="text-xs text-gray-500 text-center">
              We never access your data without permission
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
