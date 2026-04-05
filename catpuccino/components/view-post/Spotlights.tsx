'use client'
import React from 'react';

export type SpotlightSectionProps = {
  catName?: string;
  catImage?: string;
  foodName?: string;
  foodImage?: string;
};

export const CatSpotlight = ({ name,image }: { name: string, image:string }) => (
  <div className="group relative border-2 border-[#855225] rounded-[10px] bg-[#FEF6EA] p-6 w-full flex flex-col items-center min-h-[320px] overflow-hidden">
    <div className="absolute inset-0 pointer-events-none rounded-[10px] shadow-[inset_6px_6px_4px_rgba(133,82,37,0.2)] z-10" />
    <h3 className="font-black text-20 mb-6 uppercase tracking-tighter text-[#855225] z-20">Cat Spotlight</h3>
    
    <div className="relative w-36 h-36 rounded-full bg-[#FEF6EA] border-2 border-[#855225] mb-4 overflow-hidden z-20">
       <div className="absolute inset-0 rounded-full shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)]" />
        <img
          src={image}
          alt="cats"
          className="w-full h-full object-cover"
          />
    </div>
    <span className="font-black text-16 mb-4 text-[#855225] uppercase z-20">{name}</span>
  </div>
);

export const BestBuyer = ({ name, image }: { name: string,image:string }) => (
  <div className="relative border-2 border-[#855225] rounded-[10px] bg-[#FEF6EA] p-6 w-full flex flex-col items-center min-h-[320px] overflow-hidden">
    <div className="absolute inset-0 pointer-events-none rounded-[10px] shadow-[inset_6px_6px_4px_rgba(133,82,37,0.2)] z-10" />
    <h3 className="font-black text-20 mb-6 uppercase tracking-tighter text-[#855225] z-20">Best buyer</h3>
    
    <div className="relative w-full h-36 rounded-2xl bg-[#FEF6EA] border-2 border-[#855225] mb-4 overflow-hidden z-20">
       <div className="absolute inset-0 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)]" />
          <img
          src={image}
          alt="menu"
          className="w-full h-full object-cover"
          />
    </div>
    <span className="font-black text-16 mb-4 text-[#855225] uppercase z-20">{name}</span>
  </div>
);

export const CafeMenu = () => (
  <div className="w-[380px] relative border-2 border-[#855225] rounded-[10px] bg-[#FEF6EA] p-6 w-full flex flex-col items-center min-h-[350px] overflow-hidden">
    <div className="absolute inset-0 pointer-events-none rounded-[10px] shadow-[inset_6px_6px_4px_rgba(133,82,37,0.2)] z-10" />
    <h3 className="font-black text-2xl mb-4 uppercase tracking-tighter text-[#855225] z-20">Cafe Menu</h3>
    
    <div className="relative w-full flex-1 border-2 border-[#855225] rounded-[10px] overflow-hidden z-20">
       <div className="absolute inset-0 flex items-center justify-center text-[#855225] font-black text-sm uppercase p-4 text-center">
         
       </div>
    </div>
  </div>
);

export const SpotlightSection = ({ catName, catImage, foodName, foodImage }: SpotlightSectionProps) => {
 
  if (!catName && !foodName) return null;

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full mt-12 items-stretch shadow-[inset_6px_6px_4px_rgba(133,82,37,0.2)]">
      <div className="flex-1 flex">
        <CatSpotlight name={catName || "Unknown"} image={catImage||"/default-Catimage.png"} />
      </div>
      <div className="flex-1 flex">
        <BestBuyer name={foodName || "Unknown"} image={foodImage||"/default-Foodimage.png"} />
      </div>
    </div>
  );
};

export default SpotlightSection;