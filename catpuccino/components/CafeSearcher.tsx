"use client";
import React, { useState, useEffect } from 'react';

interface CafeSearchProps {
  selectedCafe: string;
  onSelect: (name: string) => void;
}

export default function CafeSearch({ selectedCafe, onSelect }: CafeSearchProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [cafes, setCafes] = useState<string[]>([]); 

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const res = await fetch('/api/auth/cafes');
        const data = await res.json();
        console.log("Fetched cafes:", data);
        setCafes(data);
      } catch (err) {
        console.error("Failed to load cafes:", err);
      }
    };
    fetchCafes();
  }, []);

  const filteredCafes = cafes.filter(cafe =>
    cafe && cafe.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (name: string) => {
    onSelect(name);
    setIsSearching(false);
    setQuery("");
  };

  return (
    <div className="relative w-fit h-10">
      {!isSearching ? (
        <button
          onClick={() => setIsSearching(true)}
          className="bg-[#FCD24C] hover:bg-[#FF7300] border-black border-[2px] text-black font-black px-8 py-2 rounded-full text-sm transition-all shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] whitespace-nowrap"
        >
          {selectedCafe || "CHOOSE A CAFE"}
        </button>
      ) : (
        <div className="flex flex-col w-[300px] absolute top-0 left-0 z-50 animate-in fade-in zoom-in duration-150">
          <input
            autoFocus
            type="text"
            placeholder="Search cafes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => setTimeout(() => setIsSearching(false), 200)}
            
            className="w-full text-black placeholder:text-black/40 bg-white border-2 border-black rounded-xl px-4 py-2 font-black focus:outline-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-sm"
          />

          {filteredCafes.length > 0 && (
            <div className="mt-2 bg-white border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0_0_rgba(0,0,0,1)] max-h-[220px] overflow-y-auto custom-scrollbar">
              {filteredCafes.map((cafe) => (
                <button
                  key={cafe}
                  onMouseDown={() => handleSelect(cafe)}
                  className={`w-full text-left px-4 py-3 font-black border-b-2 border-black last:border-none text-sm transition-colors
                    ${selectedCafe === cafe 
                      ? 'bg-[#FF7300] text-white' 
                      : 'bg-white text-black hover:bg-[#FCD24C]'
                    }`}
                >
                  {cafe.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}