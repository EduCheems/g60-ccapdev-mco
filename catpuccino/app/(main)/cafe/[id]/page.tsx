import { cafes } from "@/app/data/cafes";
import RatingSidebar from "@/components/view-post/RatingChart";
import Comments from "@/components/CommentCard";
import SpotlightSection, { CafeMenu } from "@/components/view-post/Spotlights";
import { IoLocationSharp, IoPricetag, IoTime } from "react-icons/io5";
import Ratings from "@/components/view-post/Ratings";
import { Review, reviews } from "@/app/data/reviews";

export default async function ViewCafePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cafe = cafes.find((c) => c.slug === id);

  if (!cafe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-black bg-[#FBF3DE]">
        <h1 className="text-4xl uppercase">Cafe Not Found</h1>
        <p className="text-gray-500 mt-2">We couldn't find a cafe with the slug: "{id}"</p>
        <a href="/home" className="mt-4 underline text-[#4A90E2]">Return to Home</a>
      </div>
    );
  }

  const cafeReviews = reviews.filter(r => r.cafeId === cafe.id);
  /*const mockReviews = [
    { username: "Customer #1", timeAgo: "10m ago", text: "amazing cats, 100% coming back", likes: 67, imageUrl: "/comsec-imgs/skeleton.png", avatarUrl: "/comsec-imgs/skeleton.png" },
    { username: "JoJoFan", timeAgo: "1h ago", text: "The vibes here are truly menacing (in a good way).", likes: 12 },
    { username: "CatLover_PH", timeAgo: "3h ago", text: "Super friendly staff and even friendlier kittens!", likes: 24 },
  ];*/

  return (
    <div className="min-h-screen bg-[#FBF3DE] px-24 py-16">
      <div className="flex gap-16">

        {/* LEFT COLUMN */}
        <div className="flex-1">

          {/* HERO IMAGE */}
          <div className="w-full aspect-[21/9] bg-[#D9D9D9] border-2 border-black mb-10 overflow-hidden rounded-[10px] shadow-[5px_5px_0_0_#85522533]">
            <img
              src={cafe.imageUrl}
              alt={cafe.title}
              className="w-full h-full object-cover rounded-[10px]" 
            />
          </div>

          <div className="relative flex-1 bg-[#FEF6EA] border-2 border-[#855225] rounded-[10px] px-6 py-6 flex-col shadow-[5px_5px_0_0_#85522533]">
            {/* TITLE */}
            <h1 className="text-[47px] font-black mb-4 tracking-tighter leading-none text-[#855225] ">
              {cafe.title}
            </h1>

            {/* METADATA */}
            <div className="flex gap-5 mb-5 items-center font-black text-sm uppercase">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FFFFFF] rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center text- text-xl shadow-[5px_5px_0_0_#85522533]">
                  <IoPricetag className=" text-xl text-[#FBBA00]" />
                </div>
                <div className="flex flex-col mt-1">
                  <span className="text-[12px] font-montserrat font-black text-[#262626] leading-none">Price:</span>
                  <span className="text-[10px] font-montserrat font-regular text-black">{cafe.price}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FFFFFF] rounded-[4px]  border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center text-black text-xl shadow-[5px_5px_0_0_#85522533]">
                  <IoLocationSharp className="text-xl text-[#E11F25]" />
                </div>
                <div className="flex flex-col mt-1">
                  <span className="text-[12px] font-black text-[#262626] leading-none">City:</span>
                  <span className="text-[10px] font-bold text-black">{cafe.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FFFFFF] rounded-[4px]  border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center text-black text-xl shadow-[5px_5px_0_0_#85522533]">
                  <IoTime className="text-xl text-[#FF7300]" />
                </div>
                <div className="flex flex-col mt-1">
                  <span className="text-[12px] font-black text-[#262626] leading-none">Time:</span>
                  <span className="text-[10px] font-bold text-black">{cafe.time}</span>
                </div>
              </div>

              <div className="ml-auto flex items-center border-[#855225]/20 h-10">
                <Ratings ratings={cafe.ratings} />
              </div>
            </div>

            <div className="border-b-2 border-[#855225] mb-5 w-full" />

            {/* DESCRIPTION PARAGRAPH */}
            <div className="-mb-6">
              <p className="text-[14px] leading-[1.6] text-[#262626] font-medium text-justify">
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

          {/* REVIEWS SECTION */}
          
            <div className="flex items-center gap-30 mt-10 mb-2">
              <h2 className="font-montserrat font-bold text-[30px] text-[#855225] uppercase tracking-tighter whitespace-nowrap">
                Reviews ({cafeReviews.length})
              </h2>

            <div className="ml-auto flex gap-3">
              {["All(67)", "Cat (10)", "Most Relevant(10)", "With Media(67)"].map((label, idx) => (
                <button 
                  key={label}
                  className={`px-5 py-2.5 rounded-[12px] text-[12px] font-bold transition-all border-2 border-black
                    ${idx === 0 
                      ? 'bg-[#A83600] text-white' 
                      : 'bg-[#D5AE85] text-white hover:bg-[#A83600] cursor-pointer' 
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

            <Comments reviews={cafeReviews} />

            <div className="mt-2 flex justify-start">
              <button className="bg-[#E5781E] rounded-[10px] text-white px-8 py-3 font-black uppercase border-2 border-black shadow-[5px_5px_0_0_#85522533] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                Write a Review
              </button>
            </div>
          
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="w-[380px] flex flex-col gap-8 h-fit">
            <RatingSidebar ratings={cafe.ratings} />
               <CafeMenu />
        </aside>

      </div>
    </div>
  );
}