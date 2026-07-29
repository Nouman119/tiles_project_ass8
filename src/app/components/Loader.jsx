// src/app/components/Loader.jsx
import React from 'react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-20 min-h-[50vh]">
      {/* DaisyUI Spinner with Tailwind colors */}
      <span className="loading loading-spinner loading-lg text-orange-600"></span>
    </div>
  );
}