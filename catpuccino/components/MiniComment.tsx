"use client";
import ReportButton from "./ReportButton";
import { IoPersonCircle } from "react-icons/io5";
import VoteButtons from "./VoteButtons";
import ReplyButton from "./ReplyButton";

interface MiniCommentProps {
  username: string;
  content: string;
  timeAgo: string;
}

export default function MiniComment({ username, content, timeAgo }: MiniCommentProps) {
  return (
    <div className="w-full border-[1.5px] border-black bg-[#FEF6EA] rounded-xl p-5 shadow-[4px_4px_0_0_rgb(133_82_37_/_0.2)]">
        
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
        <VoteButtons initialVotes={12} initialUserVote={null} />
        <ReplyButton replyCount={2} />
        <ReportButton onClick={()=> console.log("Reported.")}/>
      </div>
    </div>
  );
}