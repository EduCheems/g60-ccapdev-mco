// app/(main)/cafe/[id]/page.tsx
import SpotlightSection from '@/components/view-post/Spotlights';
import RatingSidebar from '@/components/view-post/RatingChart';
import Comments from "@/components/CommentCard";

export default async function ViewCafePage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Await the params
  const { id } = await params; 
  const cafeName = id ? id.replace(/-/g, ' ') : "Cafe Not Found";
  
  const cafeRatings = { Sociability: 5, Ambience: 4, Food: 5, Catmosphere: 4, Service: 3 };
  
  const mockReviews = [
    { username: "Customer #1", timeAgo: "10m ago", text: "amazing cats, 100% coming back", likes: 67 },
    { username: "JoJoFan", timeAgo: "1h ago", text: "The vibes here are truly menacing (in a good way).", likes: 12 },
    { username: "CatLover_PH", timeAgo: "3h ago", text: "Super friendly staff and even friendlier kittens!", likes: 24 },
  ];

  return (
    <div className="min-h-screen bg-[#FBF3DE] px-24 py-16 selection:bg-[#4A90E2] selection:text-white">
      <div className="flex gap-16">
        
        {/* LEFT COLUMN: MAIN CONTENT */}
        <div className="flex-1">
          {/* 1. HERO IMAGE */}
          <div className="w-full aspect-[21/9] bg-[#D9D9D9] rounded-[48px] border-4 border-black mb-12 shadow-[8px_8px_0_0_rgba(0,0,0,1)] overflow-hidden">
             {/* Imagine a high-res interior shot here */}
          </div>
          
          {/* 2. CAFE TITLE */}
          <h1 className="text-8xl font-black uppercase mb-4 tracking-tighter leading-none text-[#262626]">
            {cafeName}
          </h1>
          
          {/* 3. METADATA STRIP */}
          <div className="flex gap-8 mb-10 items-center">
             <div className="flex items-center gap-2 font-black text-sm uppercase">
                <div className="w-10 h-10 bg-[#4A90E2] border-2 border-black rounded shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex items-center justify-center text-white text-xl font-bold">₱</div>
                <span>100 - 500</span>
             </div>
             <div className="flex items-center gap-2 font-black text-sm uppercase">
                <div className="w-10 h-10 bg-[#FFD700] border-2 border-black rounded shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex items-center justify-center text-black text-xl">📍</div>
                <span>Manila City</span>
             </div>
             <div className="flex items-center gap-2 font-black text-sm uppercase">
                <div className="w-10 h-10 bg-[#FF6B6B] border-2 border-black rounded shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex items-center justify-center text-white text-xl">🕒</div>
                <span>9AM - 11PM</span>
             </div>
          </div>

          {/* 4. BIO/DESCRIPTION */}
          <p className="text-2xl font-bold leading-tight text-gray-800 mb-16 max-w-3xl italic border-l-8 border-[#4A90E2] pl-6">
            "The premier destination for cat lovers in Manila. Come for the coffee, stay for the companions."
          </p>

          {/* 5. SPOTLIGHT (Cats, Food, Menu) */}
          <SpotlightSection />
          
          {/* 6. REVIEWS FEED SECTION */}
          <div className="mt-28 border-t-4 border-black pt-16">
             <div className="flex justify-between items-end mb-12">
                <div>
                   <h2 className="text-6xl font-black uppercase tracking-tighter">Reviews</h2>
                   <p className="text-[#666] font-bold uppercase tracking-widest text-sm">{mockReviews.length} Responses from the community</p>
                </div>
                <button className="bg-[#4A90E2] text-white px-8 py-4 rounded-2xl font-black uppercase border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">
                  Write a Review
                </button>
             </div>

             {/* Filter Tabs */}
             <div className="flex gap-4 mb-12">
                {["All", "Cat", "Most Relevant", "With Media"].map((filter, i) => (
                  <button 
                    key={filter} 
                    className={`px-6 py-2 rounded-xl font-black text-xs uppercase border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] ${i === 0 ? 'bg-black text-white' : 'bg-white text-black'}`}
                  >
                    {filter}
                  </button>
                ))}
             </div>

             {/* Review Items */}
             <div className="flex flex-col gap-8">
                {/* 3. Removed the dashed placeholder and just call Comments directly */}
                <Comments reviews={mockReviews} />
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE PAWMETER SIDEBAR */}
        <aside className="w-[400px]">
           <div className="sticky top-10">
              <RatingSidebar ratings={cafeRatings} />
           </div>
        </aside>
      </div>
    </div>
  );
}