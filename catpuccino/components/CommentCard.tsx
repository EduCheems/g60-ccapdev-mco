import React from "react";
import { 
  IoHeartOutline, 
  IoChatbubbleOutline, 
  IoArrowRedoOutline, 
  IoAlertCircleOutline 
} from "react-icons/io5";

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
    <div className="bg-[#F9F5E7] border border-black rounded-[20px] p-6 mb-6 w-full max-w-5xl shadow-sm">
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
          <div className="flex items-center justify-between mt-8 text-gray-700 font-black text-sm uppercase tracking-tight">
            <div className="flex items-center gap-8">
              <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors group">
                <IoHeartOutline size={22} className="group-hover:fill-red-500 transition-all" /> 
                <span>{likes}</span>
              </button>

              <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                <IoChatbubbleOutline size={20} /> 
                <span>Reply</span>
              </button>

              <button className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
                <IoArrowRedoOutline size={22} /> 
                <span>Share</span>
              </button>
            </div>

            <button className="flex items-center gap-1.5 hover:text-orange-600 transition-colors">
              <IoAlertCircleOutline size={22} /> 
              <span>Report</span>
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