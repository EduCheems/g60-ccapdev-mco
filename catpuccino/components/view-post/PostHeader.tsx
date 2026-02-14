// components/view-post/PostHeader.tsx

interface PostHeaderProps {
  tags: string[];
  price: string; // Add this
  city: string;  // Add this
  time: string;  // Add this
}

export default function PostHeader({ title, tags }: { title: string; tags: string[] }) {
  const tagColors: Record<string, string> = {
    "Work-friendly": "bg-[#6B9093]",
    "Aesthetic": "bg-[#92B17B]",
    "Refreshing": "bg-[#A5C691]",
  };

  return (
    <div className="mb-6">
      <div className="flex gap-3 mb-4">
        {tags.map((tag) => (
          <span 
            key={tag} 
            className={`${tagColors[tag] || 'bg-gray-400'} px-4 py-1 rounded-full text-white text-xs font-bold shadow-[2px_2px_0_0_rgba(0,0,0,0.1)]`}
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className="text-5xl font-black text-black tracking-tight">{title}</h1>
    </div>
  );
}
