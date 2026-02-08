import BestCafes from "@/components/BestCafes";

const PawPattern = (
  <svg viewBox="0 0 100 100" className="fill-white opacity-40">
    <circle cx="50" cy="50" r="10" />
    <circle cx="30" cy="40" r="8" />
    <circle cx="70" cy="40" r="8" />
    <circle cx="40" cy="20" r="8" />
    <circle cx="60" cy="20" r="8" />
  </svg>
);

const BeanPattern = (
  <svg viewBox="0 0 100 100" className="fill-white opacity-40">
    <ellipse cx="50" cy="50" rx="20" ry="10" transform="rotate(45 50 50)" />
  </svg>
);

const WorkFriendlyPattern = (
  <img 
    src="/work-friendly-card.svg" 
    alt="" 
    className="absolute inset-0 w-full h-full object-cover" 
  />
);

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-[#D5AE85] flex flex-col"> {/* That off-white we talked about */}
      
      {/* Section 1: Warm Coffee Tones */}
      <BestCafes 
      title="General Munchkin's social spots" 
      cardColor="bg-[#E8DCC4]" 
      sectionSvg={PawPattern}
      />

      <BestCafes title="Oppie goofy's aesthetic picks" cardColor="bg-orange-100" />

      <BestCafes title="Chonky's flavor favorites" cardColor="bg-[#D9C5B2]" />

      <BestCafes title="Lil'jimbob's focus zones" cardColor="bg-[#E8DCC4]" />

      <BestCafes title="Larry's staff approved cafes" cardColor="bg-orange-100" sectionSvg={WorkFriendlyPattern} />

      <BestCafes title="Burger's gatekept gems" cardColor="bg-[#D9C5B2]" />
      
    </div>
  );
}