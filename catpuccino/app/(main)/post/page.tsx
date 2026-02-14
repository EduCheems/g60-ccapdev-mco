"use client";
import React, { useState } from 'react';
import RadarChart from '@/components/RadarChart';
import StarSlider from '@/components/StarScale';
import CafeSearch from '@/components/CafeSearcher';

// 1. Define the UploadBox component at the top (or in your components folder)
const UploadBox = ({ label }: { label: string }) => (
  <div className="group relative w-full h-32 border-2 border-dashed border-[#E6AA76]/20 rounded-2xl hover:bg-white hover:border-[#855225] transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden">
    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
    <p className="text-black/30 font-bold group-hover:text-[#000000] transition-colors uppercase italic text-sm">
      {label}
    </p>
  </div>
);

const categoryColors: Record<string, string> = {
  Sociability: "#ED7364", // Reddish
  Ambience: "#7DA06C",    // Greenish
  Food: "#E08027",        // Orange
  Catmosphere: "#508796", // Bluish
  Service: "#F052A5",     // Pink
};

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [ratings, setRatings] = useState({
    Sociability: 3,
    Ambience: 3,
    Food: 3,
    Catmosphere: 3,
    Service: 3,
  });
  const [catName, setCatName] = useState("");
  const [foodName, setFoodName] = useState("");
  const [bodyText, setBodyText] = useState("");

  const handleRatingChange = (category: string, val: number) => {
    setRatings(prev => ({ ...prev, [category]: val }));
  };

  return (

    <div className="min-h-screen bg-[#FBF3DE] px-[140px] py-12">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-5">
        <h1 className="text-[#222] font-poppins font-black text-5xl uppercase">
          Create a post
        </h1>
        <div className="h-[3px] flex-1 rounded-full bg-black mt-1"></div>
      </div>

      <CafeSearch />

      <div className="flex gap-20 items-start">
        
        {/* LEFT COLUMN: ALL FORM INPUTS */}
        <div className="flex-1 pb-20">
          
          {/* 1. Choose Cafe Button Placeholder */}

          {/* 2. Title Input */}
          <input 
            type="text" 
            placeholder="Title*"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 mt-4 w-full full bg-[#FEF6EA] border-[2px] border-[#855225] rounded-lg px-6 py-3 
               text-[#855225] text-lg font-medium placeholder-[#855225]/50 
               focus:outline-none focus:border-[#855225] transition-all"
          />

          {/* 3. Star Sliders Wrapped in the 'Board' */}
          <div 
            style={{ 
              height: '250px',
              border: '2px solid #855225' // Moving it here ensures it bypasses CSS reset issues
            }} 
            className="mb-5 bg-[#FEF6EA] rounded-lg px-8 py-6 flex flex-col justify-between shadow-[8px_8px_0_0_rgb(133_82_37_/_0.2)]"
          >
            {Object.entries(ratings).map(([key, val]) => (
              <StarSlider 
                key={key}
                label={key}
                value={val}
                onChange={(newVal) => handleRatingChange(key, newVal)}
              />
            ))}
          </div>

          <div className="w-full bg-[#FEF6EA] border-[2px] border-[#855225]/20 rounded-xl px-4 py-4 mb-5 font-bold text-[#855225] placeholder-[#855225]/40 focus:border-[#855225] outline-none transition-all shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
            {/* 4. Cat Spotlight */}
            <div className="space-y-4 mb-5">
              <div className="flex items-center gap-4">
                <h3 className="font-poppins font-black uppercase text-xl whitespace-nowrap text-[#855225]">
                  Cat Spotlight
                </h3>
                <div className="flex-1 h-[2px] bg-[#855225] rounded-full"></div>

              </div>

              <input 
                type="text" 
                placeholder="Cat Name*"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                className="w-full bg-[#FEF6EA] border-2 border-[#855225]/20 rounded-xl px-6 py-4 font-bold text-[#855225] placeholder-[#855225]/40 focus:border-[#855225] outline-none transition-all shadow-sm"
              />
              
              <UploadBox label="Drag or Drop or upload Media" />
            </div>

            <div className="space-y-4 mb-5">
              <div className="flex items-center gap-4">
                <h3 className="font-poppins font-black uppercase text-xl whitespace-nowrap text-[#855225]">
                  Favorite Food
                </h3>
                <div className="flex-1 h-[2px] bg-[#855225] rounded-full"></div>
                
              </div>

              <input 
                type="text" 
                placeholder="Food Name*"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                className="w-full bg-[#FEF6EA] border-2 border-[#855225]/20 rounded-xl px-6 py-4 font-bold text-[#855225] placeholder-[#855225]/40 focus:border-[#855225] outline-none transition-all shadow-sm"
              />
              
              <UploadBox label="Drag or Drop or upload Media" />
            </div>

            <div className="flex items-center gap-4 mt-5 mb-2">
              <div className="flex-1 h-[2px] bg-[#855225] rounded-full"></div>
                <h3 className="font-poppins font-black uppercase text-xl whitespace-nowrap text-[#855225]">
                  Description
                </h3>
              <div className="flex-1 h-[2px] bg-[#855225] rounded-full"></div>
            </div>

            {/* 6. Body Text */}
            <textarea 
              placeholder="Body text (Optional)"
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              className="w-full bg-[#FEF6EA] border-2 border-[#855225]/20 rounded-xl px-6 py-4 font-bold text-[#855225] placeholder-[#855225]/40 focus:border-[#855225] outline-none transition-all shadow-sm"
            />

          </div>

          {/* 7. Action Buttons */}
          <div className="flex justify-end gap-4">
            <button className="px-8 py-3 bg-[#A3A3A3] text-white font-black uppercase italic rounded-full hover:bg-gray-500 transition-colors shadow-lg">
              Save Draft
            </button>
            <button className="px-10 py-3 bg-[#5C5C5C] text-white font-black uppercase italic rounded-full hover:bg-black transition-colors shadow-lg">
              Post
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY PREVIEW */}
        <div className="w-[420px]">
          <div className="bg-[#FCD24C] rounded-[20px] px-8 py-6 shadow-[12px_12px_0_0_rgba(0,0,0,1)] border-2 border-black">
            <h2 className="text-2xl font-black uppercase italic mb-6 truncate">
              {title || "Cafe Name..."}
            </h2>
            <div className="bg-[#FEF6EA] aspect-square rounded-3xl mb-8 flex items-center justify-center border-2 border-black overflow-hidden shadow-inner mb-5">
                <RadarChart ratings={ratings} />
            </div>
            <div className="space-y-4">
               {Object.entries(ratings).map(([label, value]) => (
                 <div key={label} className="flex flex-col gap-0.5 mb-5">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-black/60">
                       <span>{label}</span>
                       <span>{value}/5</span>
                    </div>
                    <div className="h-3 bg-white/40 rounded-full w-full overflow-hidden border border-black border-[1px]">
                       <div 
                         className="h-full transition-all duration-500 ease-out" 
                         style={{ width: `${(value / 5) * 100}%`, backgroundColor: categoryColors[label] || "#ED7364"  }}
                       />
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}