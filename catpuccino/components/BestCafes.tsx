"use client"; 
import { useState, useRef } from "react"; 
import CafeCard from "./CafeCard";
import { Cafe } from "@/app/data/cafes";
import Link from "next/link";

interface BestCafesProps {
  title?: string;
  cardColor: string;
  badgeText: string; 
  badgeColor: string; 
  cafes: Cafe[]; 
  filterKey?: "sociability" | "ambience" | "food" | "work_friendly" | "service"; 
  reverse?: boolean;
}

export default function BestCafes({ 
  title, 
  cardColor, 
  badgeColor, 
  badgeText, 
  cafes,          
  filterKey,       
  reverse = false 
}: BestCafesProps) { 

  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredCafes = cafes.slice()
    .sort((a, b) => {
      if (!filterKey) return 0;
      
      const valA = a.averages?.[filterKey] || 0;
      const valB = b.averages?.[filterKey] || 0;
      return reverse ? valA - valB : valB - valA;
    }).slice(0,5);

  return (
    <section className="w-full pt-2 pb-0 overflow-hidden">
      {title && <h2 className="px-10 mb-6 font-poppins text-2xl text-white">{title}</h2>}

      <div className="relative flex items-center group px-10">
        <div ref={scrollRef} className="flex overflow-x-auto gap-6 px-2 pb-10 snap-x snap-mandatory no-scrollbar scroll-smooth">
          {filteredCafes.map((cafe, i) => {
            
            const currentId = cafe._id;
            const isHovered = hoveredId === currentId;

            const displayRating = cafe.averages ? 
              (Object.values(cafe.averages) as number[]).reduce((a,b) => a+b, 0) / 5 : 0;

            return (
              <div
                key={currentId}
                onMouseEnter={() => setHoveredId(currentId)}
                onMouseLeave={() => setHoveredId(null)}
                className={`transition-all duration-500 ease-in-out flex-none flex items-center
                  ${isHovered ? "w-[900px]" : "w-[331px]"}`}
              >
                <div className="shrink-0">
                  <CafeCard 
                    id={currentId} 
                    index={i}
                    name={cafe.name}
                    cardColor={cardColor}
                    badgeText={badgeText}
                    badgeColor={badgeColor}
                    cafe={cafe}
                    ratings={Math.round(displayRating * 10) / 10}
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

                    <div className="flex gap-4 mb-6 font-bold uppercase text-xs tracking-widest text-[#954F2B]">
                      <div><p className="opacity-60">Price</p><p className="text-base mt-1">{cafe.priceRange}</p></div>
                      <div><p className="opacity-60">City</p><p className="text-base mt-1">{cafe.location}</p></div>
                      <div><p className="opacity-60">Time</p><p className="text-base mt-1">{cafe.operatingHours}</p></div>
                    </div>

                    <p className="text-[#331608]/90 text-sm leading-relaxed mb-8 line-clamp-4 italic">
                      "{cafe.description}"
                    </p>

                    <Link href={`/view-cafe/${currentId}`}>
                      <button className="bg-[#E4B67E] px-6 py-2 rounded-full font-bold uppercase text-xs">
                        See more
                      </button>
                    </Link>
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