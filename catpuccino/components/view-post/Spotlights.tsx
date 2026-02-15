import React from 'react';

export const CatSpotlight = ({ name, tags }: { name: string, tags: string[] }) => (
  <div className="group relative border-2 border-[#855225] rounded-[10px] bg-[#FEF6EA] p-6 w-full flex flex-col items-center min-h-[320px] overflow-hidden">
    <div className="absolute inset-0 pointer-events-none rounded-[10px] shadow-[inset_6px_6px_4px_rgba(133,82,37,0.2)] z-10" />
    <h3 className="font-black text-20 mb-6 uppercase tracking-tighter text-[#855225] z-20">Cat Spotlight</h3>
    <div className="relative w-36 h-36 rounded-full bg-[#FEF6EA] border-2 border-[#855225] mb-4 overflow-hidden z-20">
       <div className="absolute inset-0 rounded-full shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)]" />
    </div>
    <span className="font-black text-16 mb-4 text-[#855225] uppercase z-20">{name}</span>
    <div className="flex gap-2 z-20">
      {tags.map(tag => (
        <span key={tag} className="bg-[#FF7300] text-white text-[10px] px-4 py-1.5 rounded-md font-black uppercase border-2 border-[#855225]">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export const BestBuyer = ({ name, tags }: { name: string, tags: string[] }) => (
  <div className="relative border-2 border-[#855225] rounded-[10px] bg-[#FEF6EA] p-6 w-full flex flex-col items-center min-h-[320px] overflow-hidden">
    <div className="absolute inset-0 pointer-events-none rounded-[10px] shadow-[inset_6px_6px_4px_rgba(133,82,37,0.2)] z-10" />
    <h3 className="font-black text-20 mb-6 uppercase tracking-tighter text-[#855225] z-20">Best buyer</h3>
    <div className="relative w-full h-36 rounded-2xl bg-[#FEF6EA] border-2 border-[#855225] mb-4 overflow-hidden z-20">
       <div className="absolute inset-0 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)]" />
    </div>
    <span className="font-black text-16 mb-4 text-[#855225] uppercase z-20">{name}</span>
    <div className="flex gap-2 z-20">
      {tags.map(tag => (
        <span key={tag} className="bg-[#FF7300] text-white text-[10px] px-4 py-1.5 rounded-lg font-black uppercase border-2 border-[#855225]">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export const CafeMenu = () => (
  <div className="w-[380px] relative border-2 border-black rounded-[10px] bg-[#FEF6EA] p-6 w-full flex flex-col items-center min-h-[350px] overflow-hidden shadow-[5px_5px_0_0_#85522533]">
    <div className="absolute inset-0 pointer-events-none rounded-[10px] shadow-[inset_6px_6px_4px_rgba(133,82,37,0.2)] z-10" />
    <h3 className="font-black text-2xl mb-4 uppercase tracking-tighter text-[#855225] z-20">Cafe Menu</h3>
    
    <div className="relative w-full flex-1 border-2 border-[#855225] rounded-[10px] overflow-hidden z-20">
       <div className="absolute inset-0 flex items-center justify-center text-black/20 font-black text-sm uppercase p-4 text-center">
         Click to expand menu
       </div>
    </div>
  </div>
);

export const SpotlightSection = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full mt-12 items-stretch">
      <div className="flex-1 flex">
        <CatSpotlight name="Pochacco" tags={["Friendly", "Calm"]} />
      </div>
      <div className="flex-1 flex">
        <BestBuyer name="Mango Frappe" tags={["Top Pick", "Cold"]} />
      </div>
    </div>
  );
};

export default SpotlightSection;