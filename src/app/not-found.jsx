import React from 'react';
import Link from 'next/link';
import Footer from './components/Footer/Footer'; 

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 404 Main Section with Background Image */}
      <div 
        className="grow flex items-center justify-center bg-cover bg-center px-4"
        style={{ backgroundImage: `url('/images/404-bg.webp')` }}
      >
        <div className="text-center max-w-lg mx-auto p-8">
          <h1 className="text-8xl md:text-9xl font-extrabold text-gray-900 tracking-wider drop-shadow-md">
            404
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-orange-700 mt-4 mb-8 drop-shadow">
            Oops! Lost your aesthetic?
          </p>
          <Link 
            href="/" 
            className="inline-block bg-orange-700 hover:bg-orange-800 text-white font-medium px-8 py-3 rounded-md shadow-lg transition duration-300"
          >
            Go Back Home
          </Link>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}