import HeroSection from "@/components/HeroSection";
import BestCafes from "@/components/BestCafes";
import MarqueeBand from "@/components/MarqueeBand";
import CategoryIcon from "@/components/CategoryIcon";
import PostCarousel from "@/components/PostCarousel";
import CatCafe from "@/models/CatCafe";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import User from "@/models/User";
import Interaction from "@/models/Interaction";
import { auth } from "@/auth";
import { Cafe } from "@/app/data/cafes";

export const dynamic = "force-dynamic";

export default async function DiscoverPage() {
  
  // 1. Connect to DB
  await connectDB();
  
  const _forceRegister = CatCafe;

  // 2. Handle Authentication
  const session = await auth();
  let currentUserId = null;
  if (session?.user?.email) {
    const user = await User.findOne({ email: session.user.email }).lean();
    if (user) currentUserId = user._id.toString();
  }

  // 3. Fetch Data & Map
  const [postDocs, cafeDocsRaw] = await Promise.all([
    Post.find().populate("cafeID").sort({ createdAt: -1 }).limit(10).lean(),
    CatCafe.find().lean() 
  ]);

  // updated mapping from mongodb 
  const cafeDocs: Cafe[] = cafeDocsRaw.map((cafe: any) => ({
    _id: cafe._id.toString(),
    ownerID: cafe.ownerID?.toString() || "",
    name: cafe.name || "Uknown Cafe",
    description: cafe.description || "A cozy spot for coffee and cats.",
    location: cafe.location || "Unknown City",
    operatingHours: cafe.operatingHours || "N/A",
    priceRange: cafe.priceRange || "₱0",
    averages: cafe.averages || {
      sociability: 0,
      ambience: 0,
      food: 0,
      work_friendly: 0,
      service: 0
    },
    totalReviews: cafe.totalReviews || 0,
    cats: cafe.cats || [],
    menu: cafe.menu || [],
    cafepic:cafe.cafepic ||"/defaut-cafe.png",
  }));

  // 4. Fetch user's votes for the posts
  let userInteractions: any[] = [];
  if (currentUserId) {
    const postIds = postDocs.map(p => p._id);
    userInteractions = await Interaction.find({
      userID: currentUserId,
      targetID: { $in: postIds },
      targetType: "Post"
    }).lean();
  }

  const voteMap: Record<string, "up" | "down" | null> = {};
  userInteractions.forEach(interaction => {
    voteMap[interaction.targetID.toString()] = 
      interaction.voteValue === 1 ? "up" : interaction.voteValue === -1 ? "down" : null;
  });

  // 5. Format Posts & Fetch Comments
  const realPosts = await Promise.all(
    postDocs.map(async (post) => {
      const commentsDocs = await Comment.find({ postID: post._id, parentCommentID: null, isDeleted: false })
        .sort({ createdAt: -1 })
        .limit(2)
        .lean();

      let commentVoteMap: Record<string, "up" | "down" | null> = {};
      if (currentUserId && commentsDocs.length > 0) {
        const commentIds = commentsDocs.map(c => c._id);
        const commentInteractions = await Interaction.find({
          userID: currentUserId,
          targetID: { $in: commentIds },
          targetType: "Comment" 
        }).lean();

        commentInteractions.forEach(i => {
          commentVoteMap[i.targetID.toString()] = i.voteValue === 1 ? "up" : i.voteValue === -1 ? "down" : null;
        });
      }

      const postCommentCount = await Comment.countDocuments({ postID: post._id, isDeleted: false });

      return {
        _id: post._id.toString(),
        title: post.title,
        authorName: post.authorName,
        createdAt: post.createdAt,
        upvoteCount: post.upvoteCount || 0,
        downvoteCount: post.downvoteCount || 0,
        userVote: voteMap[post._id.toString()] || null,
        body: post.body,
        commentCount: postCommentCount,
        cafeID: post.cafeID ? {
            name: post.cafeID.name,
            priceRange: post.cafeID.priceRange,
            location: post.cafeID.location,
        } : null,
        comments: await Promise.all(commentsDocs.map(async (c: any) => {
          const replyCount = await Comment.countDocuments({ parentCommentID: c._id, isDeleted: false });
          return {
            _id: c._id.toString(),
            authorName: c.userID?.username || "Anonymous", 
            timeAgo: new Date(c.createdAt).toLocaleDateString(), 
            content: c.content, 
            body: c.content, 
            upvoteCount: c.upvoteCount || 0,
            downvoteCount: c.downvoteCount || 0,
            userVote: commentVoteMap[c._id.toString()] || null, 
            replyCount: replyCount
          };
        })),
      };
    })
  );

  return (
    <div className="min-h-screen bg-[#D5AE85] flex flex-col">
      <HeroSection />

      {/* Definition */}
      <div id="catpuccino-definition" className="bg-[#FEF6EA] h-[320px] w-full flex flex-col justify-center px-[140px]">
        <h2 className="text-[#855225] font-poppins font-black text-[20px] uppercase">What's the deal with</h2>
        <h2 className="text-[#855225] font-poppins font-black text-[50px] uppercase">Catpuccino?</h2>
        <p className="w-[475px] text-[#262626] mt-4">
          Catpuccino is your go-to platform to discover, review, and connect with cat cafes in the Philippines.
        </p>
      </div>

      <section className="h-[642px] bg-[#FBF3DE] py-16 px-[140px] text-center">
        {/* Header */}
        <div className="pt-[25px] flex items-center justify-center gap-8 mb-12">
           <div className="h-[2px] flex-1 bg-[#855225] opacity-30"></div>
           <h2 className="text-[#855225] font-poppins font-black text-5xl uppercase">The best spots!!!</h2>
           <div className="h-[2px] flex-1 bg-[#855225] opacity-30"></div>
        </div>

        {/* Categories*/}
        <div className="grid grid-cols-6 gap-6">
          {["SOCIAL SPOTS", "AESTHETIC PICK", "FLAVOR FAVORITES", "FOCUS ZONES", "GOATED SERVICES", "GATEKEPT GEMS"].map((title, i) => (
             <div key={i} className="flex flex-col items-center group cursor-pointer">
               <CategoryIcon title={title} />
               <h3 className="text-[#D26500] font-poppins font-black text-sm uppercase mt-4">{title}</h3>
             </div>
          ))}
        </div>
      </section>

      {/* Main Content with Cafes and Posts */}
      <section className="bg-[#FEF6EA]">
        <MarqueeBand text="GENERAL MUNCHKIN'S SOCIAL SPOTS" bgColor="bg-[#EE7D6C]" />
        <BestCafes cafes={cafeDocs} filterKey="sociability" cardColor="bg-[#ED7364]" badgeText="People Friendly" badgeColor="bg-[#ED7364]" />
        <PostCarousel posts={realPosts} variant="thread"/>

        <MarqueeBand text="OPPIE GOOPEY’S AESTHETIC PICKS" bgColor="bg-[#73A659]" />
        <BestCafes cafes={cafeDocs} filterKey="ambience" cardColor="bg-[#87AE73]" badgeText="Aesthetic" badgeColor="bg-[#87AE73]" />
        <PostCarousel posts={realPosts} variant="collage"/>

        <MarqueeBand text="CHONKY’S FLAVOR FAVORITES" bgColor="bg-[#EC6B00]" />
        <BestCafes cafes={cafeDocs} filterKey="food" cardColor="bg-[#FF7300]" badgeText="Best Foods" badgeColor="bg-[#FF7300]" />
        <PostCarousel posts={realPosts}/>
      </section>

      <div className="h-[400px] w-full bg-[#FCD24C]" />
    </div>
  );
}