// components/view-post/PostContent.tsx
import { IoPricetag, IoLocation, IoTime, IoStar } from "react-icons/io5";

interface ContentProps {
  price: string;
  city: string;
  time: string;
  rating: number;
  reviewCount: number; // Added to match function props
  body: string;        // Changed from 'description' to 'body' to match function props
}

export default function PostContent({ price, city, time, rating, reviewCount, body }: ContentProps) {
  return (
    <div className="max-w-[850px]">
      {/* Metadata Row */}
      <div className="flex flex-wrap items-center gap-8 mb-8">
        
        {/* Price */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#855225] rounded-lg text-white flex items-center justify-center text-xl">
            <IoPricetag />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black text-[#855225]/60 leading-tight">Price</p>
            <p className="font-bold text-[#855225] text-sm">{price}</p>
          </div>
        </div>

        {/* City */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#855225] rounded-lg text-white flex items-center justify-center text-xl">
            <IoLocation />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black text-[#855225]/60 leading-tight">City</p>
            <p className="font-bold text-[#855225] text-sm">{city}</p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#855225] rounded-lg text-white flex items-center justify-center text-xl">
            <IoTime />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black text-[#855225]/60 leading-tight">Time</p>
            <p className="font-bold text-[#855225] text-sm">{time}</p>
          </div>
        </div>
        
        {/* Stars - Styled like your reference image */}
        <div className="ml-auto flex items-center gap-2">
          <div className="flex text-[#FCD24C] text-2xl drop-shadow-[0_1.5px_0_rgba(0,0,0,1)]">
            {[...Array(5)].map((_, i) => (
              <IoStar key={i} className={i < Math.floor(rating) ? "text-[#FCD24C]" : "text-gray-300"} />
            ))}
          </div>
          <span className="font-black text-2xl text-black ml-2">{rating.toFixed(1)}</span>
          <span className="font-bold text-black/40 text-xl">({reviewCount})</span>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-lg font-medium leading-relaxed text-black/80 whitespace-pre-line">
        {body}
      </p>
    </div>
  );
}
