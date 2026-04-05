"use client"; 
import React, { useState } from 'react';
import PostPreview from '@/components/profile/PostPreview';
import RecentlyVisited from '@/components/RecentlyVisited';

type PostData = {
  _id: string; 
  title: string; 
  cafeID?: { name: string; priceRange: string; location: string; operatingHours: string };
  overallRating: number; 
  authorName: string; 
  authorImage?: string;
  authorId?: string; 
  body: string; 
  createdAt: string; 
  catImage?: string; 
  upvoteCount: number; 
  downvoteCount: number; 
  userVote?: "up" | "down" | null; 
}

export default function DiscoverFeed({ initialPosts }: { initialPosts: PostData[] }) {
  const [sortBy, setSortBy] = useState("new");
  
  const [posts, setPosts] = useState<PostData[]>(initialPosts); 

  const handleVoteUpdate = (postId: string, newNetScore: number, newVote: "up" | "down" | null) => {
    setPosts(currentPosts => 
      currentPosts.map(post => {
        if (post._id === postId) {
          let newUpvotes = post.upvoteCount || 0;
          let newDownvotes = post.downvoteCount || 0;
          
          if (post.userVote === "up") newUpvotes = Math.max(0, newUpvotes - 1);
          if (post.userVote === "down") newDownvotes = Math.max(0, newDownvotes - 1);
          
          if (newVote === "up") newUpvotes += 1;
          if (newVote === "down") newDownvotes += 1;

          const calculatedNet = newUpvotes - newDownvotes;
          if (calculatedNet !== newNetScore) {
             const diff = newNetScore - calculatedNet;
             if (diff > 0) newUpvotes += diff;
             else if (diff < 0) newDownvotes += Math.abs(diff);
          }

          return { ...post, upvoteCount: newUpvotes, downvoteCount: newDownvotes, userVote: newVote };
        }
        return post;
      })
    );
  };

  const sortedPosts = [...posts].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();

    if (sortBy === "new") return timeB - timeA;
    
    if (sortBy === "best") {
      const netScoreA = (a.upvoteCount || 0) - (a.downvoteCount || 0);
      const netScoreB = (b.upvoteCount || 0) - (b.downvoteCount || 0);
      if (netScoreB === netScoreA) return timeB - timeA;
      return netScoreB - netScoreA;
    } 
    
    if (sortBy === "controversial") {
      const netScoreA = (a.upvoteCount || 0) - (a.downvoteCount || 0);
      const netScoreB = (b.upvoteCount || 0) - (b.downvoteCount || 0);
      if (netScoreA === netScoreB) return timeB - timeA; 
      return netScoreA - netScoreB; 
    }
    return 0;
  });

  return (
    <div className="min-h-screen w-full bg-[#FBF3DE]"> 
      <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-12 font-montserrat flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 flex flex-col gap-6 w-full">
          
          <div className="flex justify-between items-center mb-2 px-2">
            <h1 className="text-2xl font-black text-black">Discover</h1>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-black">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FEF6EA] text-black border-[1.5px] border-black rounded-lg px-3 py-1.5 text-sm font-bold cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,0.15)] outline-none hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_rgba(0,0,0,0.15)] transition-all"
              >
                <option value="new">Most Recent</option>
                <option value="best">Best Rated</option>
                <option value="controversial">Spiciest Takes</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {sortedPosts.length > 0 ? (
              sortedPosts.map((post) => {
                const netScore = (post.upvoteCount || 0) - (post.downvoteCount || 0);

                return (
                  <PostPreview 
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    cafeName={post.cafeID?.name || "Unknown Cafe"}
                    rating={post.overallRating || 0}
                    username={post.authorName}
                    authorImage={post.authorImage}
                    authorId={post.authorId} 
                    price={post.cafeID?.priceRange || "₱ 0"} 
                    city={post.cafeID?.location || "Metro Manila"}
                    time={post.cafeID?.operatingHours || "N/A"}
                    createdAt={post.createdAt}
                    content={post.body}
                    image={post.catImage} 
                    initialVotes={netScore} 
                    initialUserVote={post.userVote}
                    onVoteChange={(newScore: number, newVote: "up" | "down" | null) => handleVoteUpdate(post._id, newScore, newVote)}
                  />
                )
              })
            ) : (
              <p className="text-black/50 font-bold py-10 text-center">No posts found. Be the first to review!</p>
            )}
          </div>
        </div>

        <RecentlyVisited />
      </div>
    </div>
  );
}