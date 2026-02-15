import Link from "next/link";
import { 
  IoArrowUpOutline, 
  IoArrowDownOutline, 
  IoChatbubbleOutline, 
  IoPersonCircle 
} from "react-icons/io5";
import Ratings from "@/components/view-post/Ratings"; 

interface PostPreviewProps {
  id: string;
  cafeName: string;
  rating: number;    
  content: string;
  username: string;
  price: string;       
  city: string;        
  time: string;       
  userRating?: Record<string, number>; 
  image?: string;
}

export default function PostPreview({ 
  id, cafeName, content, username, userRating, image 
}: PostPreviewProps) {
  
  const defaultRatings = userRating || { "Cats": 5, "Service": 4, "Ambiance": 5, "Value": 4 };

  return (
    <Link href={`/view-post/${id}`} className="block group mb-6">
      <div className="bg-[#FEF6EA] border-2 border-black rounded-[12px] shadow-[8px_8px_0_0_#85522533] group-hover:shadow-none group-hover:translate-x-[4px] group-hover:translate-y-[4px] transition-all flex items-center h-[220px] p-4 gap-6">
        
        <div className="w-[240px] h-full bg-[#D9D9D9] border-2 border-black rounded-[10px] overflow-hidden flex-shrink-0 shadow-[4px_4px_0_0_#85522533]">
          <img 
            src={image || "/cafe-imgs/placeholder.png"} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            alt={cafeName} 
          />
        </div>

        <div className="flex-1 flex flex-col p-5 min-w-0">
          
          <div className="mb-3">
            <h3 className="font-poppins font-bold text-2xl text-[#855225] uppercase tracking-tighter italic truncate">
              {cafeName}
            </h3>
          </div>

          <div className="flex items-center gap-6 mb-4">
      
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center flex-shrink-0">
                <IoPersonCircle className="text-xl text-[#4A90E2]" />
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] leading-none font-black text-[#262626] uppercase">
                  Posted By:
                </span>
                <span className="text-[10px] text-black/70 font-bold">
                  {username}
                </span>
              </div>
            </div>

            <div className="flex items-center h-10 scale-[0.85] origin-left ml-10">
              <Ratings ratings={defaultRatings} />
            </div>
          </div>

          <p className="text-[13px] text-[#262626] line-clamp-2 font-medium leading-snug bg-black/5 p-2 rounded-md border-l-4 border-[#855225] mb-auto">
            "{content}"
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center bg-white border-2 border-[#855225] rounded-[8px] overflow-hidden shadow-[3px_3px_0_0_#85522533]">
              <div className="px-2 py-1 border-r border-[#855225] hover:bg-green-50 transition-colors">
                <IoArrowUpOutline className="text-[#855225]" />
              </div>
              <span className="px-3 font-black text-[#855225] text-xs tabular-nums">124</span>
              <div className="px-2 py-1 border-l border-[#855225] hover:bg-red-50 transition-colors">
                <IoArrowDownOutline className="text-[#855225]" />
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#855225] text-white px-3 py-1.5 rounded-[8px] border-2 border-black shadow-[3px_3px_0_0_#00000033] font-black text-[9px] uppercase hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">
              <IoChatbubbleOutline className="text-sm" />
              12 Comments
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
}