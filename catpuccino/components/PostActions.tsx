"use client";

import { useState } from "react";
import VoteButtons from "./VoteButtons";
import ReplyButton from "./ReplyButton";
import ReportButton from "./ReportButton";
import CommentBox from "./CommentBox";

interface PostActionsProps {
  postId: string;
  initialVotes: number;
  replyCount: number;
}

export default function PostActions({ postId, initialVotes, replyCount }: PostActionsProps) {
  const [showCommentBox, setShowCommentBox] = useState(false);

  const handleReplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCommentBox(true);
  };

  return (
    <div className="w-full">

      {/* The Action Buttons */}
      <div className="flex gap-4 mt-auto items-center">
        <VoteButtons postId={postId} initialVotes={initialVotes} />
        <ReplyButton replyCount={replyCount} onClick={handleReplyClick} />
        <ReportButton />
      </div>

      {/* The Comment Box (Only shows if they clicked Reply) */}
      {showCommentBox && (
        <div className="mt-8 border-t-[1.5px] border-[#855225]/20 pt-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <CommentBox 
            isForceExpanded={true} 
            onCancel={() => setShowCommentBox(false)} 
          />
        </div>
      )}
    </div>
  );
}