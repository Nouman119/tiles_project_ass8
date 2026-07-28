"use client"; // Marks this as a Client Component for state and interaction
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { authClient } from '../../lib/auth-client'; 
import SearchBanner from "../components/SearchBanner"; 
import Footer from "../components/Footer/Footer"; 
import Loader from '../components/Loader';

const AllTilesPage = () => {
  const router = useRouter();
  const [tiles, setTiles] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(true); 

  // 3. Fetch current user session to check authentication status
  const { data: session } = authClient.useSession();

  useEffect(() => {
    fetch('/api/tiles')
      .then((res) => res.json())
      .then((data) => {
        setTiles(data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching all tiles:", err);
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
      router.push(`/sign-in?redirect=/tiles/${tileId}`);
    }
  };

  const filteredTiles = tiles.filter((tile) =>
    tile.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">

      <SearchBanner onSearch={(val) => setSearchTerm(val)} />

      <section className="grow max-w-7xl mx-auto px-4 mt-12 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">All Available Tiles</h2>

        {loading ? (
          <Loader />
        ) : filteredTiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTiles.map((tile) => (
              <div
                key={tile.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                {/* 5. 'h-64' fixed height combined with 'w-full' keeps image box consistent. */}
                {/* 6. 'relative' allows the absolute image to stay contained within these bounds. */}
                <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* 7. 'flex-grow' ensures all cards stretch to the same height in a grid row. */}
                <div className="p-5 flex flex-col grow">
                  {/* 8. 'truncate' keeps long titles from breaking the card width. */}
                  <h3 className="text-lg font-bold truncate">{tile.title}</h3>

                  {/* 9. 'line-clamp-2' caps the text length so every card body looks uniform. */}
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 grow">{tile.description}</p>

                  {/* 10. 'mt-auto' pushes the button to the bottom of the card body always. */}
                  {/* 11. Attached onClick handler to check login state before routing */}
                  <div onClick={(e) => handleViewDetails(e, tile.id)} className="mt-auto cursor-pointer">
                    <button className="w-full border border-orange-200 py-2 text-orange-700 hover:bg-orange-600 hover:text-white transition rounded">
                      View Details &gt;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No tiles found matching your search.</p>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default AllTilesPage;