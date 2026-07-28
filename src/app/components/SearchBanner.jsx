import React from 'react';
import { Search } from 'lucide-react';

const SearchBanner = ({ onSearch }) => {
  return (
    <section
      className="relative w-full h-72 md:h-100 flex flex-col items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/images/all_tiles_bg.webp')" }}
    >
      <div className="absolute inset-0 bg-black/65"></div>

      <div className="relative z-10 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">Tile Dream Gallery</h1>
        <p className="text-sm md:text-base text-gray-200 mb-8">Store UI Tiles / Tile Gallery!!!</p>

        <div className="form-control w-full max-w-2xl">
          <div className="input-group flex bg-white rounded-full p-1 overflow-hidden">
            <input
              type="text"
              placeholder="Search tiles"
              onChange={(e) => onSearch(e.target.value)} 
              className="w-full h-full bg-transparent text-gray-800 text-lg px-6 outline-none text-left placeholder:text-left flex items-center pt-3"
            />
            <button className="bg-[#1a4a4a] text-white p-4 rounded-full hover:bg-[#153d3d] transition-all">
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBanner;