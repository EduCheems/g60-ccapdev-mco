"use client";
import { timeAgo } from "@/lib/utils/timeAgo";

import { useState, useEffect } from "react";
import VoteButtons from "./VoteButtons";
import ReplyButton from "./ReplyButton";
import ReportButton from "./ReportButton";
import CommentBox from "./CommentBox";
import { IoEllipsisHorizontal } from "react-icons/io5"; 
import { createComment, deleteComment, editComment } from "@/controllers/commentAction";

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

  // -- Extract Data --
  const user = comment.userID; 
  const username = user?.name || "Anonymous User"; 
  const profilePic = user?.profilePicURL || "/default-avatar.png"; 

  const timeAgo = comment.createdAt 
    ? new Date(comment.createdAt).toLocaleDateString() 
    : "just now";
    
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

    const result = await editComment(comment._id, editValue, comment.postID);

    if (result.success) {
      comment.content = editValue; // Update 
      setIsEditing(false); 
      setShowMenu(false);
    } else {
      console.log("Failed to edit comment");
    }
  
    setIsLoading(false);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you wanna delete this comment?"); 
    if (!confirmDelete) return; 

    setIsLoading(true);

    // delete backend 
    const result = await deleteComment(comment._id, comment.postID);

    if (result.success) {
      setIsDeleted(true); 
    } else {
      console.log("Failed to delete comment");
    }
    
    setIsLoading(false); 
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full">
        {/* Avatar & Thread Line */}
        <div className="flex flex-col items-center mr-3 relative shrink-0">
          {/* If deleted, gray out avatar */}
          <div className={`w-8 h-8 rounded-full z-10 overflow-hidden border-[1px] border-[#855225]/20 ${isDeleted ? 'bg-gray-300' : 'bg-[#855225]'}`}>
            {!isDeleted && profilePic ? (
              <img src={profilePic} alt={username} className="w-full h-full object-cover" />
            ) : null}
          </div>
          
          {/* Connector line */}
          {localReplies && localReplies.length > 0 && (
            <div className="absolute top-8 bottom-0 w-[2px] bg-[#855225]" />
          )}
        </div>

        {/* Main Body */}
        <div className="flex flex-col flex-1 pb-4">
          <div className="flex items-center gap-2 mb-1 mt-1 text-[12px] relative w-full">
            <span className={`font-bold ${isDeleted ? 'text-gray-400' : 'text-black'}`}>
              [{isDeleted ? 'deleted' : username}]
            </span>
            <span className="text-black/50">• {timeAgo}</span>
          
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

          {/* Image (Will be hidden if deleted comment) */}
          {!isDeleted && comment.imageUrl && !isEditing && (
            <div className="my-2 rounded-lg overflow-hidden max-w-sm border-[1.5px] border-[#855225]/20">
              <img 
                src={comment.imageUrl} 
                alt="Attached content" 
                className="w-full h-full object-cover max-h-[300px]" 
              />
            </div>
          )}

          {/* Content */}
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