"use client";
import { useState } from "react";

interface VoteButtonsProps {
  initialVotes: number;
  initialUserVote?: "up" | "down" | null;
}

export default function VoteButtons({ initialVotes, initialUserVote = null }: VoteButtonsProps) {
 
  const [vote, setVote] = useState<"up" | "down" | null>(initialUserVote);
  const [count, setCount] = useState(initialVotes);

  const handleVote = (type: "up" | "down") => {

    if (vote === type) {
      setVote(null);
      setCount((prev) => (type === "up" ? prev - 1 : prev + 1));
    } else {
      // If switching votes, we need to adjust by 2 (e.g., from -1 to +1)
      if (vote === "up" && type === "down") setCount((prev) => prev - 2);
      else if (vote === "down" && type === "up") setCount((prev) => prev + 2);
      // If fresh vote, adjust by 1
      else setCount((prev) => (type === "up" ? prev + 1 : prev - 1));
      
      setVote(type);
    }
    
    // TODO: Add API call here to save the vote to the database later
  };

  let upvoteSrc = "/waiting-upvote.svg"; // Default 
  let downvoteSrc = "/waiting-downvote.svg"; // Default 

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
      {/* Upvote */}
      <button onClick={() => handleVote("up")} className="hover:scale-110 transition-transform active:scale-95">
        <img src={upvoteSrc} alt="Upvote" className="w-[26px] h-[20px]" />
      </button>

      {/* Vote Count */}
      <span className="font-bold text-sm min-w-[20px] text-center tabular-nums">
        {count}
      </span>

      {/* Downvote */}
      <button onClick={() => handleVote("down")} className="hover:scale-110 transition-transform active:scale-95">
        <img src={downvoteSrc} alt="Downvote" className="w-[26px] h-[20px]" />
      </button>
    </div>
  );
}