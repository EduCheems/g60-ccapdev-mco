import { cafes } from "@/app/data/cafes";
import RatingSidebar from "@/components/view-post/RatingChart";
import Comments from "@/components/CommentCard";
import SpotlightSection, { CafeMenu } from "@/components/view-post/Spotlights";
import { 
  IoLocationSharp, 
  IoPricetag, 
  IoTime, 
  IoCalendarOutline, 
  IoPersonCircle, 
  IoArrowUpOutline, 
  IoArrowDownOutline 
} from "react-icons/io5";
import Ratings from "@/components/view-post/Ratings";
 "react-icons/io5";

export default async function ViewPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Placeholder: Finding the cafe the post is about
  const cafe = cafes[0]; 

  // MOCK POST DATA (Specific to one user's experience)
  const mockPost = {
    username: "CatLover_PH",
    date: "Feb 15, 2026",
    userRating: {
      "Cats": 5,
      "Service": 4,
      "Ambiance": 5,
      "Value": 4,
    },
    content: "I have been struggling to lock in these past few days... [Rest of your description text]",
    imageUrl: "/cafe-imgs/hero.png" // The image the user uploaded
  };

  return (
    <div className="min-h-screen bg-[#FBF3DE] px-24 py-16">
      <div className="flex gap-16">

        {/* LEFT COLUMN */}
        <div className="flex-1">

          {/* POST IMAGE */}
          <div className="w-full aspect-[21/9] bg-[#D9D9D9] border-2 border-black mb-10 overflow-hidden rounded-[10px] shadow-[5px_5px_0_0_#85522533]">
            <img
              src={cafe.imageUrl}
              alt="User Post"
              className="w-full h-full object-cover rounded-[10px]" 
            />
          </div>

          <div className="relative flex-1 bg-[#FEF6EA] border-2 border-[#855225] rounded-[10px] px-6 py-6 flex-col shadow-[5px_5px_0_0_#85522533]">
            
            {/* POST TITLE / USER HEADER */}
            <h1 className="text-[47px] font-black mb-4 tracking-tighter leading-none text-[#855225] ">
              {cafe.title} Review
            </h1>

            {/* METADATA (Post Specific) */}
            <div className="flex gap-5 mb-5 items-center font-black text-sm uppercase">
              
{/* AUTHOR & DATE (Existing) */}
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center shadow-[5px_5px_0_0_#85522533]">
      <IoPersonCircle className="text-xl text-[#4A90E2]" />
    </div>
    <div className="flex flex-col mt-1">
      <span className="text-[12px] leading-none">Posted By:</span>
      <span className="text-[10px] text-black/70">{mockPost.username}</span>
    </div>
  </div>

  <div className="flex items-center gap-3">
    <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center shadow-[5px_5px_0_0_#85522533]">
      <IoCalendarOutline className="text-xl text-[#FF7300]" />
    </div>
    <div className="flex flex-col mt-1">
      <span className="text-[12px] leading-none">Date:</span>
      <span className="text-[10px] text-black/70">{mockPost.date}</span>
    </div>
  </div>

  {/* VOTING FEATURE */}
  <div className="flex items-center ml-4">
    <div className="flex items-center bg-white border-2 border-black rounded-[6px] shadow-[5px_5px_0_0_#85522533] overflow-hidden">
      {/* UPVOTE */}
      <button className="px-3 py-1.5 hover:bg-green-100 transition-colors group border-r-2 border-black">
        <IoArrowUpOutline className="text-xl group-hover:text-green-600 transition-colors" />
      </button>
      
      {/* COUNT */}
      <span className="px-4 font-black text-lg tabular-nums">
        124
      </span>
      
      {/* DOWNVOTE */}
      <button className="px-3 py-1.5 hover:bg-red-100 transition-colors group border-l-2 border-black">
        <IoArrowDownOutline className="text-xl group-hover:text-red-600 transition-colors" />
      </button>
    </div>
  </div>

  {/* USER'S SCORE (Stays right) */}
  <div className="ml-auto flex items-center h-10">
    <Ratings ratings={mockPost.userRating} />
  </div>
</div>
            

            {/* DESCRIPTION */}
            <div className="-mb-6">
              <p className="text-[14px] leading-[1.6] text-[#262626] font-medium text-justify">
                {mockPost.content}
              </p>
            </div>

            <SpotlightSection />
          </div>

          {/* COMMENTS SECTION */}
          <div className="flex items-center mt-10 mb-2">
            <h2 className="font-montserrat font-bold text-[30px] text-[#855225] uppercase tracking-tighter">
              Discussion (12)
            </h2>
          </div>
          <Comments reviews={[]} /> 
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="w-[380px] flex flex-col gap-8 h-fit">
            <RatingSidebar ratings={cafe.ratings} />
            <CafeMenu />
        </aside>

      </div>
    </div>
  );
}