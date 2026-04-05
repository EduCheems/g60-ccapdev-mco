import { Suspense } from "react";
import { unstable_cache } from "next/cache";
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

function getTop5Cafes(cafes: any[], filterKey: string) {
  return [...cafes]
    .sort((a, b) => {
      const valA = a.averages?.[filterKey] || 0;
      const valB = b.averages?.[filterKey] || 0;
      return valB - valA; 
    })
    .slice(0, 5);
}

function getOnePostPerCafe(allPosts: any[], topCafes: any[]) {
  const topCafeIds = new Set(topCafes.map((c: any) => c._id.toString()));
  const selectedPosts: any[] = [];
  const seenCafes = new Set();

  for (const post of allPosts) {
    const cafeId = post.cafeID?._id; 
    
    if (cafeId && topCafeIds.has(cafeId) && !seenCafes.has(cafeId)) {
      selectedPosts.push(post);
      seenCafes.add(cafeId);
    }
    
    if (selectedPosts.length === 5) break;
  }

  return selectedPosts;
}

const getCachedGlobalData = unstable_cache(
  async () => {
    await connectDB();
    const _forceRegister = CatCafe; 

    const [postDocs, cafeDocsRaw] = await Promise.all([
      Post.find()
        .select('_id title authorName userID createdAt upvoteCount downvoteCount body cafeID isAnonymous authorImage')
        .populate("cafeID", "_id name priceRange location")
        .populate("userID", "image")
        .sort({ createdAt: -1 })
        .limit(20) 
        .lean(),
      CatCafe.find()
        .select('_id ownerID name description location operatingHours priceRange averages totalReviews cafepic')
        .lean() 
    ]);

    const postIds = postDocs.map(p => p._id);

    const [allComments, postCommentCounts, allReplyCounts] = await Promise.all([
      Comment.find({ postID: { $in: postIds }, parentCommentID: null, isDeleted: false })
        .select('_id postID userID content createdAt upvoteCount downvoteCount')
        .populate("userID", "username name")
        .sort({ createdAt: -1 })
        .limit(100) 
        .lean(),
      Comment.aggregate([
        { $match: { postID: { $in: postIds }, isDeleted: false } },
        { $group: { _id: "$postID", count: { $sum: 1 } } }
      ]),
      Comment.aggregate([
        { $match: { isDeleted: false, parentCommentID: { $ne: null } } },
        { $group: { _id: "$parentCommentID", count: { $sum: 1 } } }
      ])
    ]);

    return JSON.parse(JSON.stringify({
      postDocs, cafeDocsRaw, postIds, allComments, postCommentCounts, allReplyCounts
    }));
  },
  ['discover-global-data-v3'], 
  { 
    revalidate: 60,
    tags: ['global-posts-cache']
  } 
);

