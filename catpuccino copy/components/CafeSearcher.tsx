"use client";
import { Cafe } from '@/app/data/cafes';
import React, { useState, useEffect } from 'react';

interface CafeSearchProps {
  selectedCafe: string;
  onSelect: (name: string) => void;
  takenCafes?:string[];
}

interface CatSearchProps{
  selectedCafe:string;
  selectedCat:string;
  onSelect:(name:string)=>void;
  takenCats?:string[];
}

interface menuSearchProps{
  selectedCafe:string;
  selectedMenu:string;
  onSelect:(name:string)=>void;
  takenMenu?:string[];
}

type Cats={
  name: string;
  breed: string;
  description: string;
  pictureUrl: string;
  upVotes?: number;
}

type Menu={
  itemName: string;
  price: string;
  description: string;
  pictureUrl: string;
  upVotes?: number;
}
export default function CafeSearch({ selectedCafe, onSelect,takenCafes=[] }: CafeSearchProps) {
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
    cafe && cafe.toLowerCase().includes(query.toLowerCase())).
    filter(cafe=>!takenCafes.includes(cafe));

  const handleSelect = (name:string) => {
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
};

export function CatSearch({ selectedCafe, selectedCat, onSelect,takenCats=[] }: CatSearchProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [cats, setCats] = useState<Cats[]>([]); 



  useEffect(() => {
    if (!selectedCafe) {setCats([]); return;}

    const fetchCats = async () => {
      try {
        const res = await fetch(`/api/auth/cats?cafe=${encodeURIComponent(selectedCafe)}`);
        const data=await res.json();
        setCats(data|| []);
      } catch (err) {
        console.error("Failed to load cafes:", err);
      }
    };
    
    fetchCats();
  }, [selectedCafe]);

  
  const filteredCat = cats
  .filter(cat => cat.name.toLowerCase().includes(query.toLowerCase()))
  .filter(cat => !takenCats.includes(cat.name));

  const handleSelect = (name:string) => {
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
          {selectedCat ||"CHOOSE A CAT"}
        </button>
      ) : (
        <div className="flex flex-col w-[300px] absolute top-0 left-0 z-50 animate-in fade-in zoom-in duration-150">
          <input
            autoFocus
            type="text"
            placeholder={filteredCat[0]?.name}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => setTimeout(() => setIsSearching(false), 200)}
            
            className="w-full text-black placeholder:text-black/40 bg-white border-2 border-black rounded-xl px-4 py-2 font-black focus:outline-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-sm"
          />

          {filteredCat.length > 0 && (
            <div className="mt-2 bg-white border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0_0_rgba(0,0,0,1)] max-h-[220px] overflow-y-auto custom-scrollbar">
           
              {filteredCat.map((cat) => (
                <button
                  key={cat.name}
                  onMouseDown={() => handleSelect(cat.name)}
                  className={`w-full text-left px-4 py-3 font-black border-b-2 border-black last:border-none text-sm transition-colors
                    ${selectedCat === cat.name 
                      ? 'bg-[#FF7300] text-white' 
                      : 'bg-white text-black hover:bg-[#FCD24C]'
                    }`}
                >
                  {cat.name.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function MenuSearch({ selectedCafe, selectedMenu, onSelect,takenMenu=[] }: menuSearchProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [menus, setmenu] = useState<Menu[]>([]); 



  useEffect(() => {
    if (!selectedCafe) {setmenu([]); return;}

    const fetchMenu = async () => {
      try {
        const res = await fetch(`/api/auth/menus?cafe=${encodeURIComponent(selectedCafe)}`);
        const data=await res.json();
        setmenu(data|| []);
      } catch (err) {
        console.error("Failed to load cafes:", err);
      }
    };
    
    fetchMenu();
  }, [selectedCafe]);

  
  const filteredmenu = menus
  .filter(menu => menu.itemName.toLowerCase().includes(query.toLowerCase()))
  .filter(menu => !takenMenu.includes(menu.itemName));

  const handleSelect = (name:string) => {
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
          {selectedMenu ||"CHOOSE A menu"}
        </button>
      ) : (
        <div className="flex flex-col w-[300px] absolute top-0 left-0 z-50 animate-in fade-in zoom-in duration-150">
          <input
            autoFocus
            type="text"
            placeholder={selectedCafe}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => setTimeout(() => setIsSearching(false), 200)}
            
            className="w-full text-black placeholder:text-black/40 bg-white border-2 border-black rounded-xl px-4 py-2 font-black focus:outline-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-sm"
          />

          {filteredmenu.length > 0 && (
            <div className="mt-2 bg-white border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0_0_rgba(0,0,0,1)] max-h-[220px] overflow-y-auto custom-scrollbar">
           
              {filteredmenu.map((menu) => (
                <button
                  key={menu.itemName}
                  onMouseDown={() => handleSelect(menu.itemName)}
                  className={`w-full text-left px-4 py-3 font-black border-b-2 border-black last:border-none text-sm transition-colors
                    ${selectedMenu === menu.itemName 
                      ? 'bg-[#FF7300] text-white' 
                      : 'bg-white text-black hover:bg-[#FCD24C]'
                    }`}
                >
                  {menu.itemName.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}