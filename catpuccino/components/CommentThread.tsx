// components/CommentThread.tsx
import CommentCard from "./CommentCard";

export default function CommentThread({ data }: { data: any }) {
  return (
    <div className="w-full bg-[#FEF6EA] border-[1.5px] border-[#855225] rounded-[20px] p-6 mb-6 shadow-[5px_5px_0_0_rgba(133,82,37,0.1)]">
      <CommentCard comment={data} />
    </div>
  );
}