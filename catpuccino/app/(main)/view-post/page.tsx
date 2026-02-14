// app/(main)/view-post/page.tsx
import { cafes } from "@/app/data/cafes";
import PostHeader from "@/components/view-post/PostHeader";
import RatingSidebar from "@/components/view-post/RatingChart";
import LocationCard from "@/components/view-post/LocCard";

export default function ViewPostPage({ params }: { params: { cafeId: string } }) {
  const cafe = cafes.find(c => c.id === Number(params.cafeId));
  if (!cafe) return <div className="text-center mt-20">Cafe not found.</div>;

  return (
    <main className="min-h-screen bg-[#FBF3DE] px-[140px] py-12">
      <div className="flex items-center gap-4 mb-10 max-w-[1400px] mx-auto">
        <h1 className="text-[#855225] font-poppins font-black text-lg uppercase">
          {cafe.title}
        </h1>
        <div className="h-[3px] flex-1 rounded-full bg-[#FEF6EA] shadow-[5px_5px_0_0_#85522533] mt-1"></div>
      </div>

      <div className="flex gap-16 items-start max-w-[1400px] mx-auto">
        <div className="flex-1 max-w-[850px] space-y-10">
          <PostHeader
            title={cafe.title}
            imageUrl={cafe.imageUrl}
            tags={cafe.tags}
            price={cafe.price}
            city={cafe.city}
            time={cafe.time}
          />
          <LocationCard />
        </div>

        <div className="w-[420px]">
          <RatingSidebar ratings={cafe.ratings} />
        </div>
      </div>
    </main>
  );
}