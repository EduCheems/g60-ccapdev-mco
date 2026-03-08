"use client"; 
import React, { useState } from 'react';
import PostPreview from '@/components/profile/PostPreview';
import RecentlyVisited from '@/components/RecentlyVisited';
import Link from 'next/link'; 


export default function DiscoverPage() {
  const [sortBy, setSortBy] = useState("new");

  return (
    <div className="min-h-screen w-full bg-[#FBF3DE]"> 
      
      <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-12 font-montserrat flex flex-col lg:flex-row gap-8 items-start">
        
        <div className="flex-1 flex flex-col gap-6 w-full">
          
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

          <div className="flex flex-col gap-6">
            
              <PostPreview 
                id="thread-1"
                cafeName="Meow Cafe"
                rating={5}
                username="CatLover99"
                price="₱₱"
                city="Makati"
                time="8:00 AM - 9:00 PM"
                content="This place is amazing! The orange cat 'Mochi' is literally a social butterfly. Highly recommend checking this place out if you need a study break."
              />
            

            <PostPreview 
                id="thread-1"
                cafeName="Meow Cafe"
                rating={5}
                username="CatLover99"
                price="₱₱"
                city="Makati"
                time="8:00 AM - 9:00 PM"
                content="This place is amazing! The orange cat 'Mochi' is literally a social butterfly. Highly recommend checking this place out if you need a study break."
              />

            <PostPreview 
                id="thread-1"
                cafeName="Meow Cafe"
                rating={5}
                username="CatLover99"
                price="₱₱"
                city="Makati"
                time="8:00 AM - 9:00 PM"
                content="This place is amazing! The orange cat 'Mochi' is literally a social butterfly. Highly recommend checking this place out if you need a study break."
              />
          </div>

        </div>

        <RecentlyVisited />

      </div>
    </div>
  );
}