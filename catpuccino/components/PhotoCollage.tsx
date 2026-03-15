interface PhotoCollageProps {
  post: any; // Using 'any' to match your PostCarousel setup for now
}

export default function PhotoCollage({ post }: PhotoCollageProps) {
  // If there's no post, don't render anything to be safe
  if (!post) return null; 

  return (
    <div className="w-[800px] h-[450px] shrink-0 grid grid-cols-4 grid-rows-3 gap-3">
      
      {/* Box 1: Tall Left (Spans 1 column, 2 rows downwards) */}
      <div className="col-span-1 row-span-2 bg-[#DDF4FF] rounded-xl border-[1.5px] border-black/10" />
      
      {/* Box 2: Top Middle (Standard 1x1 block) */}
      <div className="col-span-1 row-span-1 bg-[#DDF4FF] rounded-xl border-[1.5px] border-black/10" />
      
      {/* Box 3: Big Right (Spans 2 columns wide, 2 rows downwards) */}
      <div className="col-span-2 row-span-2 bg-[#DDF4FF] rounded-xl border-[1.5px] border-black/10" />
      
      {/* Box 4: Bottom Middle (Sits perfectly right under Box 2) */}
      <div className="col-span-1 row-span-1 bg-[#DDF4FF] rounded-xl border-[1.5px] border-black/10" />

      {/* Box 5: Wide Bottom Left (Spans 2 columns wide) */}
      <div className="col-span-2 row-span-1 bg-[#DDF4FF] rounded-xl border-[1.5px] border-black/10" />
      
      {/* Box 6: Bottom Right Middle */}
      <div className="col-span-1 row-span-1 bg-[#DDF4FF] rounded-xl border-[1.5px] border-black/10" />
      
      {/* Box 7: Bottom Far Right */}
      <div className="col-span-1 row-span-1 bg-[#DDF4FF] rounded-xl border-[1.5px] border-black/10" />
      
    </div>
  );
}