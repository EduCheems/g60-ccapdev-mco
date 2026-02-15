import Link from 'next/link';
import { IoLocationSharp, IoPricetag } from "react-icons/io5";

interface CafeCardProps {
  id: string; 
  name: string;
  slug: string;
  index: number; 
  cardColor: string; 
  badgeText: string; 
  badgeColor: string; 
}

const getRankStyle = (index: number) => {
  switch (index) {
    case 0: // Rank 1
      return "from-yellow-300 to-yellow-600 border-yellow-100 shadow-[0_0_10px_rgba(253,224,71,0.5)]";
    case 1: // Rank 2
      return "from-slate-200 to-slate-400 border-slate-100 shadow-[0_0_10px_rgba(226,232,240,0.5)]";
    case 2: // Rank 3
      return "from-orange-300 to-orange-600 border-orange-100 shadow-[0_0_10px_rgba(234,88,12,0.3)]";
    default: // Rank 4-10
      return "bg-[#D1D1D1] border-white/30 text-white shadow-none backdrop-blur-[2px]";
  }
};

export default function CafeCard({ id, name, slug, index, cardColor, badgeText, badgeColor }: CafeCardProps) {
  
  return (
    <Link href={`/cafe/${id}`} className="flex-shrink-0 snap-center block">
      <div className={`w-[331px] h-[450px] rounded-[28px] p-5 ${cardColor} relative overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] flex flex-col border-2 border-[#662002]`}>
      
        <div className="relative z-10 w-full h-[220px] bg-white rounded-[16px] overflow-hidden mb-4 shadow-inner">
  
           <div className={`absolute top-3 right-3 ${badgeColor} px-4 py-1.5 rounded-2xl text-[11px] text-white font-bold shadow-sm`}>
             {badgeText}
           </div>
           
            <div className={`absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center font-black text-lg border-2 z-20 bg-gradient-to-br transition-all duration-300 ${getRankStyle(index)}`}>
             {index + 1}
           </div>
        </div>

        {/* 2. TEXT CONTENT */}
        <div className="relative z-10 px-1 flex flex-col flex-1">

          <h3 className="font-poppins text-3xl font-black text-white mb-2 leading-tight">
            {name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex text-yellow-400 text-xl">★★★★★</div>
            <span className="text-xl font-bold text-white ml-2">5.0</span>

            <div className="ml-3 bg-gradient-to-r from-[#FDF68C] to-[#F4CD2A] text-[9px] px-3 py-1 font-bold text-gray-800 relative">
               Very Good!
               <div
                className="absolute -left-[5px] top-0 h-[12px] w-[12px] bg-[#FFF0A0] mt-1 -ml-1.5"
                style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
               />
            </div>
          </div>

          <div className="flex items-center gap-4 text-white/90 mb-4">
      
             <div className="flex items-center gap-1">
                <div className="h-[25px] w-[25px] bg-white rounded-[3px] flex items-center justify-center">
                  <IoLocationSharp className="h-[18px] w-[18px] text-lg text-[#E11F25]" />
                </div>
                <span className="font-montserrat text-xs font-bold tracking-tight">Manila City</span>
             </div>

             <div className="w-[1px] h-3 bg-white/30"></div>

             <div className="flex items-center gap-1">
                <div className="h-[25px] w-[25px] bg-white rounded-[3px] flex items-center justify-center">
                  <IoPricetag className="h-[18px] w-[18px] text-lg text-[#FBBA00]" />
                </div>
                <span className="font-montserrat text-xs font-bold tracking-tight">₱ 100 - ₱ 500</span>
             </div>
          </div>

          <div className="mt-auto flex justify-between items-end">
            <div className="text-[13px] text-white/90 font-medium">
                <p><span className="font-bold">Hours:</span> 9 AM to 9 PM</p>
                <p><span className="font-bold">Open:</span> Everyday</p>
            </div>
            
            <div className="w-12 h-12 bg-[#E11F25] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
               <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                 <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
               </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}