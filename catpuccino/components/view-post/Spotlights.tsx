// components/view-post/SpotlightSection.tsx

const OrangeTag = ({ value }: { value: number }) => (
  <div className="absolute -right-3 top-1/2 -translate-y-1/2 bg-[#FF4500] text-white font-black px-2 py-1 rounded shadow-[4px_4px_0_0_rgba(0,0,0,1)] border-2 border-black z-10 text-sm">
    {value}
  </div>
);

const Connector = () => (
  <div className="flex flex-col items-center justify-center gap-1 self-center px-2">
    <div className="text-[#FF4500] font-black text-2xl">↔</div>
  </div>
);

export default function Spotlights() {
  return (
    <div className="pt-12">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-black italic uppercase text-2xl whitespace-nowrap">More about the cafe</h2>
        <div className="h-[2px] flex-1 bg-black/10"></div>
      </div>

      <div className="flex justify-between items-stretch gap-2">
        {/* Cat Spotlight */}
        <div className="relative flex-1 bg-white border-2 border-black rounded-[32px] p-6 flex flex-col items-center">
          <h3 className="text-3xl font-black mb-6">Cat Spotlight</h3>
          <div className="w-40 h-40 rounded-full bg-[#D9D9D9] border-2 border-black mb-4 overflow-hidden shadow-inner" />
          <span className="font-bold text-xl mb-4 text-[#333]">Pochacco</span>
          <div className="flex gap-2">
            {["Tag #1", "Tag #2"].map(tag => (
              <span key={tag} className="bg-[#666] text-white px-4 py-1 rounded-lg text-xs font-bold uppercase">{tag}</span>
            ))}
          </div>
          <OrangeTag value={27} />
        </div>

        <Connector />

        {/* Best Buyer */}
        <div className="relative flex-1 bg-white border-2 border-black rounded-[32px] p-6 flex flex-col items-center">
          <h3 className="text-3xl font-black mb-6">Best buyer</h3>
          <div className="w-full h-40 rounded-2xl bg-[#D9D9D9] border-2 border-black mb-4 overflow-hidden shadow-inner" />
          <span className="font-bold text-xl mb-4 text-[#333]">Mango Frappe</span>
          <div className="flex gap-2">
            {["Tag #1", "Tag #2"].map(tag => (
              <span key={tag} className="bg-[#666] text-white px-4 py-1 rounded-lg text-xs font-bold uppercase">{tag}</span>
            ))}
          </div>
          <OrangeTag value={27} />
        </div>

        <Connector />

        {/* Cafe Menu */}
        <div className="relative flex-1 bg-white border-2 border-black rounded-[32px] p-6 flex flex-col items-center">
          <h3 className="text-3xl font-black mb-6">Cafe Menu</h3>
          <div className="w-full flex-1 min-h-[160px] rounded-2xl bg-[#D9D9D9] border-2 border-black shadow-inner" />
          <OrangeTag value={27} />
        </div>
      </div>
    </div>
  );
}