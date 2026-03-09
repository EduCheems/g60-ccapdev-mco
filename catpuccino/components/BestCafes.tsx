"use client"; 
import { useState } from "react"; 
import { useRef, useEffect } from "react";
import CafeCard from "./CafeCard";

function slugify(name: string): string {
  return name
    .toLowerCase()           
    .trim()                  
    .replace(/\s+/g, "-")    
    .replace(/[^\w-]/g, ""); 
}

function calculateOverallRating(averages: BestCafeProps["averages"]): number {
  const total = averages.sociability + averages.ambience + averages.food + averages.work_friendly + averages.service;
  const overall = total / 5;
  return Math.round(overall * 10) / 10; // rounds to 1 decimal place
}

export interface BestCafeProps {
  _id: string
  name: string
  description: string
  location: string
  operatingHours: string
  priceRange: string
  averages: {
    sociability: number
    ambience: number
    food: number
    work_friendly: number
    service: number
  }


}

interface BestCafesProps {
  title?: string
  cardColor: string
  badgeText: string
  badgeColor: string
  cafes: BestCafeProps[]
  filterKey?: keyof BestCafeProps["averages"]
  reverse?: boolean
}


export default function BestCafes({title,
  cardColor,
  badgeColor,
  badgeText,
  cafes,
  filterKey,
  reverse = false
}: BestCafesProps){
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredCafes = cafes
  .filter(c => filterKey ? c.averages?.[filterKey] !== undefined : true)
    .sort((a, b) => {
      if (!filterKey) return 0;
      const valA = a.averages?.[filterKey] || 0;
      const valB = b.averages?.[filterKey] || 0;
      return reverse ? valA - valB : valB - valA;
    });

    
  return (
    <section className="w-full pt-2 pb-0 overflow-hidden">
      {title && <h2 className="px-10 mb-6 font-poppins text-2xl text-white">{title}</h2>}

      <div className="relative flex items-center group px-10">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-2 pb-10 snap-x snap-mandatory no-scrollbar scroll-smooth"
        >
          {filteredCafes.map((cafe, i) => {
            const isHovered = hoveredId === cafe._id;

            const displayDescription = cafe.description || 
              `${cafe.name} is a top-rated spot in ${cafe.location}. Perfect for cat lovers looking for a ${cafe.priceRange} experience.`;

            return (
              <div
                key={cafe._id}
                onMouseEnter={() => setHoveredId(cafe._id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`transition-all duration-500 ease-in-out flex-none flex items-center
                  ${isHovered ? "w-[900px]" : "w-[331px]"}`}
              >
                <div className="shrink-0">
                  <CafeCard 
                    id={slugify(cafe.name)} 
                    index={i}
                    name={cafe.name}
                    slug={slugify(cafe.name)} 
                    cardColor={cardColor}
                    badgeText={badgeText}
                    badgeColor={badgeColor}
                    cafe={cafe}
                    ratings={calculateOverallRating(cafe.averages)}
                    

                  />
                </div>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center
                  ${isHovered ? "opacity-100 max-w-[600px] ml-8" : "opacity-0 max-w-0 ml-0"}`}
                >
                  <div className="min-w-[550px] text-[#5C3727]">
                    <div className="flex items-center gap-4 mb-4">
                       <span className="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center text-black font-black text-xl">
                         {i + 1}
                       </span>
                       <h3 className="text-5xl font-black tracking-tighter uppercase">{cafe.name}</h3>
                    </div>

                    <div className="flex gap-4 mb-6 font-bold uppercase text-xs tracking-widest text-white/70">
                      <div><p className="text-[#954F2B]">Price</p><p className="text-[#954F2B] text-base mt-1">{cafe.priceRange}</p></div>
                      <div><p className="text-[#954F2B]">City</p><p className="text-[#954F2B] text-base mt-1">{cafe.location}</p></div>
                      <div><p className="text-[#954F2B]">Time</p><p className="text-[#954F2B] text-base mt-1">{cafe.operatingHours}</p></div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-yellow-400 text-2xl">★★★★★</div>
                      <span className="text-2xl font-black">5.0</span>
                    </div>

                    <p className="text-[#331608]/90 text-sm leading-relaxed mb-8 line-clamp-4 italic">
                      "{displayDescription}"
                    </p>

                    <button className="bg-[#E4B67E] text-black px-10 py-3 rounded-xl font-black text-lg border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-none transition-all">
                      See more
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}