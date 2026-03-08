import { cafes } from "@/app/data/cafes";
import RatingSidebar from "@/components/view-post/RatingChart";
import SpotlightSection, { CafeMenu } from "@/components/view-post/Spotlights";
import Ratings from "@/components/view-post/Ratings";
import Link from "next/link";

import VoteButtons from "@/components/VoteButtons";
import ReplyButton from "@/components/ReplyButton";
import ReportButton from "@/components/ReportButton";

import { 
  IoLocationSharp, 
  IoPricetag, 
  IoTime, 
  IoCalendarOutline, 
  IoPersonCircle, 
  IoArrowUpOutline, 
  IoArrowDownOutline,
  IoChatbubbleOutline 
} from "react-icons/io5";

export default async function ViewPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cafe = cafes.find((c) => c.slug === id) || cafes[0]; 

  const mockPost = {
    username: "CatLover_PH",
    date: "Feb 15, 2026",
    userRating: { "Cats": 5, "Service": 4, "Ambiance": 5, "Value": 4 },
    content: "I have been struggling to lock in these past few days. I keep getting distracted by mini tasks or get consumed by social media. I am glad to have listened to my friend when they recommended that I should study in this specific cat cafe. At first I was in doubt since how can you lock in on your tasks when there are cats around. But boy, was I in shock when I tried this cafe. Not only did I lock in, but having a cat companion boosted my concentration. If ever I get stuck, I would just pat the cat sitting on my lap which actually helped me think. Definitely would come again. They also study friendly food selection. Foods that aren't too messy to eat.", 
  };

  return (
    <div className="min-h-screen bg-[#FBF3DE] px-24 py-16 font-montserrat">
      <div className="flex gap-16">

        {/* LEFT MAIN CONTENT */}
        <div className="relative flex-1 bg-[#FEF6EA] border-2 border-[#855225] rounded-[10px] px-6 py-6 flex-col shadow-[5px_5px_0_0_#85522533]">
          
          {/* Top Meta Info (Using mockup's brown squares) */}
          <div className="flex gap-8 mb-6">
            <Link href={`/profile/${mockPost.username}`} className="flex gap-3 items-center group">
              <div className="w-10 h-10 bg-[#855225] rounded-[4px] group-hover:scale-105 transition-transform"></div>
              <div className="flex flex-col text-[12px] font-bold leading-tight text-black">
                <span>Posted by</span>
                <span>[{mockPost.username}]</span>
              </div>
            </Link>
            <div className="flex gap-3 items-center">
              
              <div className="flex flex-col text-[12px] text-black font-bold leading-tight">
                <span>Date</span>
                <span>[{mockPost.date}]</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[47px] font-black mb-4 tracking-tighter leading-none text-[#855225]">
              {cafe.title} Review
            </h1>

          {/* Sub Meta Info */}
          <div className="flex items-center gap-8 mb-6 text-[12px] font-bold">
          
          {/* Price */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center">
                    <IoPricetag className="text-xl text-[#FBBA00]" />
                </div>
                <div className="flex flex-col mt-1 text-[10px]">
                    <span className="leading-none text-[#262626]">Price:</span>
                    <span className="text-black/70">{cafe.price}</span>
                </div>
            </div>
            
            {/* City */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center">
                    <IoLocationSharp className="text-xl text-[#E11F25]" />
                </div>
                <div className="flex flex-col mt-1 text-[10px]">
                    <span className="leading-none text-[#262626]">City:</span>
                    <span className="text-black/70">{cafe.city}</span>
                </div>
            </div>
            
            {/* Time */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center">
                    <IoTime className="text-xl text-[#FF7300]" />
                </div>
                <div className="flex flex-col mt-1 text-[10px]">
                    <span className="leading-none text-[#262626]">Time:</span>
                    <span className="text-black/70">{cafe.time}</span>
                </div>
            </div>
            
            {/* Ratings*/}
            <div className="ml-auto flex items-center h-10">
                <Ratings ratings={mockPost.userRating} />
            </div>
        </div>
        
        <div className="border-b-2 border-[#855225] mb-8 w-full" />

          {/* Description */}
          <p className="text-[14px] leading-[1.6] font-medium text-black mb-8 text-justify">
            {mockPost.content}
          </p>

          {/* More about the cafe section */}
          <div className="flex items-center gap-4 mb-1">
            <h3 className="font-black  text-[#855225] text-[18px] whitespace-nowrap">More about the cafe</h3>
            <div className="h-[2px] bg-[#855225] w-full"></div>
          </div>

          {/* Recycled Spotlights & Menu (Moved to Left Side based on Mockup) */}
          <div className="flex flex-wrap gap-6 -mt-2 mb-8 w-full">
            <SpotlightSection />
            <CafeMenu />
          </div>

          {/* Recycled Custom Interaction Buttons */}
          <div className="flex gap-4 mt-auto items-center">
            <VoteButtons initialVotes={67} />
            <ReplyButton replyCount={67} />
            <ReportButton />
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="w-[380px] flex flex-col gap-6 shrink-0">
          
          {/* Address Card (Hardcoded to match mockup since there wasn't a component for this one) */}
          <div className="bg-[#FEF6EA] border-[2px] border-[#855225] rounded-[15px] p-5 flex gap-4 shadow-[5px_5px_0_0_#85522533]">
            <div className="w-16 h-16 bg-[#855225] rounded-[8px] shrink-0"></div>
            <div className="flex flex-col justify-center">
              <h3 className="font-black text-[16px] text-[#855225] leading-tight mb-1">
                Come to {cafe.title} !
              </h3>
              <p className="text-[10px] text-[#855225] font-medium leading-tight">
                <span className="font-black">Address:</span> 2nd Floor, One Archers Place, Taft Ave, Malate, Manila, 1004 Metro Manila
              </p>
            </div>
          </div>

          {/* Recycled Rating Sidebar */}
          <RatingSidebar ratings={cafe.ratings} />
          
        </aside>

      </div>
    </div>
  );
}