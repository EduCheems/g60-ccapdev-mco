"use client";
import { IoChatbubbleOutline } from "react-icons/io5";

interface ReplyButtonProps {
  replyCount: number;
  onClick?: (e: React.MouseEvent) => void;
}

export default function ReplyButton({ replyCount, onClick }: ReplyButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 border-[1.5px] border-black rounded-full shadow-[inset_4px_4px_1px_rgba(133_82_37_/_0.2)] px-5 py-1.5 hover:bg-black/5 transition-colors"
    >
      <IoChatbubbleOutline className="text-lg text-black" />
      {/* TO-DO: Make dynamic counting */}
      <span className="font-bold text-black text-sm tabular-nums">{replyCount}</span>
    </button>
  );
}

