import React from "react";

interface CommentProps {
  username: string;
  timeAgo: string;
  text: string;
  likes: number;
}

const CommentCard = ({ username, timeAgo, text, likes }: CommentProps) => {
  return (
    <div className="bg-[#D9D9D9] rounded-[40px] p-8 mb-4 w-full max-w-4xl shadow-sm">
      <div className="flex items-start gap-4">
        {/* Profile Circle */}
        <div className="w-12 h-12 bg-[#6B6B6B] rounded-full flex-shrink-0" />

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <span className="font-bold text-black text-lg">{username}</span>
            <span className="text-gray-600 text-lg">· {timeAgo}</span>
          </div>

          {/* Comment Text */}
          <p className="text-black text-2xl mb-6 font-medium leading-tight">
            {text}
          </p>

          {/* Footer Actions */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-6 text-gray-700">
              <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                <div className="w-4 h-4 bg-gray-600 rounded-full" />
                <span className="font-medium">{likes}</span>
              </button>
              
              <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                <div className="w-4 h-4 bg-gray-600 rounded-full" />
                <span>Reply</span>
              </button>

              <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                <div className="w-4 h-4 bg-gray-600 rounded-full" />
                <span>Share</span>
              </button>
            </div>

            <button className="flex items-center gap-2 text-gray-700 hover:opacity-70 transition-opacity">
              <div className="w-4 h-4 bg-gray-600 rounded-full" />
              <span>Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Comments() {
  return (
    <div className="p-8 flex flex-col items-center">
      <CommentCard 
        username="Customer #1" 
        timeAgo="10m ago" 
        text="amazing cats, 100% coming back" 
        likes={67} 
      /> // will change this so that we can integrate data
    </div>
  );
}