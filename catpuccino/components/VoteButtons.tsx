"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface VoteButtonsProps {
  postId: string; 
  initialVotes: number;
  initialUserVote?: "up" | "down" | null;
  targetType?: "Post" | "Comment";
}

export default function VoteButtons({ postId, initialVotes, initialUserVote = null, targetType = "Post" }: VoteButtonsProps) {
  
  const router = useRouter();
  const [vote, setVote] = useState<"up" | "down" | null>(initialUserVote);
  const [count, setCount] = useState(initialVotes || 0);

  useEffect(() => {
    setVote(initialUserVote);
    setCount(initialVotes);
  }, [initialUserVote, initialVotes]);
  
  const handleVote = async (type: "up" | "down") => {

    console.log("DEBUG: Voting on postId:", postId);

    if (!postId) {
    console.error("CRITICAL: postId is undefined! Check the parent component.");
    return;
  }

    let upChange = 0;
    let downChange = 0;
    let newVoteValue = 0;

    if (vote === type) {
      setVote(null);
      setCount((prev) => (type === "up" ? prev - 1 : prev + 1));
      if (type === "up") upChange = -1;
      if (type === "down") downChange = -1;
    } else {
      if (vote === "up" && type === "down") {
        setCount((prev) => prev - 2);
        upChange = -1;
        downChange = 1;
      } else if (vote === "down" && type === "up") {
        setCount((prev) => prev + 2);
        upChange = 1;
        downChange = -1;
      } else {
        
        setCount((prev) => (type === "up" ? prev + 1 : prev - 1));
        if (type === "up") upChange = 1;
        if (type === "down") downChange = 1;
      }
      setVote(type);

      newVoteValue = type === "up" ? 1 : -1;
    }

    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            targetID: postId, 
            targetType: targetType, // Tells the backend we are voting on a Post
            newVoteValue: newVoteValue // Sends 1, -1, or 0
        })
      });

      if (!res.ok) {

        const errorData = await res.json().catch(() => ({ message: "Server crashed or returned HTML" }));
        throw new Error(`Backend rejected the vote. Status: ${res.status}. Reason: ${errorData.message}`);
      }

      router.refresh();
    } catch (error) {
      console.error("Failed to save vote:", error);
    }
  };

  let upvoteSrc = "/waiting-upvote.svg"; 
  let downvoteSrc = "/waiting-downvote.svg"; 

  if (vote === "up") {
    upvoteSrc = "/confirmed-upvote.svg";
    downvoteSrc = "/not-downvoted.svg"; 
  } else if (vote === "down") {
    upvoteSrc = "/not-upvoted.svg"; 
    downvoteSrc = "/confirmed-downvote.svg";
  }

  const containerStyle = 
    vote === "up" ? "bg-[#FF8A00] text-white" : 
    vote === "down" ? "bg-[#5C6B89] text-white" : 
    "bg-transparent text-black border-black";

  return (
    <div className={`flex items-center gap-2 border-[1.5px] border-black rounded-full px-4 py-1.5 shadow-[inset_4px_4px_1px_rgba(133_82_37_/_0.2)] transition-colors ${containerStyle}`}>
      <button onClick={() => handleVote("up")} className="hover:scale-110 transition-transform active:scale-95">
        <img src={upvoteSrc} alt="Upvote" className="w-[26px] h-[20px]" />
      </button>

      <span className="font-bold text-sm min-w-[20px] text-center tabular-nums">
        {count}
      </span>

      <button onClick={() => handleVote("down")} className="hover:scale-110 transition-transform active:scale-95">
        <img src={downvoteSrc} alt="Downvote" className="w-[26px] h-[20px]" />
      </button>
    </div>
  );
}