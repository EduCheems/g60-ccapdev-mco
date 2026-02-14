import { cafes } from "@/app/data/cafes";
import SpotlightSection from "@/components/view-post/Spotlights";
import RatingSidebar from "@/components/view-post/RatingChart";
import Comments from "@/components/CommentCard";

export default async function ViewCafePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Await the params to get the actual ID (the slug) from the URL
  const { id } = await params;

  // 2. Find by slug (using the resolved 'id' from params)
  const cafe = cafes.find((c) => c.slug === id);

  // 3. Handle Case where cafe is not found
  if (!cafe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-black bg-[#FBF3DE]">
        <h1 className="text-4xl uppercase">Cafe Not Found</h1>
        <p className="text-gray-500 mt-2">We couldn't find a cafe with the slug: "{id}"</p>
        <a href="/discover" className="mt-4 underline text-[#4A90E2]">Return to Discover</a>
      </div>
    );
  }

  const mockReviews = [
    { username: "Customer #1", timeAgo: "10m ago", text: "amazing cats, 100% coming back", likes: 67 },
    { username: "JoJoFan", timeAgo: "1h ago", text: "The vibes here are truly menacing (in a good way).", likes: 12 },
    { username: "CatLover_PH", timeAgo: "3h ago", text: "Super friendly staff and even friendlier kittens!", likes: 24 },
  ];

  return (
    <div className="min-h-screen bg-[#FBF3DE] px-24 py-16">
      <div className="flex gap-16">

        {/* LEFT COLUMN */}
        <div className="flex-1">

          {/* HERO IMAGE */}
          <div className="w-full aspect-[21/9] bg-[#D9D9D9] rounded-lg border-[2px] border-black mb-12 border-black overflow-hidden rounded-none shadow-[5px_5px_0_0_#85522533]">
            <img
              src={cafe.imageUrl}
              alt={cafe.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative flex-1 bg-[#FEF6EA] border-2 border-black rounded-[20px] px-6 py-6 flex-col shadow-[6px_6px_0_0_#85522533,inset_4px_4px_10px_rgba(133,82,37,0.2)]">
            {/* TITLE */}
            <h1 className="text-[42px] font-black uppercase mb-4 tracking-tighter leading-none text-[#262626] ">
              {cafe.title}
            </h1>

            {/* METADATA */}
            <div className="flex gap-8 mb-8 items-center font-black text-sm uppercase">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#4A90E2] rounded-lg border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex items-center justify-center text- text-xl shadow-[5px_5px_0_0_#85522533]">
                  ₱
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[14px] font-montserrat font-black text-[#262626] leading-none">Price:</span>
                  <span className="text-[18px] font-montserrat font-regular text-black">{cafe.price}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#FFD700] rounded-lg  border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex items-center justify-center text-black text-xl shadow-[5px_5px_0_0_#85522533]">
                  📍
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[14px] font-black text-[#262626] leading-none">City:</span>
                  <span className="text-[18px] font-bold text-black">{cafe.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#FF6B6B] rounded-lg  border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex items-center justify-center text-black text-xl shadow-[5px_5px_0_0_#85522533]">
                  🕒
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[14px] font-black text-[#262626] leading-none">Time:</span>
                  <span className="text-[18px] font-bold text-black">{cafe.time}</span>
                </div>
              </div>
            </div>

            {/* DESCRIPTION PARAGRAPH */}
            <div className="mb-3">
              <p className="text-[18px] leading-[1.6] text-[#262626] font-medium text-justify">
                I have been struggling to lock in these past few days. I keep getting distracted by mini tasks 
                or get consumed by social media. I am glad to have listened to my friend when they 
                recommended that I should study in this specific cat cafe. At first I was in doubt since how 
                can you lock in on your tasks when there are cats around. But boy, was I in shock when I 
                tried this cafe. Not only did I lock in, but having a cat companion boosted my concentration. 
                If ever I get stuck, I would just pat the cat sitting on my lap which actually helped me think. 
                Definitely would come again. They also study friendly food selection. Foods that aren't too 
                messy to eat.
              </p>
            </div>

            {/* SPOTLIGHT */}
            <SpotlightSection />
          </div>

          {/* REVIEWS */}
          <div className="mt-28 border-t-4 border-black pt-16">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-6xl font-black uppercase tracking-tighter">
                  Reviews
                </h2>
                <p className="text-[#666] font-bold uppercase tracking-widest text-sm">
                  {mockReviews.length} Responses from the community
                </p>
              </div>

              <button className="bg-[#4A90E2] text-white px-8 py-4 font-black uppercase border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all rounded-none">
                Write a Review
              </button>
            </div>

            <Comments reviews={mockReviews} />
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="w-[400px]">
            <RatingSidebar ratings={cafe.ratings} />
        </aside>

      </div>
    </div>
  );
}