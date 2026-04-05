"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import TimeAgo from "./TimeAgo";
import { usePathname } from "next/navigation"; 

export type VisitedPost = {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  authorImage?: string; 
  upvotes: number;
  comments: number;
  visitedAt: number; 
};

export default function RecentlyVisited() {
  const [history, setHistory] = useState<VisitedPost[]>([]);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); 

  useEffect(() => {
    setMounted(true);

    const syncHistory = () => {
      const storedHistory = localStorage.getItem("recentPosts");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      } else {
        setHistory([]);
      }
    };

    syncHistory();

    window.addEventListener("focus", syncHistory);

    return () => window.removeEventListener("focus", syncHistory);
    
  }, [pathname]); 

  const clearHistory = () => {
    localStorage.removeItem("recentPosts");
    setHistory([]);
  };

  if (!mounted) return <aside className="w-full lg:w-[320px] hidden lg:block flex-shrink-0"></aside>;

  if (history.length === 0) {
    return null; 
  }

  return (
    <aside className="w-full lg:w-[320px] hidden lg:flex flex-col bg-[#FEF6EA] border-[1.5px] border-black rounded-[20px] shadow-[5px_5px_0_0_rgba(133,82,37,0.2)] p-6 h-fit shrink-0 sticky top-6">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-extrabold text-sm tracking-widest uppercase text-black">
          Recently Visited
        </h2>
        <button 
          onClick={clearHistory}
          className="text-xs font-bold text-black hover:text-red-600 hover:underline transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {history.map((post, index) => (
          
          <div key={post.id} className={`group flex flex-col gap-1 pb-4 ${index !== history.length - 1 ? "border-b border-black/10" : ""}`}>
            
            {/* User info & Time */}
            <div className="flex items-center gap-2">
              
              {post.authorImage ? (
                <img 
                  src={post.authorImage} 
                  alt={post.authorName} 
                  className="w-5 h-5 rounded-full object-cover border border-black/10 shrink-0" 
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#A36B41] shrink-0 flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
              
              <span className="text-xs text-black/60 font-semibold">
                {/* 2. Link #1: The Profile Link (Now an independent element) */}
                <Link href={`/profile?userId=${post.authorId}`} className="hover:underline hover:text-black">
                  {post.authorName}
                </Link>
                {" • "}<TimeAgo date={new Date(post.visitedAt)} />
              </span>
            </div>

            {/* 3. Link #2: The Post Link (Wraps only the title and stats so it doesn't overlap) */}
            <Link href={`/view-post/${post.id}`} className="flex flex-col gap-1 mt-1">
              <h3 className="font-black text-black group-hover:text-[#855225] transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-[11px] font-bold text-black/50">
                {post.upvotes} upvotes • {post.comments} comments
              </p>
            </Link>

          </div>
        ))}
      </div>
    </aside>
  );
}