"use client"; 
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { authClient } from '@/lib/auth-client'; 
import SearchBanner from "@/app/components/SearchBanner"; 
import Footer from '@/app/components/Footer/Footer';  
import Loader from '@/app/components/Loader';

const AllTilesPage = () => {
  const router = useRouter();
  const [tiles, setTiles] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(true); 

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

  const handleViewDetails = (e, tileId) => {
    e.preventDefault();
    if (session) {
      // If user is logged in, redirect to specific tile detail page
      router.push(`/tiles/${tileId}`);
    } else {
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
                <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-5 flex flex-col grow">
                  <h3 className="text-lg font-bold truncate">{tile.title}</h3>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 grow">{tile.description}</p>

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