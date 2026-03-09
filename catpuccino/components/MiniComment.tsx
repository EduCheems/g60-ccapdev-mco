"use client";
import { useRouter } from "next/navigation";
import ReportButton from "./ReportButton";
import { IoPersonCircle } from "react-icons/io5";
import VoteButtons from "./VoteButtons";
import ReplyButton from "./ReplyButton";

interface MiniCommentProps {
  id: string; 
  username: string;
  content: string;
  timeAgo: string;
  initialVotes: number; 
  parentPostId: string; 
  initialUserVote?: "up" | "down" | null; 
  replyCount?: number;
}

export default function MiniComment({ 
  id, 
  username, 
  content, 
  timeAgo,
  initialVotes, 
  parentPostId, 
  initialUserVote = null,
  replyCount = 0 
}: MiniCommentProps) {

  const router = useRouter(); 

  return (
    <div 
      onClick={() => router.push(`/view-post/${parentPostId}`)}
      className="w-full border-[1.5px] border-black bg-[#FEF6EA] rounded-xl p-5 shadow-[4px_4px_0_0_rgb(133_82_37_/_0.2)]"
    >
        
      <div className="flex items-center gap-2 mb-3">
        <IoPersonCircle className="w-7 h-7 text-[#A86734]" />
        <span className="text-xs font-bold text-black">
          {username} - {timeAgo}
        </span>
      </div>

      <p className="text-[12px] leading-relaxed text-black/90 mb-4 line-clamp-3">
        {content}
      </p>

      <div className="flex items-center gap-3 scale-90 origin-left">
        
        <div onClick={(e) => e.stopPropagation()}>
          <VoteButtons 
            postId={id} 
            targetType="Comment" 
            initialVotes={initialVotes} 
            initialUserVote={initialUserVote} 
          />
        </div>
        
        <div onClick={(e) => e.stopPropagation()}>
          <div onClick={() => router.push(`/view-post/${parentPostId}`)}>
            <ReplyButton replyCount={replyCount} />
          </div>
        </div>
        
        <div onClick={(e) => e.stopPropagation()}>
          <ReportButton onClick={()=> console.log("Reported.")}/>
        </div>
      </div>
    </div>
  );
}