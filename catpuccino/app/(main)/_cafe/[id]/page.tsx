import { connectDB } from "@/lib/mongodb";
import CatCafe from "@/models/CatCafe";
import User from "@/models/User";
import RatingSidebar from "@/components/view-post/RatingChart";
import SpotlightSection, { CafeMenu } from "@/components/view-post/Spotlights";
import Ratings from "@/components/view-post/Ratings";
import DiscussionSection from "@/components/DiscussionSection";
import { auth } from "@/auth";
import { getCommentsForPost } from "@/controllers/commentAction";
import { 
  IoLocationSharp, 
  IoPricetag, 
  IoTime, 
  IoPersonCircle 
} from "react-icons/io5";
import { Cafe } from "@/app/data/cafes";

export const dynamic = "force-dynamic";

export default async function ViewCafePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB(); 

  const session = await auth();
  
  let currentUserId: string | null = null;

  if (session?.user?.email) {
    const user = await User.findOne({ email: session.user.email }).lean();
    if (user) currentUserId = user._id.toString();
  }

  const dbCafe = await CatCafe.findById(id).lean(); 

  if (!dbCafe) {
    return (
      
      <div className="min-h-screen bg-[#FBF3DE] flex flex-col items-center justify-center font-montserrat">
        <h1 className="text-9xl text-red-600 font-black">THIS IS THE CAFE FOLDER</h1>
        <h1 className="text-3xl font-black text-[#855225]">CAFE NOT FOUND! 😿</h1>
        <p className="text-[#855225]/60 mt-2">The ID "{id}" does not exist.</p>
        <a href="/home" className="mt-4 underline font-bold text-[#855225]">Return Home</a>
      </div>
    );
  }

  const displayData = {
    name: dbCafe.name,
    content: dbCafe.description,
    price: dbCafe.priceRange || "P150 - P400",
    city: dbCafe.location || "Metro Manila",  
    time: dbCafe.operatingHours || "9:00 AM - 9:00 PM",
    ratings: dbCafe.averages,
    cafepic: dbCafe.cafepic || "/images/placeholder-cat.jpg", 
    totalReviews: dbCafe.totalReviews || 0,
  };

  const initialComments = await getCommentsForPost(id, currentUserId as any);

  return (
    <div className="min-h-screen bg-[#FBF3DE] px-24 py-16 font-montserrat text-[#855225]">
      <div className="flex gap-16">
        <div className="flex-1">
          {/* Hero Image */}
          <div className="w-full aspect-[21/9] bg-[#D9D9D9] border-2 border-black mb-10 overflow-hidden rounded-[10px] shadow-[5px_5px_0_0_#85522533]">
            <img src={displayData.cafepic} alt="Cafe Hero!!" className="w-full h-full object-cover rounded-[10px]" />
          </div>

          {/* Main Card */}
          <div className="relative flex-1 bg-[#FEF6EA] border-2 border-[#855225] rounded-[10px] px-8 py-8 flex-col shadow-[5px_5px_0_0_#85522533]">
            <h1 className="text-[47px] font-black mb-4 tracking-tighter leading-none uppercase">
              {displayData.name}
            </h1>

            <div className="flex flex-wrap gap-5 mb-5 items-center font-black text-sm uppercase">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center">
                  <IoPricetag className="text-xl text-[#FBBA00]" />
                </div>
                <div className="flex flex-col mt-1">
                  <span className="text-[10px] leading-none">Price:</span>
                  <span className="text-[10px] opacity-70">{displayData.price}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center">
                  <IoLocationSharp className="text-xl text-[#E11F25]" />
                </div>
                <div className="flex flex-col mt-1">
                  <span className="text-[10px] leading-none">City:</span>
                  <span className="text-[10px] opacity-70">{displayData.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center">
                  <IoTime className="text-xl text-[#FF7300]" />
                </div>
                <div className="flex flex-col mt-1">
                  <span className="text-[10px] leading-none">Time:</span>
                  <span className="text-[10px] opacity-70">{displayData.time}</span>
                </div>
              </div>

              <div className="ml-auto flex items-center h-10">
                <Ratings ratings={displayData.ratings} />
              </div>
            </div>

            <div className="border-b-2 border-[#855225] mb-5 w-full opacity-20" />

            <p className="text-[15px] leading-relaxed font-medium text-justify mb-8">
              {displayData.content}
            </p>

            <SpotlightSection name={displayData.name} tags={["Amazing"]} />
          </div> 

          <div id="discussion-section" className="mt-12 scroll-mt-8">
            <h2 className="font-black text-[30px] uppercase tracking-tighter mb-6">
               Reviews ({displayData.totalReviews})
            </h2>
            <DiscussionSection 
            initialComments={initialComments} 
            postId={id}
            currentUserId={currentUserId || ""} 
            />
          </div>
        </div>

        <aside className="w-[380px] flex flex-col gap-8 h-fit">
            <RatingSidebar ratings={displayData.ratings} />
            <CafeMenu />
        </aside>
      </div>
    </div>
  );
}