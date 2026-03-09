// components/DiscussionSection.tsx
"use client";

import { useState } from "react";
import CommentThread from "./CommentThread";
import CommentBox from "./CommentBox";
import { createComment } from "@/controllers/commentAction";

interface DiscussionSectionProps {
  initialComments: any[];
  postId: string;      
  currentUserId: string; 
}

export default function DiscussionSection({initialComments, postId, currentUserId}: DiscussionSectionProps) {
  
    // Store the comments in local state for UI
  const [comments, setComments] = useState(initialComments);

  // This handles the top-level comment box submission
  const handleNewTopLevelComment = async (content: string) => {

    const newComment = {
        postID: postId,
        userID: currentUserId,
        content: content,
    };

    /*
    const newComment = {
      id: Math.random().toString(), // Change based on how we generate ID
      authorName: "currentUser", // Replace with user's username
      timeAgo: "just now",
      content: content,
      upvotes: 0,
      downvotes: 0,
      replies: []
    }; */

    const result = await createComment(newComment);
    
    // 2. Add it to the top of the feed instantly
    if (result.success) {
        setComments((prev) => [result.comment, ...prev]);
    } else {
        alert("Failed to post comment: " + result.error);
    }
  };

  return (
    <div className="mt-12 w-full flex flex-col gap-6">
      
      {/* Discussion Header */}
      <div className="flex items-center gap-4 mb-2">
        <h3 className="font-black text-[#855225] text-[20px] whitespace-nowrap">
          Discussion ({comments.length})
        </h3>
        <div className="h-[2px] bg-[#855225]/20 w-full"></div>
      </div>

      {/* Top-level Comment Box for the main post */}
      <div className="mb-4">
        <CommentBox 
          onSubmit={handleNewTopLevelComment} 
          id={postId} 
          userId={currentUserId}
        />
      </div>

      {/* Map through the STATE, not the static prop */}
      {comments.map((comment) => (
        <CommentThread key={comment._id} data={comment} currentUserId={currentUserId}/>
      ))}
      
    </div>
  );
}