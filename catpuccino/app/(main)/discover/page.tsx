import DiscoverFeed from "./DiscoverFeed"; 
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import "@/models/CatCafe"; 
import "@/models/User";
import Interaction from "@/models/Interaction"; 
import Comment from "@/models/Comment";

import { auth } from "@/auth"; 

export const revalidate = 60; 

export default async function DiscoverPage() {
  await connectDB();

  const session = await auth(); 
  
  const currentUserId = session?.user?.id; 
  
  const rawPosts = await Post.find({isDeleted:{$ne:true}})
    .select('_id title authorName userID createdAt upvoteCount downvoteCount body cafeID isAnonymous authorImage catImage overallRating isDeleted')
    .populate("cafeID", "_id name priceRange location operatingHours")
    .populate("userID", "image")
    .sort({ createdAt: -1 })
    .limit(20) 
    .lean();

  let userVotes: any[] = [];
  const postIds = rawPosts.map(post => post._id);

  if (currentUserId) {
    userVotes = await Interaction.find({
      userID: currentUserId,
      targetID: { $in: postIds },
      targetType: "Post"
    }).lean();
  }

  const commentCount = await Promise.all(
    postIds.map(async (id) => {
      const count = await Comment.countDocuments({ 
        postID: id, 
        isDeleted: false
      });
      return { id: id.toString(), count };
    })
  )

  const initialPosts = rawPosts.map((post: any) => {
    const userVoteRecord = userVotes.find(v => v.targetID.toString() === post._id.toString());
    const commentData = commentCount.find(c => c.id === post._id.toString());
    
    let initialUserVoteValue: "up" | "down" | null = null;
    
    if (userVoteRecord) {
      if (userVoteRecord.voteValue === 1) initialUserVoteValue = "up";
      if (userVoteRecord.voteValue === -1) initialUserVoteValue = "down";
    }

    return {
      _id: post._id.toString(),
      title: post.title,
      authorName: post.authorName,
      authorId: post.userID?._id?.toString() || post.userID?.toString(),
      authorImage: post.isAnonymous ? undefined : (post.authorImage || post.userID?.image),
      body: post.body,
      createdAt: post.createdAt.toISOString(),
      catImage: post.catImage,
      upvoteCount: post.upvoteCount || 0,
      downvoteCount: post.downvoteCount || 0,
      overallRating: post.overallRating || 0, 
      cafeID: post.cafeID ? {
        name: post.cafeID.name,
        priceRange: post.cafeID.priceRange,
        location: post.cafeID.location,
        operatingHours: post.cafeID.operatingHours
      } : undefined,
      commentCount: commentData?.count || 0,
      userVote: initialUserVoteValue, 
      isAnonymous: post.isAnonymous || false
    };
  });

  return <DiscoverFeed initialPosts={initialPosts} />;
}