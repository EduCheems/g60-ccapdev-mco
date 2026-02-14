import RadarChart from '../RadarChart';

const categoryColors: Record<string, string> = {
  SOCIABILITY: "#ED7364",
  AMBIENCE: "#8BB091",
  FOOD: "#F1862F",
  CATMOSPHERE: "#6E939D",
  SERVICE: "#ED729F",
};

interface RatingSidebarProps {
  ratings: Record<string, number>;
}

export default function RatingSidebar({ ratings }: RatingSidebarProps) {
  return (
    <div className="w-[380px]">
      <div className="bg-[#FCD24C] rounded-[20px] p-6 border-2 border-black shadow-[5px_5px_0_0_#85522533]">
    
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[2px] w-12 bg-black/20 rounded-full" />
          <h2 className="text-2xl font-poppins font-black uppercase text-[#855225] tracking-tight">
            Ratings
          </h2>
          <div className="h-[2px] w-12 bg-black/20 rounded-full" />
        </div>

        <div className="bg-[#FEF6EA] aspect-square rounded-[20px] mb-8 border-2 border-black flex items-center justify-center overflow-hidden shadow-[inset_4px_4px_1px_rgba(133,82,37,0.4)]">
          <div className="w-[85%] h-[85%]">
            <RadarChart ratings={ratings} />
          </div>
        </div>

        <div className="space-y-4 px-2">
          {Object.entries(ratings).map(([label, value]) => {
            const cleanKey = label.trim().toUpperCase();
            const barColor = categoryColors[cleanKey] || "#ED7364";

            return (
              <div key={label} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-end px-0.5">
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#855225]">
                    {cleanKey}
                  </span>
                  <span className="text-[11px] font-black text-[#855225]">
                    {value}/5
                  </span>
                </div>

                <div className="h-[12px] bg-[#FEF6EA] rounded-full w-full border border-black shadow-[inset_0px_2px_4px_rgba(0,0,0,0.3)] overflow-hidden">
                  <div 
                    className="h-full transition-all duration-1000 ease-out border-r border-black/20 rounded-lg shadow-[inset_2px_4px_0px_rgba(133,82,37,0.4)]" 
                    style={{ 
                      width: `${(value / 5) * 100}%`, 
                      backgroundColor: barColor,
                      backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0.1) 100%)'
                    }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}