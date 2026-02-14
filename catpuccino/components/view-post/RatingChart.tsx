// components/view-post/RatingSidebar.tsx
import RadarChart from '../RadarChart';

export default function RatingChart({ ratings }: { ratings: any }) {
  // Sum of all ratings for the "Total Power Level"
  const totalPower = Object.values(ratings).reduce((a: any, b: any) => a + b, 0) as number;

  return (
    <div className="w-[400px] flex flex-col gap-6">

      <div className="bg-white border-2 border-black rounded-2xl p-4 flex gap-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        <div className="w-16 h-16 bg-[#444] rounded-xl flex-shrink-0" />
        <div className="flex flex-col justify-center">
          <h3 className="font-black text-lg leading-tight uppercase">MewMew Cafe</h3>
          <p className="text-[9px] font-bold text-gray-500 leading-tight mt-1 uppercase">
            Address: 2nd Floor, One Archers Place, Taft Ave, Malate, Manila, 1004 Metro Manila
          </p>
        </div>
      </div>

      <div className="bg-white border-2 border-black rounded-[40px] p-8 relative flex flex-col items-center">
        <h2 className="text-4xl font-black uppercase mb-8">Ratings</h2>
        
        <div className="w-full aspect-square bg-[#D9D9D9] rounded-3xl mb-8 border-2 border-black relative overflow-hidden">
           <RadarChart ratings={ratings} />
        </div>

        <div className="w-full space-y-4">
          {Object.entries(ratings).map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-xs font-black uppercase tracking-widest">{label}</span>
              <div className="h-4 bg-gray-100 rounded-full border border-black/10 overflow-hidden">
                <div 
                  className="h-full bg-black/20" 
                  style={{ width: `${((value as number) / 5) * 100}%` }} 
                />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute -bottom-4 left-8 bg-[#FF4500] text-white font-black px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-2xl">
          {totalPower}
        </div>
      </div>
    </div>
  );
}