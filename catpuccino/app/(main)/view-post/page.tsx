// app/(main)/view-post/page.tsx
"use client";
import React from "react";
import PostHeader from "@/components/view-post/PostHeader";
import PostContent from "@/components/view-post/PostContent";
import SpotlightSection from "@/components/view-post/Spotlights";
import RatingSidebar from "@/components/view-post/RatingChart";

export default function ViewPostPage() {
  // This data would eventually come from your database/props
  const mockRatings = { 
    Sociability: 5, 
    Ambience: 4, 
    Food: 5, 
    Catmosphere: 4, 
    Service: 3 
  };

  return (
    <main className="min-h-screen bg-[#FBF3DE] px-[140px] py-12">
      
      {/* 1. PAGE HEADER (The title with the horizontal line) */}
      <div className="flex items-center gap-4 mb-10 max-w-[1400px] mx-auto">
        <h1 className="text-[#855225] font-poppins font-black text-5xl uppercase">
          Mew Mew Cafe
        </h1>
        <div className="h-[3px] flex-1 rounded-full bg-[#FEF6EA] shadow-[5px_5px_0_0_#85522533] mt-1"></div>
      </div>

      {/* 2. MAIN LAYOUT (Flex row for content + sidebar) */}
      <div className="flex gap-16 items-start max-w-[1400px] mx-auto">
        
        {/* LEFT SIDE: Review Details & Grid */}
        <div className="flex-1 max-w-[850px] space-y-10">
          
          {/* Tags & Price/City/Time Row */}
          <PostHeader 
            tags={["Work-friendly", "Aesthetic", "Refreshing"]}
            price="200-500 p"
            city="Manila City"
            time="9AM - 11AM"
          />

          {/* The main block of text from the user */}
          <PostContent />

          {/* The "More about the cafe" section with the 3 cards row */}
          <SpotlightSection />
          
        </div>

        {/* RIGHT SIDE: The Sticky Rating Card */}
        <aside className="w-[420px] sticky top-10">
          <RatingSidebar 
            ratings={mockRatings} 
            cafeName="Mew Mew Cafe" 
          />
        </aside>

      </div>
    </main>
  );
}
