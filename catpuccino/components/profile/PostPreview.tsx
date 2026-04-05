"use client";

import { timeAgo as formatPostedAgo } from "@/lib/utils/timeAgo";
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
  price: string;
  city: string;
  time: string;
  content: string;
  image?: string;
  initialVotes: number; 
  initialUserVote?: "up" | "down" | null; 
  commentCount?: number;
  postedAt?: string | Date;
}

export default function PostPreview({ 
  id, 
  title, 
  cafeName, 
  rating, 
  username, 
  price, 
  city, 
  time, 
  content, 
  image, 
  initialVotes,
  initialUserVote, 
  commentCount = 0,
  postedAt,
}: PostPreviewProps) {

  const router = useRouter();
  const whenPosted =
    postedAt != null && !Number.isNaN(new Date(postedAt).getTime())
      ? formatPostedAgo(postedAt)
      : "Just now";

  return (
    <div onClick={() => router.push(`/view-post/${id}`)} id={id} className="cursor-pointer transition-transform hover:-translate-y-1 w-full max-w-[800px] border-[1.5px] border-black bg-[#FEF6EA] rounded-2xl p-6 font-montserrat shadow-[5px_5px_0_0_rgb(133_82_37_/_0.2)]">
      
      <div className="flex items-center gap-3 mb-4">
        <IoPersonCircle className="w-9 h-9 text-[#A86734]" />
        <span className="text-sm font-medium text-black">
          {username} - {whenPosted}
        </span>
        <button className="ml-auto text-gray-500 font-bold tracking-widest hover:text-black">
          •••
        </button>
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