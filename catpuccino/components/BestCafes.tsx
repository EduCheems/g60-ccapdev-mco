"use client"; 
import { useRef, useEffect } from "react";
import CafeCard from "./CafeCard";

interface BestCafesProps {
  title: string;
  cardColor: string;
  sectionSvg?: React.ReactNode; 
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

// Use the interface here so TypeScript sees sectionSvg!
export default function BestCafes({ title, sectionSvg }: BestCafesProps) {
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

    // If we're at (or near) the end
    if (scrollLeft + clientWidth >= scrollWidth - 5) {
      // Instantly jump back
      el.scrollTo({ left: 0, behavior: "auto" });

      // Then smoothly move forward (next frame)
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
    <section className="w-full py-10">
      <div className="flex justify-between items-center px-10 mb-6">
        <h2 className="font-fredoka text-2xl text-white">{title}</h2>
        
        <div className="flex bg-white/10 rounded-full p-1 border border-white/20 backdrop-blur-sm">
          <button onClick={() => handleScroll("left")} className="p-2 hover:bg-white/20 rounded-full text-white cursor-pointer">←</button>
          <div className="w-[1px] bg-white/20 mx-1"></div>
          <button onClick={() => handleScroll("right")} className="p-2 hover:bg-white/20 rounded-full text-white cursor-pointer">→</button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 px-10 pb-6 snap-x snap-mandatory no-scrollbar"
      >
        {cafeData.map((cafe, i) => (
          <CafeCard 
            key={cafe.id}
            index={i}
            name={cafe.name}
            slug={cafe.slug} 
            bgSvg={sectionSvg} // Pass the SVG down!
          />
        ))}
      </div>
    </section>
  );
}