"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/app/components/Loader';
import Footer from '@/app/components/Footer/Footer';  

export default function TileDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true);
    fetch(`/api/tiles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTile(data);
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching tile details:", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="max-w-6xl mx-auto px-4 py-16 w-full">
        <button onClick={() => router.back()} className="text-gray-600 mb-8 hover:underline">
          ← Back to Gallery
        </button>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader />
          </div>
        ) : !tile ? (
          <p className="text-center p-20 text-gray-500">Tile not found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="w-full aspect-square rounded-3xl p-6 bg-white shadow-sm flex items-center justify-center overflow-hidden">
              <img 
                src={tile.image} 
                alt={tile.title} 
                className="w-full h-full object-cover rounded-xl" 
              />
            </div>

            {/* Right Details Column */}
            <div className="flex flex-col">
              <p className="text-teal-600 text-sm font-bold tracking-widest uppercase">TILE • NO. {tile.id}</p>
              <h1 className="text-5xl font-bold mt-2">{tile.title}</h1>
              <p className="text-gray-500 mt-1">by {tile.designer || "Designer Name"}</p>
              
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="font-bold text-lg">STYLE</h3>
                <p className="text-gray-600 mt-4 leading-relaxed">{tile.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-8">
                {['Minimalist', 'Blue', 'Geometric', 'Hand-glazed', 'Mediterranean'].map(tag => (
                  <span key={tag} className="bg-gray-100 px-4 py-1.5 rounded-full text-sm font-medium text-gray-700">{tag}</span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-8 mt-10 border-t pt-8">
                <div><p className="text-gray-400 text-sm">Material</p><p className="font-bold mt-1">Glazed ceramic</p></div>
                <div><p className="text-gray-400 text-sm">Dimensions</p><p className="font-bold mt-1">200 x 200 mm</p></div>
                <div><p className="text-gray-400 text-sm">Finish</p><p className="font-bold mt-1">Matte</p></div>
                <div><p className="text-gray-400 text-sm">Collection</p><p className="font-bold mt-1">Coastal · 2026</p></div>
              </div>

              <div className="flex gap-4 mt-10">
                <button className="bg-orange-600 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition">Request a Sample</button>
                <button onClick={() => router.back()} className="border border-gray-300 px-8 py-3 rounded-full hover:bg-gray-50 transition">Back to Gallery</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}