import HeroSection from "@/components/HeroSection";
import BestCafes from "@/components/BestCafes";
import MarqueeBand from "@/components/MarqueeBand";
import { cafes } from "@/app/data/cafes";
import CategoryIcon from "@/components/CategoryIcon";
import PostCarousel from "@/components/PostCarousel";
import CatCafe from "@/models/CatCafe";

import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import Comment from "@/models/Comment";

import User from "@/models/User";
import Interaction from "@/models/Interaction";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function DiscoverPage() {

  // 1. Connect to DB
  await connectDB();
  const _forceRegister = CatCafe;


  // Get current logged-in user 
  const session = await auth();
  let currentUserId = null; 
  if (session?.user?.email) {
    const user = await User.findOne({ email: session.user.email }).lean();
    if (user) currentUserId = user._id.toString();
  }

  // 2. Fetch the latest posts (No calculation logic yet)
  const postDocs = await Post.find()
    .populate("cafeID")
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  // Fetch user's votes for the post
  let userInteractions: { targetID: any; voteValue: number }[] = [];
  if (currentUserId) {
    const postIds = postDocs.map(p => p._id);
    userInteractions = await Interaction.find({
      userID: currentUserId,
      targetID: { $in: postIds },
      targetType: "Post"
    }).lean();
  }

  // vote map logic 
  const voteMap: Record<string, "up" | "down" | null> = {};
  userInteractions.forEach(interaction => {
    voteMap[interaction.targetID.toString()] = 
      interaction.voteValue === 1 ? "up" : interaction.voteValue === -1 ? "down" : null;
  });

  // 3. Format them and fetch 2 recent comments for each to match your mock data shape
  const realPosts = await Promise.all(
    postDocs.map(async (post) => {
      // Find top 2 parent comments for this specific post
      const commentsDocs = await Comment.find({ postID: post._id, parentCommentID: null, isDeleted: false })
        .sort({ createdAt: -1 })
        .limit(2)
        .lean();

      // Fetch user's votes for comments 
      let commentVoteMap: Record<string, "up" | "down" | null> = {};
      if (currentUserId && commentsDocs.length > 0) {
        const commentIds = commentsDocs.map(c => c._id);
        const commentInteractions = await Interaction.find({
          userID: currentUserId,
          targetID: { $in: commentIds },
          targetType: "Comment" 
        }).lean();

        commentInteractions.forEach(interaction => {
          commentVoteMap[interaction.targetID.toString()] = 
            interaction.voteValue === 1 ? "up" : interaction.voteValue === -1 ? "down" : null;
        });
      }

      const postCommentCount = await Comment.countDocuments({ postID: post._id, isDeleted: false });

      return {
        _id: post._id.toString(),
        title: post.title,
        authorName: post.authorName,
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

      <div
        id="catpuccino-definition"
        className="bg-[#FEF6EA] h-[320px] w-full flex flex-col justify-center px-[140px]"
      >
        <h2 className="text-[#855225] font-poppins font-black text-[20px] uppercase">
          What's the deal with
        </h2>

        <h2 className="text-[#855225] font-poppins font-black text-[50px] uppercase">
          Catpuccino?
        </h2>

        <p className="w-[475px] text-[#262626] mt-4">
          Catpuccino is your go-to platform to discover, review, and connect with cat cafes in the Philippines.
          Find the purr-fect spot to relax, study, or enjoy delicious drinks while meeting friendly cats,
          all rated on ambience, comfort, sociability, food, and service.
        </p>
      </div>

      <section className="h-[642px] bg-[#FBF3DE] py-16 px-[140px] text-center">

        <div className="pt-[25px] flex items-center justify-center gap-8 mb-12">
          <div className="h-[2px] flex-1 bg-[#855225] opacity-30"></div>
          <div>
            <p className="text-[#855225] font-poppins font-bold text-xl lowercase">
              Discover the
            </p>
            <h2 className="text-[#855225] font-poppins font-black text-5xl uppercase tracking-tighter">
              The best spots!!!
            </h2>
          </div>
          <div className="h-[2px] flex-1 bg-[#855225] opacity-30"></div>
        </div>

        <div className="grid grid-cols-6 gap-6">
          {[
            { title: "SOCIAL SPOTS", desc: "Top 10 Cat cafes rated by sociability" },
            { title: "AESTHETIC PICK", desc: "Top 10 Cat cafes rated by ambience" },
            { title: "FLAVOR FAVORITES", desc: "Top 10 Cat cafes rated by food quality" },
            { title: "FOCUS ZONES", desc: "Top 10 Cat cafes rated by work-friendliness" },
            { title: "GOATED SERVICES", desc: "Top 10 Cat cafes rated by service" },
            { title: "GATEKEPT GEMS", desc: "Check out the Top 5 underrated cafes" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              <div className="w-full aspect-[3/4] mb-4">
                <CategoryIcon title={item.title} />
              </div>

              <h3 className="text-[#D26500] font-poppins font-black text-sm uppercase tracking-wider mb-1">
                {item.title}
              </h3>
              <p className="text-[#855225] font-poppins font-medium text-[10px] leading-tight opacity-80">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-[#D26500]" />
        </div>

      </section>

      <section className="bg-[#FEF6EA]">

        <MarqueeBand text="GENERAL MUNCHKIN'S SOCIAL SPOTS" bgColor="bg-[#EE7D6C]" />
        <BestCafes
          cafes={cafes}
          filterKey="Sociability"
          cardColor="bg-[#ED7364]"
          badgeText="People Friendly"
          badgeColor="bg-[#ED7364]"
        />
        <PostCarousel posts={realPosts} variant="thread"/>

        <MarqueeBand text="OPPIE GOOPEY’S AESTHETIC PICKS" bgColor="bg-[#73A659]" />
        <BestCafes
          cafes={cafes}
          filterKey="Ambience"
          cardColor="bg-[#87AE73]"
          badgeText="Aesthetic"
          badgeColor="bg-[#87AE73]"
        />
        <PostCarousel posts={realPosts} variant="collage"/>

        <MarqueeBand text="CHONKY’S FLAVOR FAVORITES" bgColor="bg-[#EC6B00]" />
        <BestCafes
          cafes={cafes}
          filterKey="Food"
          cardColor="bg-[#FF7300]"
          badgeText="Best Foods"
          badgeColor="bg-[#FF7300]"
        />
        <PostCarousel posts={realPosts}/>

        <div className="h-[400px] w-full bg-[#FCD24C]" />

        <MarqueeBand text="LIL’JIMBOB’S FOCUS ZONES" bgColor="bg-[#57928F]" />
        <BestCafes
          cafes={cafes}
          filterKey="Catmosphere"
          cardColor="bg-[#699795]"
          badgeText="Work-Friendly"
          badgeColor="bg-[#699795]"
        />
        <PostCarousel posts={realPosts} />

        <MarqueeBand text="LARRY’S GOATED CAFE SERVICES" bgColor="bg-[#FF5995]" />
        <BestCafes
          cafes={cafes}
          filterKey="Service"
          cardColor="bg-[#FF5995]"
          badgeText="Best Service"
          badgeColor="bg-[#FF5995]"
        />
        <PostCarousel posts={realPosts} />

        <MarqueeBand text="BURGER’S GATEKEPT GEMS" bgColor="bg-[#623D9B]" />
        <BestCafes
          cafes={cafes}
          filterKey="Sociability"
          cardColor="bg-[#7454A4]"
          badgeText="Underrated"
          badgeColor="bg-[#7454A4]"
          reverse
        />
        <PostCarousel posts={realPosts} />

      </section>

      <div className="h-[400px] w-full bg-[#FCD24C]" />

    </div>
  );
}