// components/view-post/SpotlightSection.tsx

const OrangeTag = ({ value }: { value: number }) => (
  <div className="absolute -right-3 top-1/2 -translate-y-1/2 bg-[#FF4500] text-white font-black px-2 py-1 rounded shadow-[4px_4px_0_0_rgba(0,0,0,1)] border-2 border-black z-10 text-sm">
    {value}
  </div>
);

export default function Spotlights() {
  return (
    <div className="pt-12">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-montserrat font-black uppercase text-2xl text-black">More about the cafe</h2>
        <div className="h-[2px] flex-1 bg-black/20"></div>
      </div>

      <div className="flex justify-between items-stretch gap-6">
        {/* Cat Spotlight */}
        <div className="relative flex-1 bg-[#FEF6EA] border-2 border-black rounded-[20px] p-6 flex flex-col items-center shadow-[6px_6px_0_0_#85522533]">
          <h3 className="text-3xl font-black mb-6 text-black uppercase tracking-tighter">Cat Spotlight</h3>
          <div className="w-40 h-40 rounded-full bg-[#D9D9D9] border-2 border-black mb-4 overflow-hidden shadow-inner" />
          <span className="font-black text-2xl mb-4 text-black">Pochacco</span>
          <div className="flex gap-2">
            {["Friendly", "Sleepy"].map(tag => (
              <span key={tag} className="bg-[#A3B18A] text-black px-4 py-1 rounded-full text-xs font-black uppercase border-2 border-black">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Best Buyer */}
        <div className="relative flex-1 bg-[#FEF6EA] border-2 border-black rounded-[20px] p-6 flex flex-col items-center shadow-[6px_6px_0_0_#85522533]">
          <h3 className="text-3xl font-black mb-6 text-black uppercase tracking-tighter">Best buyer</h3>
          <div className="w-full h-40 rounded-2xl bg-[#D9D9D9] border-2 border-black mb-4 overflow-hidden shadow-inner" />
          <span className="font-black text-2xl mb-4 text-black">Mango Frappe</span>
          <div className="flex gap-2">
            {["Best Seller", "Sweet"].map(tag => (
              <span key={tag} className="bg-[#A3B18A] text-black px-4 py-1 rounded-full text-xs font-black uppercase border-2 border-black">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Cafe Menu */}
        <div className="relative flex-1 bg-[#FEF6EA] border-2 border-black rounded-[20px] p-6 flex flex-col items-center shadow-[6px_6px_0_0_#85522533]">
          <h3 className="text-3xl font-black mb-6 text-black uppercase tracking-tighter">Cafe Menu</h3>
          <div className="w-full flex-1 min-h-[160px] rounded-2xl bg-[#D9D9D9] border-2 border-black shadow-inner flex items-center justify-center">
             <span className="font-black text-black/40 uppercase">View Menu</span>
          </div>
        </div>
      </div>
    </div>
  );
}