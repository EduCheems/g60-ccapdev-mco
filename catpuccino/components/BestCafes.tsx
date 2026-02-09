"use client"; 
import { useRef, useEffect } from "react";
import CafeCard from "./CafeCard";

interface BestCafesProps {
  title?: string;
  cardColor: string;
  badgeText: string; 
  badgeColor: string; 

}

const cafeData = [
  { id: 1, name: "MewMew Cafe", slug: "mewmew-cafe" },
  { id: 2, name: "CatPaws Bistro", slug: "catpaws-bistro" },
  { id: 3, name: "Meowsie Wonderland", slug: "meowsie-cafe"},
  { id: 4, name: "MewMew Cafe", slug: "mewmew-cafe" },
  { id: 5, name: "CatPaws Bistro", slug: "catpaws-bistro" },
  { id: 6, name: "Meowsie Wonderland", slug: "meowsie-cafe"},
  { id: 7, name: "Meowsie Wonderland", slug: "meowsie-cafe"},
  { id: 8, name: "CatPaws Bistro", slug: "catpaws-bistro" },
  { id: 9, name: "Meowsie Wonderland", slug: "meowsie-cafe"},
  { id: 10, name: "Meowsie Wonderland", slug: "meowsie-cafe"}
];

export default function BestCafes({ title, cardColor, badgeColor, badgeText }: BestCafesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

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

        <button
          onClick={() => handleScroll("left")}
          className="absolute left-4 z-40 w-12 h-12 bg-white/30 hover:bg-white/50 
          backdrop-blur-lg rounded-full text-white shadow-2xl flex items-center justify-center transition-all active:scale-90 border border-white/40
          opacity-0 group-hover:opacity-100
          pointer-events-none group-hover:pointer-events-auto"
        >
          <span className="text-2xl font-bold">←</span>
        </button>

        <div 

          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-10 pb-6 snap-x snap-mandatory no-scrollbar "
        >

          {cafeData.map((cafe, i) => (
            <CafeCard 
              key={cafe.id}
              index={i}
              name={cafe.name}
              slug={cafe.slug} 
              cardColor={cardColor}
              badgeText={badgeText}
              badgeColor={badgeColor}
            />
          ))}
        </div>

        <button
        onClick={() => handleScroll("right")}
        className="absolute right-4 z-50 w-12 h-12 bg-white/30 hover:bg-white/50 
        backdrop-blur-lg rounded-full text-white shadow-2xl flex items-center justify-center transition-all active:scale-90 border border-white/40
        opacity-0 group-hover:opacity-100
        pointer-events-none group-hover:pointer-events-auto"
      >
        <span className="text-2xl font-bold">→</span>
      </button>

      </div>
    </section>
  );
}