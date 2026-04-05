"use client";

import { useRouter } from "next/navigation";
import { IoTrashOutline, IoPencil } from "react-icons/io5";

export default function PostControls({ postId }: { postId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this post? 😿");
    
    if (!isConfirmed) return;

    try {
      // Assuming you will create this API route next!
      const res = await fetch(`/api/auth/post/${postId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Post deleted successfully.");
        router.push("/home"); 
      } else {
        alert("Failed to delete post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="flex gap-3 items-center ml-auto">
      <button 
        onClick={() => router.push(`/edit-post/${postId}`)}
        className="w-10 h-10 flex items-center justify-center bg-[#855225] text-white rounded-[4px] hover:scale-105 transition-transform shadow-[3px_3px_0_0_rgb(133_82_37_/_0.3)]"
        title="Edit Post"
      >
        <IoPencil size={20} />
      </button>
      <button 
        onClick={handleDelete}
        className="w-10 h-10 flex items-center justify-center bg-[#E11F25] text-white rounded-[4px] hover:scale-105 transition-transform shadow-[3px_3px_0_0_rgb(225_31_37_/_0.3)]"
        title="Delete Post"
      >
        <IoTrashOutline size={20} />
      </button>
    </div>
  );
}