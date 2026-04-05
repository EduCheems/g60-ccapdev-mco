"use client";
import { useState, useEffect } from "react";
import { timeAgo } from "@/lib/utils/timeAgo";
import { useSession } from "next-auth/react";
import VoteButtons from "../VoteButtons";
import ReplyButton from "../ReplyButton";
import ReportButton from "../ReportButton";
import { useRouter } from 'next/navigation'; 
import Link from "next/link"; 
import InfoTag from "../InfoTag";

import { 
  IoLocationSharp, 
  IoPricetag, 
  IoTime, 
  IoPersonCircle, 
} from "react-icons/io5";


interface PostPreviewProps {
  id: string;
  title: string; 
  cafeName: string;
  rating: number; 
  username: string;
  authorId?: string;
  price: string;
  authorImage?: string; 
  city: string;
  time: string;
  createdAt: string | Date;
  content: string;
  image?: string;
  initialVotes: number; 
  initialUserVote?: "up" | "down" | null; 
  commentCount?: number; 
  onVoteChange?: (newScore: number, newVote: "up" | "down" | null) => void; 
}

export default function PostPreview({ 
  id, 
  title, 
  cafeName, 
  rating, 
  username, 
  authorId,
  authorImage, 
  price, 
  city, 
  time, 
  createdAt,
  content, 
  image, 
  initialVotes,
  initialUserVote, 
  commentCount = 0,
  onVoteChange, 
}: PostPreviewProps) {

  const router = useRouter();
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const loggedInUserId = (session?.user as any)?.id as string | undefined;
  const [timeDisplay, setTimeDisplay] = useState(
    createdAt ? timeAgo(createdAt) : "just now"
  );
  const isOwner=authorId === loggedInUserId;
  useEffect(() => {
    if (!createdAt) return;

    const interval = setInterval(() => {
      setTimeDisplay(timeAgo(createdAt));
    }, 30000);

    return () => clearInterval(interval);
  }, [createdAt]);

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this post? 😿");
    
    if (!isConfirmed) return;

    try {
      // Assuming you will create this API route next!
      const res = await fetch(`/api/auth/post/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Post deleted successfully.");
        router.push("/");
      } else {
        alert("Failed to delete post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div onClick={() => router.push(`/view-post/${id}`)} id={id} className="cursor-pointer transition-transform hover:-translate-y-1 w-full max-w-[800px] border-[1.5px] border-black bg-[#FEF6EA] rounded-2xl p-6 font-montserrat shadow-[5px_5px_0_0_rgb(133_82_37_/_0.2)]">
      
      
      <div className="flex items-center gap-3 mb-4 relative">
        
        {/* Profile Link Wrapper */}
        <div onClick={(e) => e.stopPropagation()}>
          {authorId ? (
            <Link href={`/profile?userId=${authorId}`} className="flex items-center gap-2 group">
              {authorImage ? (
                <img 
                  src={authorImage} 
                  alt={`${username}'s avatar`} 
                  className="w-10 h-10 rounded-full object-cover border border-[#855225] shadow-sm shrink-0 group-hover:scale-105 transition-transform"
                />
              ) : (
                <IoPersonCircle className="w-9 h-9 text-[#A86734] shrink-0 group-hover:scale-105 transition-transform" />
              )}
              <span className="text-sm font-medium text-black group-hover:underline">
                {username}
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              {authorImage ? (
                <img 
                  src={authorImage} 
                  alt={`${username}'s avatar`} 
                  className="w-9 h-9 rounded-full object-cover border border-black/10 shrink-0" 
                />
              ) : (
                <IoPersonCircle className="w-9 h-9 text-[#A86734] shrink-0" />
              )}
              <span className="text-sm font-medium text-black">
                {username}
              </span>
            </div>
          )}
        </div>

        {/* Time and Options Menu */}
        <span className="text-sm font-medium text-black">
          • {timeDisplay}
        </span>
        {isOwner && (
          <button 
            onClick={(e) => {e.stopPropagation(); setShowMenu(!showMenu);}} 
            className="ml-auto text-gray-500 font-bold tracking-widest hover:text-black"
          >
            •••
          </button>
        )}
        {showMenu && (
                  <div className="absolute right-0 top-full mt-1 w-24 bg-white border-[1.5px] border-[#855225] rounded-[10px] shadow-sm overflow-hidden z-20 flex flex-col">
                    <button 
                      onClick={(e) => { e.stopPropagation();setIsEditing(true); setShowMenu(false); router.push(`/edit-post/${id}`); }}
                      className="px-3 py-2 text-left text-[12px] font-bold text-[#855225] hover:bg-[#FEF6EA] border-b-[1.5px] border-[#855225]/10"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation();handleDelete(); setShowMenu(false); }}
                      className="px-3 py-2 text-left text-[12px] font-bold text-red-500 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
      </div>

      <h2 className="text-3xl font-black text-black mb-1 tracking-tight">{title}</h2>
      <p className="text-sm font-medium text-black mb-5">{cafeName}</p>

      <div className="flex flex-wrap gap-6 mb-6">
        <InfoTag 
          icon={IoPricetag} 
          iconColor="text-[#FFB800]" 
          label="Price" 
          value={price} 
        />
        <InfoTag 
          icon={IoLocationSharp} 
          iconColor="text-[#E63946]" 
          label="City" 
          value={city} 
        />
        <InfoTag 
          icon={IoTime} 
          iconColor="text-[#FF7A00]" 
          label="Time" 
          value={time} 
        />
      </div>

      <div className="mb-6">
        <p className="text-[13px] leading-relaxed text-black/90 text-justify line-clamp-3">
          {content}
        </p>
        
        {image && (
          <img src={image} alt="Cafe" className="mt-4 w-full h-48 object-cover rounded-xl border border-black/10" />
        )}
        
        <Link 
          href={`/view-post/${id}`} 
          onClick={(e) => e.stopPropagation()}
          className="text-[13px] font-bold text-[#A86734] hover:text-black hover:underline transition-colors mt-2 inline-block"
        >
          See more
        </Link>
      </div>

      <div className="flex items-center gap-4">
        
        <div onClick={(e) => e.stopPropagation()}>
          <VoteButtons 
            postId={id} 
            initialVotes={initialVotes} 
            initialUserVote={initialUserVote}
            targetType="Post" 
            onVoteChange={onVoteChange} 
          />
        </div>

        <ReplyButton replyCount={commentCount} />

        <div onClick={(e) => e.stopPropagation()}>
          <ReportButton onClick={() => console.log("Reported.")} />
        </div>

      </div>

    </div>
  );
}