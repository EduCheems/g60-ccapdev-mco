// app/(main)/view-post/page.tsx
import SpotlightSection from '@/components/view-post/Spotlights';
import RatingSidebar from '@/components/view-post/RatingChart';

export default function ViewPostPage() {
  const mockRatings = { Sociability: 5, Ambience: 4, Food: 5, Catmosphere: 4, Service: 3 };

  return (
    <div className="min-h-screen bg-[#FBF3DE] px-24 py-16">
      <div className="flex gap-16">
        
        {/* Main Feed Content */}
        <div className="flex-1">
          {/* Main Post Image */}
          <div className="w-full aspect-[21/9] bg-[#D9D9D9] rounded-[48px] border-4 border-[#4A90E2] mb-8" />
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gray-500 rounded-full" />
            <div className="flex gap-2 items-baseline">
              <span className="font-black text-xl">Customer #1</span>
              <span className="text-gray-400 font-bold text-sm">• 10m ago</span>
            </div>
          </div>

          <h1 className="text-6xl font-black uppercase mb-6">Great Food Service</h1>
          <p className="text-xl font-medium leading-snug text-gray-800 mb-12 max-w-4xl">
            I have been struggling to lock in these past few days. I keep getting distracted by mini tasks or get consumed by social media...
          </p>

          <SpotlightSection />
        </div>

        {/* The Sidebar */}
        <RatingSidebar ratings={mockRatings} />
      </div>
    </div>
  );
}