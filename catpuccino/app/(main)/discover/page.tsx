"use client"; 
import React, { useState, useEffect } from 'react';
import PostPreview from '@/components/profile/PostPreview';
import RecentlyVisited from '@/components/RecentlyVisited';
import Link from 'next/link'; 

type PostData = {
  _id: string; 
  title: string; 
  cafeID?: { name: string; price: string; location: string; operatingHours: string };
  overallRating: number; 
  authorName: string; 
  body: string; 
  createdAt: string; 
  catImage?: string; 
  upvoteCount: number; 
  downvoteCount: number; 
}

export default function DiscoverPage() {
  const [sortBy, setSortBy] = useState("new");
  const [posts, setPosts] = useState<PostData[]>([]); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/auth/post');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "new") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } 
    if (sortBy === "best") {
      return (b.overallRating || 0) - (a.overallRating || 0);
    } 
    if (sortBy === "controversial") {
      
      const engagementA = (a.upvoteCount || 0) + (a.downvoteCount || 0);
      const engagementB = (b.upvoteCount || 0) + (b.downvoteCount || 0);
      return engagementB - engagementA;
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
            {isLoading ? (
              <p className="text-black/50 font-bold italic py-10 text-center">Loading posts...</p>
            ) : sortedPosts.length > 0 ? (
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
                    price={post.cafeID?.price || "₱ 0"} 
                    city={post.cafeID?.location || "Metro Manila"}
                    time={post.cafeID?.operatingHours || "N/A"}
                    content={post.body}
                    image={post.catImage} 
                    initialVotes={netScore} 
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