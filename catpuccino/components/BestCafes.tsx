"use client"; 
import { useRef, useEffect } from "react";
import CafeCard from "./CafeCard";
import { Cafe } from "@/app/data/cafes";

interface BestCafesProps {
  title?: string;
  cardColor: string;
  badgeText: string; 
  badgeColor: string; 
  cafes: Cafe[];           
  filterKey?: string;      
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

  // 1. Process the cafes list based on props
  const filteredCafes = cafes
    .filter(c => filterKey ? c.ratings[filterKey] !== undefined : true)
    .sort((a, b) => {
      if (!filterKey) return 0;
      const valA = a.ratings[filterKey] || 0;
      const valB = b.ratings[filterKey] || 0;
      return reverse ? valA - valB : valB - valA;
    });

  // 2. Scroll Handlers
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current; 
      
      if (direction === "right"){
        if (scrollLeft + clientWidth >= scrollWidth - 5){
            scrollRef.current.scrollTo({left: 0, behavior: "smooth" }); 
        } else {
            scrollRef.current.scrollTo({
                left: scrollLeft + clientWidth, 
                behavior: "smooth"
            });
        }
      } else {
        if (scrollLeft <= 5){
            scrollRef.current.scrollTo({
                left: scrollWidth, 
                behavior: "smooth"
            }); 
        } else {
            scrollRef.current.scrollTo({
                left: scrollLeft - clientWidth, 
                behavior: "smooth"
            })
        }
      }
    }
  }; 

  // 3. Auto-scroll Effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return;

      const el = scrollRef.current;
      const { scrollLeft, clientWidth, scrollWidth } = el;

      if (scrollLeft + clientWidth >= scrollWidth - 5) {
        el.scrollTo({ left: 0, behavior: "auto" });
        requestAnimationFrame(() => {
          el.scrollBy({ left: clientWidth, behavior: "smooth" });
        });
      } else {
        el.scrollBy({ left: clientWidth, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full pt-2 pb-8">
      <div className="flex justify-between items-center px-10 mb-6">
        {title && <h2 className="font-poppins text-2xl text-white">{title}</h2>}
      </div>

      <div className="relative flex items-center group px-10">
        {/* LEFT BUTTON */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-4 z-40 w-12 h-12 bg-white/30 hover:bg-white/50 
          backdrop-blur-lg rounded-full text-white shadow-2xl flex items-center justify-center transition-all active:scale-90 border border-white/40
          opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
        >
          <span className="text-2xl font-bold">←</span>
        </button>

        {/* CARDS CONTAINER */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-10 pb-6 snap-x snap-mandatory no-scrollbar"
        >
          {filteredCafes.map((cafe, i) => (
            <CafeCard 
              key={cafe.id}
              id={cafe.slug} 
              index={i}
              name={cafe.title}
              slug={cafe.slug} 
              cardColor={cardColor}
              badgeText={badgeText}
              badgeColor={badgeColor}
            />
          ))}
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-4 z-50 w-12 h-12 bg-white/30 hover:bg-white/50 
          backdrop-blur-lg rounded-full text-white shadow-2xl flex items-center justify-center transition-all active:scale-90 border border-white/40
          opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
        >
          <span className="text-2xl font-bold">→</span>
        </button>
      </div>
    </section>
  );
}