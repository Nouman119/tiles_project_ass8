"use client"; // Required for client-side interactivity and hooks in Next.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Next.js router for redirection
import { authClient } from '../../lib/auth-client'; // Import better-auth client with relative path
import Footer from '@app/components/Footer'; // Import existing Footer component
import { User, Image as ImageIcon, X, UserCircle } from 'lucide-react'; // Import UserCircle for avatar fallback
import toast from 'react-hot-toast'; // [লাইন ৭]: Import react-hot-toast for toast notifications

export default function ProfilePage() {
  const router = useRouter();

  // 1. Fetch current session and loading state using better-auth client hook
  const { data: session, isPending } = authClient.useSession();

  // State to control the DaisyUI update profile modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // States to handle input fields inside the update modal
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  // Loading state for update submission process
  const [updating, setUpdating] = useState(false);

  // 2. Handle redirection safely inside useEffect instead of during render phase
  useEffect(() => {
    if (!isPending && !session) {
      router.push('/sign-in?redirect=/my-profile');
    }
  }, [session, isPending, router]);

  // Update local states when session data is loaded
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImageUrl(session.user.image || "");
    }
  }, [session]);

  // 3. If session is loading or user is not logged in, show a loading placeholder while useEffect redirects
  if (isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 font-medium">Loading profile...</p>
      </div>
    );
  }

  // Assign user data from active session
  const user = {
    name: name || session.user.name,
    email: session.user.email,
    image: imageUrl || session.user.image || null
  };

  // 4. Handle profile update form submission (Connected with Better-Auth to save data permanently in Database)
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      // Better-auth updateUser method to save name and image to the database permanently
      const { data, error } = await authClient.updateUser({
        name: name,
        image: imageUrl,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile.");
        setUpdating(false);
        return;
      }

      toast.success("Profile updated successfully!");
      setIsModalOpen(false); // Close modal after submission
      
      // Reload the page to fetch the fresh session and database data immediately
      window.location.reload(); 

    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
      setUpdating(false);
    }
  };

  return (
    // Main container structured with flex-col and justify-between to keep card centered and push footer to the bottom
    <div className="min-h-screen flex flex-col justify-between bg-cover bg-center" 
         style={{ backgroundImage: "url('/images/sign in.webp')" }}>
      
      {/* Empty div acting as a spacer to perfectly center the profile card vertically */}
      <div></div>

      {/* Profile Card Container matching sign-in/sign-up card styling */}
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl relative mx-auto my-8 text-center">
        
        {/* Close Button / Home Redirect */}
        <Link href="/" className="absolute top-4 right-4 text-gray-500 hover:text-orange-700 text-lg">✕</Link>

        {/* Profile Avatar / Image Section */}
        <div className="flex justify-center mb-4 mt-2">
          {user.image ? (
            <img 
              src={user.image} 
              alt={user.name || 'my-profile'} 
              className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-orange-100" 
            />
          ) : (
            // Fallback avatar icon if no image URL is provided
            <div className="w-20 h-20 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-700 shadow-md">
              <UserCircle size={48} strokeWidth={1.5} />
            </div>
          )}
        </div>

        {/* Profile Name & Email Display */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {user.name || 'Profile Name'}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {user.email || 'admin@gmail.com'}
        </p>

        {/* Update Profile Button triggering the DaisyUI modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-block w-full bg-orange-700 hover:bg-orange-800 text-white px-6 py-3 rounded-md transition duration-300 font-semibold shadow-sm text-center cursor-pointer"
        >
          Update Information
        </button>
      </div>

      {/* ================= DaisyUI Update Profile Modal ================= */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-white relative max-w-md p-8 rounded-2xl shadow-2xl">
            
            {/* Modal Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="w-14 h-14 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center text-orange-700 shadow-sm mb-3">
                <User size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-left">Update User</h3>
            </div>

            {/* Profile Update Form */}
            <form onSubmit={handleUpdateSubmit} className="space-y-4 text-left">
              
              {/* Name Input Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-800"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Profile Image URL Input Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input 
                  type="url" 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-800"
                  placeholder="Paste image URL here"
                />
              </div>

              {/* Action Buttons inside Modal */}
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={updating}
                  className="px-6 py-2 rounded-md bg-orange-700 hover:bg-orange-800 text-white font-semibold transition-colors shadow-sm disabled:opacity-50"
                >
                  {updating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Render the pre-existing Footer component at the bottom */}
      <Footer />
      
    </div>
  );
}