async function DiscoverContent() {
  await connectDB();

  // 1. Start Auth and Cache fetch
  const [session, globalData] = await Promise.all([
    auth(),
    getCachedGlobalData()
  ]); 

  const { 
    postDocs, 
    cafeDocsRaw, 
    postIds, 
    allComments, 
    postCommentCounts, 
    allReplyCounts 
  } = globalData;

  // 2. Fetch User and Interactions 
  let currentUserId = session?.user?.id; 
  
  if (!currentUserId && session?.user?.email) {
    const userDb = await User.findOne({ email: session.user.email }).select('_id').lean();
    currentUserId = userDb?._id;
  }

  let postInteractions: any[] = [];
  let commentInteractions: any[] = [];
  
  if (currentUserId) { 
    const commentIds = allComments.map((c: any) => c._id);
    
    [postInteractions, commentInteractions] = await Promise.all([
      Interaction.find({
        userID: currentUserId, 
        targetID: { $in: postIds },
        targetType: "Post"
      }).select('targetID voteValue').lean(),
      
      commentIds.length > 0 
        ? Interaction.find({ 
            userID: currentUserId, 
            targetID: { $in: commentIds }, 
            targetType: "Comment" 
          }).select('targetID voteValue').lean()
        : Promise.resolve([])
    ]);
  }

  // D. Map Data
  const commentCountMap = Object.fromEntries(postCommentCounts.map((c: any) => [c._id.toString(), c.count]));
  const replyCountMap = Object.fromEntries(allReplyCounts.map((r: any) => [r._id.toString(), r.count]));
  const postVoteMap = Object.fromEntries(postInteractions.map(i => [i.targetID.toString(), i.voteValue === 1 ? "up" : "down"]));
  const commentVoteMap = Object.fromEntries(commentInteractions.map(i => [i.targetID.toString(), i.voteValue === 1 ? "up" : "down"]));

  const cafeDocs: Cafe[] = cafeDocsRaw
    .filter((cafe: any) => (cafe.totalReviews || 0) > 0)
    .map((cafe: any) => {
      const avgs = cafe.averages || { sociability: 0, ambience: 0, food: 0, work_friendly: 0, service: 0 };
      const soc = Number(avgs.sociability) || 0;
      const amb = Number(avgs.ambience) || 0;
      const foo = Number(avgs.food) || 0;
      const work = Number(avgs.work_friendly) || 0;
      const serv = Number(avgs.service) || 0;

      let overallRating = Math.min((soc + amb + foo + work + serv) / 5, 5); 
      const reviews = cafe.totalReviews || 0;
      const isGatekept = reviews >= 3 && reviews <= 5;
      const gatekeptScore = isGatekept ? parseFloat(overallRating.toFixed(1)) : -1; 

      return {
        _id: cafe._id.toString(),
        ownerID: cafe.ownerID?.toString() || "",
        name: cafe.name || "Unknown Cafe",
        description: cafe.description || "A cozy spot for coffee and cats.",
        location: cafe.location || "Unknown City",
        operatingHours: cafe.operatingHours || "N/A",
        priceRange: cafe.priceRange || "₱0",
        averages: { ...avgs, gatekept_score: gatekeptScore },
        totalReviews: reviews,
        cats: cafe.cats || [],
        menu: cafe.menu || [],
        cafepic: cafe.cafepic || "/default-cafe.png",
      };
  });

  const realPosts = postDocs.map((post: any) => {
    const postIdStr = post._id.toString();
    const postComments = allComments.filter((c: any) => c.postID.toString() === postIdStr).slice(0, 2);

    return {
      _id: postIdStr,
      title: post.title,
      authorName: post.authorName,
      authorId: post.userID?._id?.toString() || post.userID?.toString(),
      authorImage: post.isAnonymous ? undefined : (post.authorImage || post.userID?.image),
      createdAt: post.createdAt,
      upvoteCount: post.upvoteCount || 0,
      downvoteCount: post.downvoteCount || 0,
      userVote: postVoteMap[postIdStr] || null,
      body: post.body,
      commentCount: commentCountMap[postIdStr] || 0,
      cafeID: post.cafeID ? { _id: post.cafeID._id?.toString(), name: post.cafeID.name, priceRange: post.cafeID.priceRange, location: post.cafeID.location } : null,
      comments: postComments.map((c: any) => ({
        _id: c._id.toString(),
        authorName: c.userID?.username || c.userID?.name || "Anonymous", 
        createdAt: c.createdAt,
        content: c.content, 
        body: c.content, 
        upvoteCount: c.upvoteCount || 0,
        downvoteCount: c.downvoteCount || 0,
        userVote: commentVoteMap[c._id.toString()] || null, 
        replyCount: replyCountMap[c._id.toString()] || 0
      })),
    };
  });

  const topSocialCafes = getTop5Cafes(cafeDocs, "sociability");
  const topAestheticCafes = getTop5Cafes(cafeDocs, "ambience");
  const topFoodCafes = getTop5Cafes(cafeDocs, "food");
  const topWorkCafes = getTop5Cafes(cafeDocs, "work_friendly");
  const topServiceCafes = getTop5Cafes(cafeDocs, "service");
  const topGatekeptCafes = getTop5Cafes(cafeDocs, "gatekept_score");

  return (
    <section className="bg-[#FEF6EA]">
      <MarqueeBand text="GENERAL MUNCHKIN'S SOCIAL SPOTS" bgColor="bg-[#EE7D6C]" />
      <BestCafes cafes={topSocialCafes} cardColor="bg-[#ED7364]" badgeText="People Friendly" badgeColor="bg-[#ED7364]" />
      <PostCarousel posts={getOnePostPerCafe(realPosts, topSocialCafes)} variant="thread"/>

      <MarqueeBand text="OPPIE GOOPEY’S AESTHETIC PICKS" bgColor="bg-[#73A659]" />
      <BestCafes cafes={topAestheticCafes} cardColor="bg-[#87AE73]" badgeText="Aesthetic" badgeColor="bg-[#87AE73]" />
      <PostCarousel posts={getOnePostPerCafe(realPosts, topAestheticCafes)} variant="thread"/>

      <MarqueeBand text="CHONKY’S FLAVOR FAVORITES" bgColor="bg-[#EC6B00]" />
      <BestCafes cafes={topFoodCafes} cardColor="bg-[#FF7300]" badgeText="Best Foods" badgeColor="bg-[#FF7300]" />
      <PostCarousel posts={getOnePostPerCafe(realPosts, topFoodCafes)} variant="thread"/>

      <MarqueeBand text="LIL’ JIMBOB’S FOCUS ZONES" bgColor="bg-[#60958E]" />
      <BestCafes cafes={topWorkCafes} cardColor="bg-[#75A39D]" badgeText="Work Friendly" badgeColor="bg-[#75A39D]" />
      <PostCarousel posts={getOnePostPerCafe(realPosts, topWorkCafes)} variant="thread" />

      <MarqueeBand text="LARRY’S GOATED CAFE SERVICES" bgColor="bg-[#FC588D]" />
      <BestCafes cafes={topServiceCafes} cardColor="bg-[#FD6B9A]" badgeText="Great Service" badgeColor="bg-[#FD6B9A]" />
      <PostCarousel posts={getOnePostPerCafe(realPosts, topServiceCafes)} variant="thread" />

      <MarqueeBand text="BURGER’S GATEKEPT GEMS" bgColor="bg-[#613D8E]" />
      <BestCafes cafes={topGatekeptCafes} cardColor="bg-[#71539A]" badgeText="Hidden Gem" badgeColor="bg-[#71539A]" />
      <PostCarousel posts={getOnePostPerCafe(realPosts, topGatekeptCafes)} variant="thread"/>
    </section>
  );
}

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-[#D5AE85] flex flex-col">
      <HeroSection />

      <div id="catpuccino-definition" className="bg-[#FEF6EA] h-[320px] w-full flex flex-col justify-center px-[140px]">
        <h2 className="text-[#855225] font-poppins font-black text-[20px] uppercase">What's the deal with</h2>
        <h2 className="text-[#855225] font-poppins font-black text-[50px] uppercase">Catpuccino?</h2>
        <p className="w-[475px] text-[#262626] mt-4">
          Catpuccino is your go-to platform to discover, review, and connect with cat cafes in the Philippines.
        </p>
      </div>

      <section className="h-[642px] bg-[#FBF3DE] py-16 px-[140px] text-center">
        <div className="pt-[25px] flex items-center justify-center gap-8 mb-12">
           <div className="h-[2px] flex-1 bg-[#855225] opacity-30"></div>
           <h2 className="text-[#855225] font-poppins font-black text-5xl uppercase">The best spots!!!</h2>
           <div className="h-[2px] flex-1 bg-[#855225] opacity-30"></div>
        </div>

        <div className="grid grid-cols-6 gap-6">
          {["SOCIAL SPOTS", "AESTHETIC PICK", "FLAVOR FAVORITES", "FOCUS ZONES", "GOATED SERVICES", "GATEKEPT GEMS"].map((title, i) => (
             <div key={i} className="flex flex-col items-center group cursor-pointer">
               <CategoryIcon title={title} />
               <h3 className="text-[#D26500] font-poppins font-black text-sm uppercase mt-4">{title}</h3>
             </div>
          ))}
        </div>
      </section>

      <Suspense fallback={
        <div className="flex flex-col justify-center items-center h-[500px] bg-[#FEF6EA] text-[#855225]">
          <h2 className="text-3xl font-black uppercase animate-pulse mb-4">Brewing the best spots... ☕🐈</h2>
          <p>Waking up the cats...</p>
        </div>
      }>
        <DiscoverContent />
      </Suspense>

      <div className="h-[400px] w-full bg-[#FCD24C]" />
    </div>
  );
}