"use client"; // Required for client-side interactivity and hooks in Next.js

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Next.js router for redirection
import { authClient } from '../../lib/auth-client'; // Import better-auth client with relative path
import Footer from '../components/Footer'; // Import existing Footer component
import toast from 'react-hot-toast'; // Import react-hot-toast for notifications

export default function SignInPage() {
  const router = useRouter();

  // State management for form inputs and loading state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle email/password sign-in submission
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      }, {
        onSuccess: () => {
          toast.success('Successfully logged in!');
          router.push('/');
        },
        onError: (ctx) => {
          const message = ctx.error.message || 'Invalid email or password.';
          toast.error(message);
          setLoading(false);
        }
      });

      if (error) {
        toast.error(error.message || 'Failed to sign in.');
        setLoading(false);
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
      setLoading(false);
    }
  };

  // Handle Google Social Sign In
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/?login=success", 
      });
    } catch (err) {
      toast.error('Google sign-in failed.');
    }
  };

  return (
    // Main container structured with flex-col and justify-between to keep card centered and push footer to the bottom
    <div className="min-h-screen flex flex-col justify-between bg-cover bg-center" 
         style={{ backgroundImage: "url('/images/sign in.webp')" }}>
      
      {/* Empty div acting as a spacer to perfectly center the sign-in card vertically */}
      <div></div>

      {/* Sign In Card with shadow, rounded corners, and proper spacing */}
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl relative mx-auto my-8">
        
        {/* Close Button / Home Redirect */}
        <Link href="/" className="absolute top-4 right-4 text-gray-500 hover:text-orange-700 text-lg">✕</Link>

        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-600">
            Don't have an account? <Link href="/sign-up" className="text-orange-700 font-semibold">Sign up</Link>
          </p>
        </div>

        {/* Google Sign-In Button */}
        <button 
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 px-4 text-gray-700 hover:bg-gray-50 transition duration-200 font-medium mb-4"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-400 text-xs uppercase">Or with email</span>
          <div className="grow border-t border-gray-300"></div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 outline-none text-gray-800" 
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm text-gray-700">Password</label>
              <Link href="/forgot-password" className="text-xs text-orange-700 hover:underline">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 outline-none text-gray-800" 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-700 hover:bg-orange-800 text-white px-8 py-3 rounded-md transition duration-300 font-semibold mt-4 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>

      {/* Render the pre-existing Footer component at the bottom */}
      <Footer />
      
    </div>
  );
}