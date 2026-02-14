"use client";
import React, { useState } from 'react';

export default function CafeSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState("");
  const [query, setQuery] = useState("");

  const cafes = ["Cat Heaven", "Whiskers & Brew", "The Purrfect Cup", "Neko Cafe", "Meow Meow Land"];

  // Simple filter logic
  const filteredCafes = cafes.filter(cafe => 
    cafe.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (name: string) => {
    setSelectedCafe(name);
    setIsSearching(false);
    setQuery("");
  };

  return (
    <div className="relative w-fit h-10">
      {!isSearching ? (
        <button 
          onClick={() => setIsSearching(true)}
          className="bg-[#A3A3A3] hover:bg-[#8e8e8e] text-black font-bold px-8 py-2 rounded-full 
                     text-sm transition-all shadow-sm active:scale-95 whitespace-nowrap"
        >
          {selectedCafe || "Choose a cafe"}
        </button>
      ) : (
        <div className="flex flex-col w-[300px] absolute top-0 left-0 z-50">
          <input 
            autoFocus
            type="text"
            placeholder="Search cafes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => setTimeout(() => setIsSearching(false), 200)}
            className="w-full bg-white border-2 border-black rounded-xl px-4 py-2 font-bold 
                       focus:outline-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-sm"
          />
          
          {/* Results Dropdown */}
          {filteredCafes.length > 0 && (
            <div className="mt-2 bg-white border-2 border-black rounded-xl overflow-hidden 
                            shadow-[4px_4px_0_0_rgba(0,0,0,1)] max-h-[200px] overflow-y-auto">
              {filteredCafes.map((cafe) => (
                <button 
                  key={cafe}
                  onMouseDown={() => handleSelect(cafe)} // Use onMouseDown to trigger before onBlur
                  className="w-full text-left px-4 py-3 hover:bg-[#FBF3DE] font-bold 
                             border-b border-black/5 last:border-none text-sm"
                >
                  {cafe}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}