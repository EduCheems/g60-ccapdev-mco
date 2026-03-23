import RatingSidebar from "@/components/view-post/RatingChart";
import SpotlightSection, { CafeMenu } from "@/components/view-post/Spotlights";
import Ratings from "@/components/view-post/Ratings";
import Link from "next/link";
import CatCafe from "@/models/CatCafe";
import Interaction from "@/models/Interaction";
import InfoTag from "@/components/InfoTag"; 
import PostActions from "@/components/PostActions";
import CommentThread from "@/components/CommentThread";
import DiscussionSection from "@/components/DiscussionSection";
import { auth } from "@/auth";
import { getCommentsForPost } from "@/controllers/commentAction";
import PostControls from "@/components/view-post/PostControls";

import { 
  IoLocationSharp, 
  IoPricetag, 
  IoTime, 
  IoPersonCircle, 
  IoArrowUpOutline, 
  IoArrowDownOutline,
  IoChatbubbleOutline 
} from "react-icons/io5";

import { connectDB } from "@/lib/mongodb"; 
import Post from "@/models/Post"; 
import Comment from "@/models/Comment"; 
import User from "@/models/User";

export const dynamic = "force-dynamic";

export default async function ViewPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  await connectDB();

  // 1. Fetch the Session and the Post
  const [session, postDoc] = await Promise.all([
    auth(),
    Post.findById(id).populate('cafeID').lean()
  ]);

  if (!postDoc) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-2xl">Post not found in database!</div>;
  }

  // 2. Resolve the User ID
  let currentUserId = null; 
  if (session?.user?.email) {
    
    const user = await User.findOne({ email: session.user.email }).select('_id').lean();
    if (user) currentUserId = user._id.toString(); 
  }

  // 3. Fetch Comments, Comment Count, and User Vote 
  const [initialComments, totalComments, postInteraction] = await Promise.all([
    getCommentsForPost(id, currentUserId),
    Comment.countDocuments({ postID: id, isDeleted: false }),
    currentUserId 
      ? Interaction.findOne({ userID: currentUserId, targetID: id, targetType: "Post" }).lean() 
      : Promise.resolve(null)
  ]);

  // 4. Map the data for your frontend components
  let currentUserVote: "up" | "down" | null = null; 
  if (postInteraction) {
    currentUserVote = postInteraction.voteValue === 1 ? "up" : postInteraction.voteValue === -1 ? "down" : null; 
  }

  const initialVotes = (postDoc.upvoteCount || 0) - (postDoc.downvoteCount || 0);
  const isAuthor = currentUserId === postDoc.userID?.toString();
  const post = JSON.parse(JSON.stringify(postDoc));

  const cafeData = postDoc.cafeID || {};
  const cafeName = cafeData.name || "Unknown Cafe";
  const cafePrice = cafeData.priceRange || "N/A"; 
  const cafeCity = cafeData.location || "N/A";    
  const cafeTime = cafeData.operatingHours || "N/A";

  return (
    <div className="min-h-screen bg-[#FBF3DE] px-24 py-16 font-montserrat">
      <div className="flex gap-16">

        <div className="relative flex-1 bg-[#FEF6EA] border-2 border-[#855225] rounded-[10px] px-6 py-6 flex-col shadow-[5px_5px_0_0_#85522533]">
          
          <div className="flex gap-8 mb-6 w-full">
            <Link href={`/profile/${postDoc.authorName}`} className="flex gap-3 items-center group">
              <div className="w-10 h-10 bg-[#855225] rounded-[4px] group-hover:scale-105 transition-transform"></div>
              <div className="flex flex-col text-[12px] font-bold leading-tight text-black">
                <span>Posted by</span>
                <span>[{postDoc.authorName}]</span>
              </div>
            </Link>
            <div className="flex gap-3 items-center">
              
              <div className="flex flex-col text-[12px] text-black font-bold leading-tight">
                <span>Date</span>
                <span>[{new Date(postDoc.createdAt).toLocaleDateString()}]</span>
              </div>
            </div>

            {isAuthor && <PostControls postId={id} />}
          </div>

          {/* Title */}
          <h1 className="text-[47px] font-black mb-4 tracking-tighter leading-none text-[#855225]">
              {postDoc.title}
          </h1>

          {/* Sub Meta Info */}
          <div className="flex items-center gap-8 mb-6 text-[12px] font-bold">
          
            {/* Price */}
            <InfoTag 
              icon={IoPricetag}
              iconColor="text-[#FBBA00]"
              label="Price"
              value={cafePrice}
            />
            
            {/* City */}
            <InfoTag 
              icon={IoLocationSharp}
              iconColor="text-[#E11F25]"
              label="City"
              value={cafeCity}
            />
            
            {/* Time */}
            <InfoTag 
              icon={IoTime}
              iconColor="text-[#FF7300]"
              label="Time"
              value={cafeTime}
            />
            
            <div className="ml-auto flex items-center h-10">
                <Ratings ratings={{ "Overall": postDoc.overallRating }} />
            </div>
        </div>
        
        <div className="border-b-2 border-[#855225] mb-8 w-full" />

          {/* Description */}
          <p className="text-[14px] leading-[1.6] font-medium text-black mb-8 text-justify whitespace-pre-line">
            {postDoc.body}
          </p>

          <div className="flex items-center gap-4 mb-1">
            <h3 className="font-black text-[#855225] text-[18px] whitespace-nowrap">More about the cafe</h3>
            <div className="h-[2px] bg-[#855225] w-full"></div>
          </div>

          <div className="flex flex-wrap gap-6 -mt-2 mb-8 w-full">
            <SpotlightSection 
            catName={postDoc.catName||"Alberto"} 
            foodName={postDoc.foodName||"Orange"}
            catImage={postDoc.catImage||"/default-CatImage.png"} 
            foodImage={postDoc.foodImage||"/default-FoodImage.png"}/>

            <CafeMenu />
          </div>

          <PostActions 
             postId={post._id} 
             initialVotes={initialVotes} 
             replyCount={totalComments} 
             initialUserVote={currentUserVote}
             currentUserId={currentUserId || ""}
          />

          <DiscussionSection 
            initialComments={initialComments} 
            postId={post._id}
            currentUserId={currentUserId || ""}
          />

        </div>

        <aside className="w-[380px] flex flex-col gap-6 shrink-0">
          
          <div className="bg-[#FEF6EA] border-[2px] border-[#855225] rounded-[15px] p-5 flex gap-4 shadow-[5px_5px_0_0_#85522533]">
            <div className="w-16 h-16 bg-[#855225] rounded-[8px] shrink-0"></div>
            <div className="flex flex-col justify-center">
              <h3 className="font-black text-[16px] text-[#855225] leading-tight mb-1">
                Come to {cafeName} !
              </h3>
              <p className="text-[10px] text-[#855225] font-medium leading-tight">
                <span className="font-black">Address:</span> {cafeCity}
              </p>
            </div>
          </div>

          <RatingSidebar 
            ratings={{ 
              "Sociability": postDoc.ratings?.sociability || 0, 
              "Ambience": postDoc.ratings?.ambience || 0, 
              "Food": postDoc.ratings?.food || 0, 
              "Catmosphere": postDoc.ratings?.catmosphere || 0, 
              "Service": postDoc.ratings?.service || 0
            }} 
          />
          
        </aside>

      </div>
    </div>
  );
}