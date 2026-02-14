// components/post-view/SpotlightCards.tsx

const OrangeTag = ({ value, position = "-right-2" }: { value: number, position?: string }) => (
  <div className={`absolute top-4 ${position} bg-[#D26500] text-white font-bold px-2 py-0.5 rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-[12px] z-10 border border-black`}>
    {value}
  </div>
);

export const CatSpotlight = ({ name, tags }: { name: string, tags: string[] }) => (
  <div className="relative border-2 border-black rounded-[32px] bg-white p-6 w-full flex flex-col items-center min-h-[320px]">
    <OrangeTag value={27} />
    <h3 className="font-bold text-2xl mb-6">Cat Spotlight</h3>
    
    {/* CIRCULAR IMAGE for the cat */}
    <div className="w-36 h-36 rounded-full bg-[#D9D9D9] border-2 border-black mb-4 overflow-hidden shadow-inner" />
    
    <span className="font-bold text-lg mb-4">{name}</span>
    
    <div className="flex gap-2">
      {tags.map(tag => (
        <span key={tag} className="bg-[#666] text-[10px] text-white px-4 py-1.5 rounded-lg font-bold uppercase">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export const BestBuyer = ({ name, tags }: { name: string, tags: string[] }) => (
  <div className="relative border-2 border-black rounded-[32px] bg-white p-6 w-full flex flex-col items-center min-h-[320px]">
    <OrangeTag value={27} />
    <h3 className="font-bold text-2xl mb-6">Best buyer</h3>
    
    {/* ROUNDED RECTANGLE for the food */}
    <div className="w-full h-36 rounded-2xl bg-[#D9D9D9] border-2 border-black mb-4 overflow-hidden shadow-inner" />
    
    <span className="font-bold text-lg mb-4">{name}</span>
    
    <div className="flex gap-2">
      {tags.map(tag => (
        <span key={tag} className="bg-[#666] text-[10px] text-white px-4 py-1.5 rounded-lg font-bold uppercase">
          {tag}
        </span>
      ))}
    </div>
  </div>
);