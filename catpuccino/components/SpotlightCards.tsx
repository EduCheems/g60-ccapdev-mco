// components/post-view/SpotlightCards.tsx

export const CatSpotlight = ({ name, tags }: { name: string, tags: string[] }) => (

  <div className="relative border-4 border-black rounded-[32px] bg-white p-6 w-full flex flex-col items-center min-h-[320px] shadow-[inset_4px_4px_10px_rgba(133,82,37,0.3)]">

    <h3 className="font-black text-2xl mb-6 uppercase tracking-tighter text-black">Cat Spotlight</h3>
    
    <div className="w-36 h-36 rounded-full bg-[#D9D9D9] border-4 border-black mb-4 overflow-hidden shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)]" />
    
    <span className="font-black text-xl mb-4 text-black uppercase">{name}</span>
    
    <div className="flex gap-2">
      {tags.map(tag => (
        <span key={tag} className="bg-[#A3B18A] border-2 border-black text-[10px] text-black px-4 py-1.5 rounded-full font-black uppercase">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export const BestBuyer = ({ name, tags }: { name: string, tags: string[] }) => (
  <div className="relative border-4 border-black rounded-[32px] p-6 w-full flex flex-col items-center min-h-[320px] shadow-[inset_6px_6px_12px_rgba(133,82,37,0.25)]">
    
    <h3 className="font-black text-2xl mb-6 uppercase tracking-tighter text-black">Best buyer</h3>
    
    <div className="w-full h-36 rounded-2xl bg-[#D9D9D9] border-4 border-black mb-4 overflow-hidden shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1)]" />
    
    <span className="font-black text-xl mb-4 text-black uppercase">{name}</span>
    
    <div className="flex gap-2">
      {tags.map(tag => (
        <span key={tag} className="bg-[#A3B18A] border-2 border-black text-[10px] text-black px-4 py-1.5 rounded-full font-black uppercase">
          {tag}
        </span>
      ))}
    </div>
  </div>
);