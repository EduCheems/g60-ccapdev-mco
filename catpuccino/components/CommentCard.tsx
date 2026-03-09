// components/CommentCard.tsx
"use client";

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
  const initialVotes = (comment.upvoteCount || comment.upvotes || 0) - (comment.downvoteCount || comment.downvotes || 0);
  
  // -- Edit and delete State -- 

  const [isEditing, setIsEditing] = useState(false); 
  const [editValue, setEditValue] = useState(comment.content); 
  const [isLoading, setIsLoading] = useState(false); 
  const [isDeleted, setIsDeleted] = useState(false);

  // --

  const [showMenu, setShowMenu] = useState(false);
  const [localReplies, setLocalReplies] = useState(comment.replies || []);
  
  const handleReplySubmit = async (content: string) => {
    setIsLoading(true);

    const newReply = {
      postID: comment.postID,
      userID: currentUserId,
      content: content,
      parentCommentID: comment._id, 
    };

    /*
    const newReply = {
      id: Math.random().toString(),
      authorName: "currentUser", 
      timeAgo: "just now",
      content: content,
      upvoteCount: 0,
      downvoteCount: 0,
      replies: []
    };
    */

    const result = await createComment(newReply);

    if (result.success) {
      setLocalReplies([...localReplies, result.comment]);
      setShowReplyBox(false);
    } else {
      alert("Error: " + result.error);
    }
    setIsLoading(false);
  };

  // -- Handler for backend 
  const handleSaveEdit = async () => {
    if (!editValue.trim() || editValue === comment.content){
      setIsEditing(false); 
      return; 
    }

    setIsLoading(true); 

    // TODO: Create an updateComment Server Action
    // const result = await updateComment(comment._id, editValue);

    setIsLoading(true); 

    //Fake API Call (pa change backend)
    setTimeout(() => {
      comment.content = editValue; 
      setIsEditing(false); 
      setIsLoading(false); 
    }, 600);
  };

  const handleDelete = async () => {

    const confirmdelete = window.confirm("Are you sure you wanna delete this comment?"); 
    if (!confirmdelete) return; 

    // TODO: Create a deleteComment Server Action (Soft Delete)
    // await deleteComment(comment._id);

    //Fake API Call 
    setTimeout(() =>{
      setIsDeleted(true); 
      setIsLoading(false); 
    }, 600);
  };

  return (
    <div className="flex flex-col w-full">
      
      {/* Main content row */}
      <div className="flex w-full">
        
        {/* User avatar (This should grey out avatar and deets if deleted) */}
        <div className="flex flex-col items-center mr-3 relative shrink-0">
          {/* If deleted, gray out avatar */}
          <div className={`w-8 h-8 rounded-full z-10 ${isDeleted ? 'bg-gray-300' : 'bg-[#855225]'}`} />
          
          {/* Connector line */}
          {localReplies && localReplies.length > 0 && (
            <div className="absolute top-8 bottom-0 w-[2px] bg-[#855225]" />
          )}
        </div>

        {/* Comment Content */}
        <div className="flex flex-col flex-1 pb-4">
          
          {/* Comment Header */}
          <div className="flex items-center gap-2 mb-1 mt-1 text-[12px] relative w-full">
            <span className={`font-bold ${isDeleted ? 'text-gray-400' : 'text-black'}`}>
              [{isDeleted ? 'deleted' : comment.authorName}]
            </span>
            <span className="text-black/50">• {comment.timeAgo || "just now"}</span>
          
          {/* Ellipsis Menu */}
          {!isDeleted && !isEditing && (
              <div className="ml-auto relative">
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className="text-black/40 hover:text-black transition-colors p-1 rounded-full hover:bg-black/5"
                  disabled={isLoading}
                >
                  <IoEllipsisHorizontal size={16} />
                </button>

                {showMenu && (
                  <div className="absolute right-0 top-full mt-1 w-24 bg-white border-[1.5px] border-[#855225] rounded-[10px] shadow-sm overflow-hidden z-20 flex flex-col">
                    <button 
                      onClick={() => {
                        setIsEditing(true);
                        setShowMenu(false);
                      }}
                      className="px-3 py-2 text-left text-[12px] font-bold text-[#855225] hover:bg-[#FEF6EA] transition-colors border-b-[1.5px] border-[#855225]/20"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => {
                        handleDelete();
                        setShowMenu(false);
                      }}
                      className="px-3 py-2 text-left text-[12px] font-bold text-red-500 hover:bg-red-50 transition-colors"
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
              <img src={comment.imageUrl} alt="attached" className="w-full object-cover" />
            </div>
          )}

          {/* Content */}
          {isDeleted ? (
            <p className="text-[14px] text-gray-400 italic mb-3">
              [This comment was deleted]
            </p>
          ) : isEditing ? (
            <div className="flex flex-col gap-2 mb-3 mr-4">
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                disabled={isLoading}
                className="w-full bg-white border-[1.5px] border-[#855225] rounded-[10px] p-3 text-[14px] text-black outline-none focus:ring-2 focus:ring-[#855225]/50 resize-none min-h-[80px]"
              />
              <div className="flex gap-2 justify-end">
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    setEditValue(comment.content); 
                  }}
                  disabled={isLoading}
                  className="px-4 py-1.5 rounded-full text-[12px] font-bold text-[#855225] hover:bg-[#855225]/10 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveEdit}
                  disabled={isLoading}
                  className="px-4 py-1.5 rounded-full text-[12px] font-bold bg-[#855225] text-white hover:bg-[#6b421d] transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-[14px] text-black mb-3 leading-snug pr-4">
              {comment.content}
            </p>
          )}

          {/* Actions (Hide if deleted or editing) */}
          {!isDeleted && !isEditing && (
            <div className="flex items-center gap-3">
              <VoteButtons 
                postId={comment._id || comment.id} 
                initialVotes={initialVotes} 
                initialUserVote={comment.userVote || 0}
                targetType="Comment" 
              />
              <ReplyButton 
                replyCount={localReplies?.length} 
                onClick={() => setShowReplyBox(!showReplyBox)} 
              />
              <ReportButton />
            </div>
          )}

          {/* Inline Reply Box */}
          {showReplyBox && !isDeleted && (
            <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
               <CommentBox 
                isForceExpanded={true}
                onCancel={() => setShowReplyBox(false)}
                onSubmit={handleReplySubmit} 
                id={comment.postID} 
                userId={currentUserId}               
                />
            </div>
          )}
        </div>
      </div>

      {/* 2. Line connector logic for nested comments */}
      {localReplies && localReplies.length > 0 && (
        <div className="flex flex-col w-full relative">
          {localReplies.map((reply: any, index: number) => {
            const isLast = index === localReplies.length - 1;
            
            return (
              <div key={reply._id || reply.id} className="relative flex w-full">
                
                {/* Branch line (vertical) */}
                {isLast ? (

                  /* Branch line tail */
                  <div className="absolute left-[15px] top-0 h-[16px] w-[1.5px] bg-[#855225]" />
                ) : (
                  /* Branch line extender */
                  <div className="absolute left-[15px] top-0 bottom-0 w-[1.5px] bg-[#855225]" />
                )}

                {/* Horizontal line connector */}
                <div className="absolute left-[15px] top-[16px] w-[29px] h-[2px] bg-[#855225]" />
                
                {/* Comment indent */}
                <div className="w-full pl-[44px]">
                  <CommentCard comment={reply} currentUserId={currentUserId} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}