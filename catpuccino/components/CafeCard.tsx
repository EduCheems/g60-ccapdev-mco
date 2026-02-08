// components/CafeCard.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

interface CafeCardProps {
  name: string;
  slug: string;
  imageSrc?: string; 
  rating?: number; 
  ratingLabel?: string;
  price?: string; 
  schedule?: string; 
  hours?: string; 
  openDays?: string; 
  index: number;
  cardColor?: string;
  bgSvg?: ReactNode; 
}

export default function CafeCard({ name, slug, imageSrc, rating = 0.0, ratingLabel = "Very Good", price= "200-500", schedule= "8am-8pm", hours= "9:00 AM - 11:00 AM", openDays="Monday to Friday", index, cardColor, bgSvg }: CafeCardProps) {

  return (
    <Link href={`/discover/${slug}`} className="flex-shrink-0 snap-center">
        <div className={`w-[280px] h-[415px] rounded-2xl p-6 relative overflow-hidden ${cardColor ?? ""}`}>

          <div className="absolute inset-0 z-0 pointer-events-none">
          {bgSvg}
        </div>

        {/* Image section */}
        <div className="relative -ml-1 mt-10 z-10 w-[247px] h-[186px] bg-white rounded-[16px] overflow-hidden mb-4 border-4 border-[#331608]">

            {/* Ranking badge */}
            <div className="absolute w-[40px] h-[40px] -ml-1 -mt-1 top-4 left-4 w-12 h-12 bg-gray-600/80 backdrop-blue-sm rounded-full flex items-center border-2 border-[#331608] justify-center text-white font-fredoka text-xl">
              {index + 1}
            </div>

            {/* Ranking label */}
            <div className="absolute w-[70px] h-[18px] top-4 right-4 bg-gray-600/80 backdrop-blue-sm mt-2 pt-0.5 px-1.0 pl-1 border-[#331608] border-2 rounded-[6px] text-[8px] text-white font-bold">
              People friendly
            </div>
          
            {/* Image placeholder */}
            {imageSrc ? (
            <img src={imageSrc} alt={name} className="h-36 w-full object-cover rounded-2xl" /> ) : (
              <div className="h-36 w-full bg-white/20 rounded-2xl" />
            )}

        </div>

        {/* INFO SECTION */}
        <div className="relative z-10  flex flex-col gap-1">
          <h3 className="font-montserat text-[22px] font-extrabold text-sticker -mt-2 ml-1">
            {name}
          </h3>



        </div>



      </div>
    </Link>
  );
}