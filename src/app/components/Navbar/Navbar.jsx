"use client"; // 1. Necessary directive for using hooks (usePathname, useSession) in Next.js

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 2. Router for redirection after logout
import { usePathname } from 'next/navigation'; // 3. Importing usePathname to track current URL
import { authClient } from '../../../lib/auth-client'; // 4. Import better-auth client to check session and logout

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // 5. Get the current active route/path

  // State to control mobile menu open/close toggle
  const [isOpen, setIsOpen] = useState(false);

  // 6. Fetch current user session using better-auth hook
  const { data: session, isPending } = authClient.useSession();

  // 7. Helper function to check if the link is active
  const isActive = (path) => pathname === path;

  // 8. Tailwind classes for active and inactive states
  const activeClass = "text-orange-600 font-medium border-b-2 border-orange-600 pb-1";
  const inactiveClass = "text-gray-600 hover:text-gray-900 transition-colors";

  // 9. Handle user logout action
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in'); // Redirect to login page after successful logout
        },
      },
    });
  };

  return (
    // 10. Main navigation container styled with Tailwind CSS
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo & Brand Section */}
          <div className="flex flex-col">
            <Link href="/" className="text-2xl font-bold text-gray-900">Tiles Bazar</Link>
            <span className="text-xs text-gray-500">Inspire. Design. Live.</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className={isActive('/') ? activeClass : inactiveClass}>
              Home
            </Link>
            <Link href="/all-tiles" className={isActive('/all-tiles') ? activeClass : inactiveClass}>
              All Tiles
            </Link>
            <Link href="/my-profile" className={isActive('/my-profile') ? activeClass : inactiveClass}>
              My Profile
            </Link>
          </div>

          {/* Action Buttons & User Profile Dropdown Section & Mobile Hamburger */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* User Session Handling */}
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : session ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-gray-50 transition-colors">
                  <img 
                    src={session.user.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                    alt="my-profile" 
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  />
                  <span className="font-semibold text-gray-800 text-sm hidden sm:inline">{session.user.name}</span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow-lg bg-white border border-gray-100 rounded-box w-52 mt-2">
                  <li>
                    <Link href="/my-profile" className="text-gray-700 hover:text-orange-600 font-medium">Profile</Link>
                  </li>
                  <li className="mt-1">
                    <button 
                      onClick={handleLogout} 
                      className="text-red-600 hover:bg-red-50 font-medium w-full text-left"
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link 
                  href="/sign-in" 
                  className="btn bg-orange-700 hover:bg-orange-800 text-white border-none rounded-md px-4 py-2"
                >
                  Log in
                </Link>
                <Link 
                  href="/sign-up" 
                  className="btn bg-gray-100 hover:bg-gray-200 text-gray-800 border-none rounded-md px-4 py-2"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Hamburger Menu Button for Mobile View */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                // Close Icon (X)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                // Hamburger Icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3 shadow-md">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className={`block py-2 px-3 rounded-md font-medium ${isActive('/') ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Home
          </Link>
          <Link 
            href="/all-tiles" 
            onClick={() => setIsOpen(false)}
            className={`block py-2 px-3 rounded-md font-medium ${isActive('/all-tiles') ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            All Tiles
          </Link>
          <Link 
            href="/my-profile" 
            onClick={() => setIsOpen(false)}
            className={`block py-2 px-3 rounded-md font-medium ${isActive('/my-profile') ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            My Profile
          </Link>

          {/* Show Login/Register buttons inside mobile menu if user is not logged in */}
          {!session && !isPending && (
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <Link 
                href="/sign-in" 
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-md bg-orange-700 text-white font-semibold"
              >
                Log in
              </Link>
              <Link 
                href="/sign-up" 
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-md bg-gray-100 text-gray-800 font-semibold"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;