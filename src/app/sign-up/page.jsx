"use client"; // Required for client-side interactivity and hooks in Next.js

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Next.js router for redirection
import { authClient } from '@/lib/auth-client';
import Footer from '@/app/components/Footer';  // Import existing Footer component
import toast from 'react-hot-toast'; 

export default function SignUpPage() {
  const router = useRouter();

  // State management for form inputs and loading state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle email/password sign-up submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call better-auth sign up method
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image, // optional profile picture url
      }, {
        onSuccess: () => {
          toast.success('Account created successfully!');
          // Redirect to profile page after successful registration
          router.push('/my-profile');
        },
        onError: (ctx) => {
          const message = ctx.error.message || 'Something went wrong during sign up.';
          toast.error(message);
          setLoading(false);
        }
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    // Main container structured with flex-col and justify-between to keep card centered and push footer to the bottom
    <div className="min-h-screen flex flex-col justify-between bg-cover bg-center" 
         style={{ backgroundImage: "url('./images/sign in.webp')" }}>
      
      {/* Empty div acting as a spacer to perfectly center the sign-up card vertically */}
      <div></div>

      {/* Sign Up Card with shadow, rounded corners, and proper spacing */}
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl relative mx-auto my-8">
        
        {/* Close Button */}
        <Link href="/" className="absolute top-4 right-4 text-gray-500 hover:text-orange-700">✕</Link>

        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create an account</h2>
          <p className="text-sm text-gray-600">
            Already have an account? <Link href="/sign-in" className="text-orange-700 font-semibold">Log in</Link>
          </p>
        </div>


        {/* Form Fields matching the requested UI elements with state bindings */}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              placeholder="Your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Email address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Photo-url</label>
            <input 
              type="url" 
              placeholder="https://example.com/photo.jpg" 
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 outline-none" 
            />
            <p className="text-xs text-gray-500 mt-1">Use 8 or more characters with a mix of letters, numbers & symbols</p>
          </div>

          {/* Terms and conditions text */}
          <div className="text-xs text-gray-600 mt-2">
            By creating an account, you agree to our <Link href="/terms" className="text-orange-700 underline">Terms of use</Link> and <Link href="/privacy" className="text-orange-700 underline">Privacy Policy</Link>.
          </div>

          {/* Submit Button using Project Color Theme matching Login Page */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-700 hover:bg-orange-800 text-white px-8 py-3 rounded-md transition duration-300 font-semibold mt-4 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create an account'}
          </button>
        </form>
      </div>

      {/* Render the pre-existing Footer component at the bottom */}
      <Footer />
      
    </div>
  );
}