// components/RecentlyVisited.tsx
import React from 'react';
import MiniPostPreview from './MinoPostPreview';

export default function RecentlyVisited() {
  return (
   
    <div className="w-full lg:w-[320px] border-[1.5px] border-black bg-[#FEF6EA] rounded-2xl p-6 shadow-[5px_5px_0_0_rgb(133_82_37_/_0.2)] h-fit sticky top-6 flex-shrink-0">
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-extrabold text-sm tracking-widest uppercase text-black">Recently Visited</h3>
        <button className="text-xs font-bold text-black hover:text-red-600 hover:underline transition-colors">
          Clear
        </button>
      </div>

      <div className="flex flex-col">
       
        <MiniPostPreview />
        <MiniPostPreview />
        <MiniPostPreview />
        <MiniPostPreview />
        <MiniPostPreview />
      </div>

    </div>
  );
}