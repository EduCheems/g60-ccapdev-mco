import React from "react";
import { GoDotFill } from "react-icons/go";

interface Review {
  username: string;
  timeAgo: string;
  text: string;
  likes: number;
  avatarUrl?: string;
  imageUrl?: string;
}

interface CommentsProps {
  reviews: Review[];
}

const CommentCard = ({ username, timeAgo, text, likes, avatarUrl, imageUrl }: Review) => {
  return (
    <div className="bg-[#F9F5E7] border border-black rounded-[40px] p-6 mb-6 w-full max-w-5xl shadow-sm">
      <div className="flex items-start gap-4">
        
        {/* Profile Section */}
        <div className="flex-shrink-0">
          {avatarUrl ? (
            <img src={avatarUrl} alt={username} className="w-12 h-12 rounded-full object-cover border border-gray-300" />
          ) : (
            <div className="w-12 h-12 bg-[#6B6B6B] rounded-full" />
          )}
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-black text-lg">{username}</span>
            <span className="text-gray-500 text-lg">· {timeAgo}</span>
          </div>

          {/* Image */}
          {imageUrl && (
            <div className="my-4">
              <img 
                src={imageUrl} 
                alt="Comment attachment" 
                className="rounded-[10px] max-h-[150px] w-auto object-cover border border-black/10"
              />
            </div>
          )}

          {/* Comment Text */}
          <p className="text-black text-xl font-medium mb-4">
            {text}
          </p>

          {/* Footer Actions */}
          <div className="flex items-center justify-between mt-6 text-gray-600 font-medium text-sm">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 hover:text-black transition-colors">
                <GoDotFill className="text-gray-500" /> {likes}
              </button>
              <button className="flex items-center gap-2 hover:text-black transition-colors">
                <GoDotFill className="text-gray-500" /> Reply
              </button>
              <button className="flex items-center gap-2 hover:text-black transition-colors">
                <GoDotFill className="text-gray-500" /> Share
              </button>
            </div>

            <button className="flex items-center gap-2 hover:text-red-600 transition-colors">
              <GoDotFill className="text-gray-500" /> Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Comments({ reviews }: CommentsProps) {
  return (
    <div className="w-full">
      {reviews.map((review, index) => (
        <CommentCard key={index} {...review} />
      ))}
    </div>
  );
}