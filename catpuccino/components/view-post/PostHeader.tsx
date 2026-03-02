interface PostHeaderProps {
  title: string;
  tags: string[];
  price: string;
  city: string;
  time: string;
  imageUrl: string; 
}

export default function PostHeader({ title, tags, price, city, time, imageUrl }: PostHeaderProps) {
  const tagColors: Record<string, string> = {
    "Work-friendly": "bg-[#6B9093]",
    "Aesthetic": "bg-[#92B17B]",
    "Refreshing": "bg-[#A5C691]",
  };

  return (
    <div className="mb-8 border-4 border-black overflow-hidden bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
  <div className="h-64 w-full overflow-hidden border-b-4 border-black">
    <img 
      src={imageUrl} 
      alt={title} 
      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
    />
  </div>

  <div className="p-6">
    <div className="flex gap-3 mb-4">
      {tags.map((tag) => (
        <span 
          key={tag} 
          className={`${tagColors[tag] || 'bg-gray-400'} px-4 py-1 rounded-sm text-white text-xs font-bold border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]`}
        >
          {tag}
        </span>
      ))}
    </div>

    {/* Title */}
    <h1 className="font-black text-lg text-black tracking-tight mb-4">{title}</h1>

    {/* Metadata */}
    <div className="flex flex-wrap gap-5 text-sm font-bold text-black uppercase">
      <span className="flex items-center gap-1">💰 {price}</span>
      <span className="flex items-center gap-1">📍 {city}</span>
      <span className="flex items-center gap-1">🕒 {time}</span>
    </div>
  </div>
</div>
  );
}
