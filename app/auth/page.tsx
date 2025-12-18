'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { signInWithGoogle } from '@/lib/auth';
import { Sprout } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'signin' | 'register' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Redirect if already signed in
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) router.replace('/');
    });
    return () => unsub();
  }, [router]);

  // Validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (pwd: string) => {
    // At least 8 chars, one uppercase, one lowercase, one number
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd);
  };

  // Email/password authentication
  const handleEmailAuth = async () => {
    if (isLoading) return;

    // Validate inputs
    if (!email || !isValidEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }
    if (!password || password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    if (!isValidPassword(password)) {
      alert('Password needs 8+ chars with upper, lower, and a number');
      return;
    }
    if (mode === 'register' && (!firstName || !lastName)) {
      alert('Please enter your first and last name');
      return;
    }
    if (mode === 'register' && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'signin') {
        await signInWithEmailAndPassword(auth, email, password);
      } else if (mode === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          const displayName = `${firstName} ${lastName}`.trim();
          await updateProfile(userCredential.user, { displayName });
        }
        // Optionally: create Firestore user document here
      }
      router.push('/');
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password
  const handleForgotPassword = async () => {
    if (!email) return alert('Please enter your email first');
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent');
    } catch (error: any) {
      console.error(error);
      alert('Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  // Google sign-in
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      router.push('/');
    } catch (error: any) {
      console.error(error);
      alert('Google sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[80vh] min-h-[640px] bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        
        {/* Left side - Branding */}
        <div className="w-2/3 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 p-12 flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Sprout className="w-10 h-10" />
              <h1 className="text-4xl font-bold">PadBuddy</h1>
            </div>
            <h2 className="text-3xl font-bold mb-6 leading-tight">
              Solar-Powered Rice Monitoring & Scheduler
            </h2>
            <div className="space-y-4 text-green-50">
              <p className="text-lg">
                Monitor your rice paddies in real-time with our IoT-enabled platform. Get instant alerts, track crop health, and optimize irrigation schedules—all powered by renewable solar energy.
              </p>
              <div className="space-y-3 text-base">
                <div className="flex items-start gap-3"><span className="text-2xl">☀️</span><span>Sustainable energy with solar-powered IoT sensors</span></div>
                <div className="flex items-start gap-3"><span className="text-2xl">📊</span><span>Real-time monitoring and analytics dashboard</span></div>
                <div className="flex items-start gap-3"><span className="text-2xl">💧</span><span>Smart irrigation scheduling for better yields</span></div>
              </div>
            </div>
          </div>
        </div>

          {/* Right side - Authentication */}
          <div className="w-1/3 bg-white p-12 flex flex-col justify-center text-gray-900">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
    {mode === 'signin' ? 'Sign In' : mode === 'register' ? 'Register' : 'Forgot Password'}
  </h3>
  {mode === 'signin' && <p className="text-gray-600 mb-6">Sign in to manage your rice fields</p>}
  {mode === 'register' && <p className="text-gray-600 mb-6">Create your account to get started</p>}
  {mode === 'forgot' && <p className="text-gray-600 mb-6">Enter your email to reset password</p>}

  <div className="flex flex-col gap-3">
    {mode === 'register' && (
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          className="w-1/2 border rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-500"
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          className="w-1/2 border rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-500"
        />
      </div>
    )}
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      className="w-full border rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-500"
    />
    {mode !== 'forgot' && (
      <>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-500"
        />
        {mode === 'register' && (
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-500"
          />
        )}
        {mode === 'signin' && (
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700"
              onClick={() => setMode('forgot')}
            >
              Forgot password?
            </button>
          </div>
        )}
      </>
    )}

    {mode === 'forgot' ? (
      <button
        onClick={handleForgotPassword}
        disabled={isLoading}
        className="w-full bg-yellow-500 text-white py-2 rounded-lg disabled:opacity-50"
      >
        Send Reset Email
      </button>
    ) : (
      <button
        onClick={handleEmailAuth}
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
      >
        {mode === 'register' ? 'Register' : 'Sign In'}
      </button>
    )}
  </div>

  {/* Google Sign-In */}
  <hr className="my-4" />
  <button
    onClick={handleGoogleSignIn}
    disabled={isLoading}
    className="w-full bg-white text-gray-800 border-2 border-gray-300 rounded-lg py-2 mb-3 flex justify-center items-center gap-2 hover:border-green-500 hover:text-green-600 disabled:opacity-50"
  >
    Sign in with Google
  </button>

  <p className="text-center text-sm mt-2">
    {mode === 'register' ? (
      <>
        Already have an account?{' '}
        <span className="text-blue-600 cursor-pointer" onClick={() => setMode('signin')}>Sign In</span>
      </>
    ) : mode === 'forgot' ? (
      <span className="text-blue-600 cursor-pointer" onClick={() => setMode('signin')}>Back to Sign In</span>
    ) : (
      <>
        Don't have an account?{' '}
        <span className="text-blue-600 cursor-pointer" onClick={() => setMode('register')}>Register</span>
      </>
    )}
  </p>
</div>

      </div>
    </div>
  );
}
