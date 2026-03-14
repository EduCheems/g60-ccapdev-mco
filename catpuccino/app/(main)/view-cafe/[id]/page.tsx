import { connectDB } from "@/lib/mongodb";
import CatCafe from "@/models/CatCafe";
import User from "@/models/User";
import Interaction from "@/models/Interaction";
import RatingSidebar from "@/components/view-post/RatingChart";
import SpotlightSection, { CafeMenu }  from "@/components/view-post/Spotlights";
import Ratings from "@/components/view-post/Ratings";
import DiscussionSection from "@/components/DiscussionSection";
import { auth } from "@/auth";
import { getCommentsForPost } from "@/controllers/commentAction";
import Link from "next/link";
import { 
  IoLocationSharp, 
  IoPricetag, 
  IoTime, 
  IoPersonCircle,
  IoChatbubbleOutline 
} from "react-icons/io5";

export const dynamic = "force-dynamic";

export default async function ViewCafePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Connect to MongoDB
  await connectDB(); 

  // 2. Fetch User Session
  const session = await auth();
  let currentUserId = null; 
  if (session?.user?.email) {
    const user = await User.findOne({ email: session.user.email }).lean();
    if (user) currentUserId = user._id.toString();
  }

  // 3. Fetch the cafe
  const dbCafe = await CatCafe.findById(id).lean(); 

  // Handler for 404 error 
  if (!dbCafe) {
    return (
      <div className="min-h-screen bg-[#FBF3DE] flex items-center justify-center font-montserrat">
        <h1 className="text-3xl font-black text-[#855225]">Cafe not found! 😿</h1>
      </div>
    );
  }

  // 4. data map
  const displayData = {
    name: dbCafe.name || "Unknown Cafe",
    content: dbCafe.description || "No description available for this cafe.",
    price: dbCafe.priceRange || "P150 - P400",
    city: dbCafe.location || "Metro Manila",  
    time: dbCafe.operatingHours || "9:00 AM - 9:00 PM",
    ratings: dbCafe.averages || { sociability: 0, ambience: 0, food: 0, work_friendly: 0, service: 0 },
    imageUrl: dbCafe.cafepic || "/images/placeholder-cat.jpg", 
    totalReviews: dbCafe.totalReviews || 0,
    cats:dbCafe.cats,
  };

  const initialComments = await getCommentsForPost(id, currentUserId);

  return (
    <div className="min-h-screen bg-[#FBF3DE] px-24 py-16 font-montserrat">
      <div className="flex gap-16">

        <div className="flex-1">

          {/* Cover image */}
          <div className="w-full aspect-[21/9] bg-[#D9D9D9] border-2 border-black mb-10 overflow-hidden rounded-[10px] shadow-[5px_5px_0_0_#85522533]">
            <img src={displayData.imageUrl} alt="Cafe Hero" className="w-full h-full object-cover rounded-[10px]" />
          </div>

          {/* Main profile */}
          <div className="relative flex-1 bg-[#FEF6EA] border-2 border-[#855225] rounded-[10px] px-6 py-6 flex-col shadow-[5px_5px_0_0_#85522533]">
            
            <h1 className="text-[47px] font-black mb-4 tracking-tighter leading-none text-[#855225] uppercase">
              {displayData.name} Profile
            </h1>

            {/* Headlines */}
            <div className="flex flex-wrap gap-5 mb-5 items-center font-black text-sm uppercase">
              
              {/* Posted By */}
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center">
                  <IoPersonCircle className="text-xl text-[#4A90E2]" />
                </div>
                <div className="flex flex-col mt-1">
                  <span className="text-[10px] leading-none text-[#262626]">Managed By:</span>
                  <span className="text-[10px] text-black/70">Cafe Admin</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center">
                  <IoPricetag className="text-xl text-[#FBBA00]" />
                </div>
                <div className="flex flex-col mt-1 text-[10px]">
                  <span className="leading-none text-[#262626]">Price:</span>
                  <span className="text-black/70">{displayData.price}</span>
                </div>
              </div>

              {/* City */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center">
                  <IoLocationSharp className="text-xl text-[#E11F25]" />
                </div>
                <div className="flex flex-col mt-1 text-[10px]">
                  <span className="leading-none text-[#262626]">City:</span>
                  <span className="text-black/70">{displayData.city}</span>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center">
                  <IoTime className="text-xl text-[#FF7300]" />
                </div>
                <div className="flex flex-col mt-1 text-[10px]">
                  <span className="leading-none text-[#262626]">Time:</span>
                  <span className="text-black/70">{displayData.time}</span>
                </div>
              </div>

              {/* Ratings */}
              <div className="ml-auto flex items-center h-10">
                <Ratings ratings={displayData.ratings} />
              </div>
            </div>

            <div className="border-b-2 border-[#855225] mb-5 w-full" />

            {/* Description */}
            <p className="text-[14px] leading-[1.6] text-[#262626] font-medium text-justify mb-8">
              {displayData.content}
            </p>

            {/* Spotlight */}
            <SpotlightSection 
            name={displayData.cats[0].name} 
            tags={["Cats","cute"]}
            
            />

    
            {/* PROFILE ACTIONS 
            <div className="flex items-center gap-4 mt-8">
            
              <button className="flex items-center gap-2 bg-white text-[#855225] px-6 py-2 rounded-[8px] border-2 border-[#855225] shadow-[4px_4px_0_0_#85522533] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black text-xs uppercase active:scale-95">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Save to Favorites
              </button>

              <a 
                href="#discussion-section"
                className="flex items-center gap-2 bg-[#855225] text-white px-6 py-2 rounded-[8px] border-2 border-[#855225] shadow-[4px_4px_0_0_#26262633] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black text-xs uppercase active:scale-95"
              >
                <IoChatbubbleOutline className="text-lg" />
                Write a Review
              </a>
            </div>
            */}

          </div> 

          {/* Discussion board */}
          <div id="discussion-section" className="mt-12 scroll-mt-8">
            <DiscussionSection 
              initialComments={initialComments} 
              postId={id}
              currentUserId={currentUserId || ""}
            />
          </div>
     
        </div>

        {/* Right side contents */}
        <aside className="w-[380px] flex flex-col gap-8 h-fit">
            <RatingSidebar ratings={displayData.ratings} />
            <CafeMenu />
        </aside>

      </div>
    </div>
  );
}