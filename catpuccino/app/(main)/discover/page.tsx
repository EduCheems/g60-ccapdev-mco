
import DiscoverFeed from "./DiscoverFeed"; 
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import "@/models/CatCafe"; 
import "@/models/User";

export const revalidate = 60; 

export default async function DiscoverPage() {
  await connectDB();
  
  const rawPosts = await Post.find()
    .select('_id title authorName userID createdAt upvoteCount downvoteCount body cafeID isAnonymous authorImage catImage overallRating')
    .populate("cafeID", "_id name priceRange location operatingHours")
    .populate("userID", "image")
    .sort({ createdAt: -1 })
    .limit(20) 
    .lean();

  const initialPosts = rawPosts.map((post: any) => ({
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
    userVote: null,
  }));

  return <DiscoverFeed initialPosts={initialPosts} />;
}