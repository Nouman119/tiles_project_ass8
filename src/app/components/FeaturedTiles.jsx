"use client"; // Required for client-side data fetching and authentication hooks
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 1. Import useRouter for programmatic redirection
import { authClient } from '../../lib/auth-client'; // 2. Import better-auth client to check session status
import Loader from './Loader'; 

const FeaturedTiles = () => {
  const router = useRouter();
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true); 

  // 3. Fetch current user session to check authentication status
  const { data: session } = authClient.useSession();

  // Fetch data from local json-server
  useEffect(() => {
    setLoading(true);
    fetch('/api/tiles')
      .then((res) => res.json())
      .then((data) => {
        setTiles(data);
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false); 
      });
  }, []);

  // 4. Handle View Details click with authentication check
  const handleViewDetails = (e, tileId) => {
    e.preventDefault();
    if (session) {
      // If user is logged in, redirect to specific tile detail page
      router.push(`/tiles/${tileId}`);
    } else {
      // If user is not logged in, redirect to login page
      router.push('/sign-in');
    }
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Title Section */}
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">— Our Picks —</p>
        <h2 className="text-4xl font-bold mt-2">Featured Tiles</h2>
        <p className="text-gray-600 mt-2">Handpicked designs loved by our community</p>
      </div>

      {loading ? (
        <Loader />
      ) : (
        /* Responsive Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiles.slice(0, 4).map((tile) => (
            <div key={tile.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full">
              <img src={tile.image} alt={tile.title} className="w-full h-60 object-cover" />
              <div className="p-5 flex flex-col grow">
                <h3 className="text-lg font-semibold">{tile.title}</h3>
                <p className="text-gray-500 text-sm mb-4 grow">{tile.description}</p>
                
                {/* 5. Attached onClick handler to check login state before routing */}
                <div onClick={(e) => handleViewDetails(e, tile.id)} className="mt-auto cursor-pointer">
                  <span className="w-full text-center block border border-orange-200 py-2 text-orange-700 hover:bg-orange-50 transition rounded">
                    View Details &gt;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedTiles;