// components/PosterBlock.tsx
import { IoPersonCircle } from "react-icons/io5";

interface PosterProps {
  username: string;
  timeAgo: string;
}

export default function PosterBlock({ username, timeAgo }: PosterProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center overflow-hidden">
         {/* Placeholder for actual avatar */}
         <IoPersonCircle className="text-4xl text-gray-200" />
      </div>
      <div className="flex items-center gap-2">
        <span className="font-black text-sm tracking-tight">{username}</span>
        <span className="text-gray-400 text-xs">•</span>
        <span className="text-gray-400 text-xs font-bold">{timeAgo}</span>
      </div>
    </div>
  );
}