"use client";
import { timeAgo } from "@/lib/utils/timeAgo";

import { useState } from "react";
import VoteButtons from "./VoteButtons";
import ReplyButton from "./ReplyButton";
import ReportButton from "./ReportButton";
import CommentBox from "./CommentBox";
import { IoEllipsisHorizontal } from "react-icons/io5"; 
import { createComment } from "@/controllers/commentAction";

interface CommentCardProps {
  comment: any;
  currentUserId: string; 
}

export default function CommentCard({ comment, currentUserId }: CommentCardProps) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [editValue, setEditValue] = useState(comment?.content || ""); 
  const [isLoading, setIsLoading] = useState(false); 
  const [isDeleted, setIsDeleted] = useState(false);
  const [localReplies, setLocalReplies] = useState(comment?.replies || []);

  const initialVotes = (comment?.upvoteCount || 0) - (comment?.downvoteCount || 0);

  const handleReplySubmit = async (content: string) => {
    setIsLoading(true);
    const newReply = {
      postID: comment.postID || comment._id,
      userID: currentUserId,
      content: content,
      parentCommentID: comment._id, 
    };

    const result = await createComment(newReply);

    if (result.success) {
      setLocalReplies([...localReplies, result.comment]);
      setShowReplyBox(false);
    } else {
      alert("Error: " + result.error);
    }
    setIsLoading(false);
  };

  const handleSaveEdit = async () => {
    if (!editValue.trim() || editValue === comment?.content) {
      setIsEditing(false); 
      return; 
    }

    setIsLoading(true); 
    
    // TO DO: add updateComment controller
    setTimeout(() => {
      
      // TO DO: update the DB here
      setIsEditing(false); 
      setIsLoading(false); 
    }, 600);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you wanna delete this comment?"); 
    if (!confirmDelete) return; 

    setIsLoading(true);

    // TO DO: Add delete logic 
    setTimeout(() => {
      setIsDeleted(true); 
      setIsLoading(false); 
    }, 600);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full">
        {/* Avatar & Thread Line */}
        <div className="flex flex-col items-center mr-3 relative shrink-0">
          <div className={`w-8 h-8 rounded-full z-10 ${isDeleted ? 'bg-gray-300' : 'bg-[#855225]'}`} />
          {localReplies.length > 0 && (
            <div className="absolute top-8 bottom-0 w-[2px] bg-[#855225]/30" />
          )}
        </div>

        {/* Main Body */}
        <div className="flex flex-col flex-1 pb-4">
          <div className="flex items-center gap-2 mb-1 mt-1 text-[12px] relative w-full">
            <span className={`font-bold ${isDeleted ? 'text-gray-400' : 'text-black'}`}>
              {isDeleted ? '[deleted]' : (comment?.authorName || "Anonymous")}
            </span>
            <span className="text-black/50">
              • {comment?.createdAt ? timeAgo(comment.createdAt) : "just now"}
            </span>
          
            {!isDeleted && !isEditing && (
              <div className="ml-auto relative">
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className="text-black/40 hover:text-black transition-colors p-1 rounded-full hover:bg-black/5"
                >
                  <IoEllipsisHorizontal size={16} />
                </button>

                {showMenu && (
                  <div className="absolute right-0 top-full mt-1 w-24 bg-white border-[1.5px] border-[#855225] rounded-[10px] shadow-sm overflow-hidden z-20 flex flex-col">
                    <button 
                      onClick={() => { setIsEditing(true); setShowMenu(false); }}
                      className="px-3 py-2 text-left text-[12px] font-bold text-[#855225] hover:bg-[#FEF6EA] border-b-[1.5px] border-[#855225]/10"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => { handleDelete(); setShowMenu(false); }}
                      className="px-3 py-2 text-left text-[12px] font-bold text-red-500 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Comment Content Area */}
          <div className="pr-4">
            {isDeleted ? (
              <p className="text-[14px] text-gray-400 italic mb-3">[This comment was deleted]</p>
            ) : isEditing ? (
              <div className="flex flex-col gap-2 mb-3">
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full bg-white border-[1.5px] border-[#855225] rounded-[10px] p-3 text-[14px] outline-none min-h-[80px]"
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setIsEditing(false)} className="text-[12px] font-bold text-[#855225] px-3">Cancel</button>
                  <button onClick={handleSaveEdit} className="bg-[#855225] text-white px-4 py-1.5 rounded-full text-[12px] font-bold">Save</button>
                </div>
              </div>
            ) : (
              <p className="text-[14px] text-black mb-3 leading-snug">{comment?.content}</p>
            )}
          </div>

          {/* Action Buttons */}
          {!isDeleted && !isEditing && (
            <div className="flex items-center gap-3">
              <VoteButtons 
                postId={comment?._id || comment?.id} 
                initialVotes={initialVotes} 
                initialUserVote={comment?.userVote || 0}
                targetType="Comment" 
              />
              <ReplyButton 
                replyCount={localReplies.length} 
                onClick={() => setShowReplyBox(!showReplyBox)} 
              />
              <ReportButton />
            </div>
          )}

          {showReplyBox && (
            <div className="mt-4">
               <CommentBox 
                isForceExpanded={true}
                onCancel={() => setShowReplyBox(false)}
                onSubmit={handleReplySubmit} 
                id={comment?.postID} 
                userId={currentUserId}
              />
            </div>
          )}
        </div>
      </div>

      {/* Recursive Replies Section */}
      {localReplies.length > 0 && (
        <div className="flex flex-col w-full relative">
          {localReplies.map((reply: any, index: number) => (
            <div key={reply._id || index} className="relative flex w-full">
              {/* Connector lines */}
              <div className={`absolute left-[15px] top-0 w-[1.5px] bg-[#855225]/30 ${index === localReplies.length - 1 ? 'h-[16px]' : 'bottom-0'}`} />
              <div className="absolute left-[15px] top-[16px] w-[29px] h-[2px] bg-[#855225]/30" />
              
              <div className="w-full pl-[44px]">
                <CommentCard comment={reply} currentUserId={currentUserId} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}