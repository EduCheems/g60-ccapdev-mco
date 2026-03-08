"use client"; 
import React, { useState } from 'react';
// Make sure these paths match where your components actually are!
import PostPreview from '@/components/profile/PostPreview';
import RecentlyVisited from '@/components/RecentlyVisited';

export default function DiscoverPage() {
  const [sortBy, setSortBy] = useState("new");

  return (
    // 1. THIS WRAPPER FIXES THE BLACK SPACES: It stretches 100% width and holds the background color
    <div className="min-h-screen w-full bg-[#FBF3DE]"> 
      
      {/* 2. YOUR CONTENT: Stays perfectly centered at 1200px wide */}
      <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-12 font-montserrat flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Side: The Main Feed */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          
          {/* Sorting Header */}
          <div className="flex justify-between items-center mb-2 px-2">
            <h1 className="text-2xl font-black text-black">Discover</h1>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-black">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FEF6EA] text-black border-[1.5px] border-black rounded-lg px-3 py-1.5 text-sm font-bold cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,0.15)] outline-none hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_rgba(0,0,0,0.15)] transition-all"
              >
                <option value="new">Most Recent</option>
                <option value="best">Best Rated</option>
                <option value="controversial">Spiciest Takes</option>
              </select>
            </div>
          </div>

          {/* The Doomscroll Array */}
          <div className="flex flex-col gap-6">
            <PostPreview />
            <PostPreview />
            <PostPreview />
          </div>

        </div>

        {/* Right Side: The Sticky Sidebar */}
        <RecentlyVisited />

      </div>
    </div>
  );
}