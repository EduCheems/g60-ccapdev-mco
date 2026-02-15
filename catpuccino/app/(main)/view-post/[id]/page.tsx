import { cafes } from "@/app/data/cafes";
import RatingSidebar from "@/components/view-post/RatingChart";
import Comments from "@/components/CommentCard";
import SpotlightSection, { CafeMenu } from "@/components/view-post/Spotlights";
import Link from "next/link";
import { 
  IoLocationSharp, 
  IoPricetag, 
  IoTime, 
  IoCalendarOutline, 
  IoPersonCircle, 
  IoArrowUpOutline, 
  IoArrowDownOutline,
  IoChatbubbleOutline 
} from "react-icons/io5";
import Ratings from "@/components/view-post/Ratings";

const sampleComments = [
  {
    username: "CoffeeBean_24",
    timeAgo: "2 hours ago",
    text: "This place is actually amazing for studying! The cats are super chill and don't jump on your laptop while you're working.",
    likes: 12,
  },
  {
    username: "MeowMaster",
    timeAgo: "5 hours ago",
    text: "Did you try the Mango Frappe? It's a game changer.",
    likes: 8,
    imageUrl: "/images/frappe-sample.jpg" 
  }
];

export default async function ViewPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cafe = cafes.find((c) => c.slug === id) || cafes[0]; 

  const mockPost = {
    username: "CatLover_PH",
    date: "Feb 15, 2026",
    userRating: { "Cats": 5, "Service": 4, "Ambiance": 5, "Value": 4 },
    content: "I have been struggling to lock in these past few days. I keep getting distracted by mini tasks or get consumed by social media. I am glad to have listened to my friend when they recommended that I should study in this specific cat cafe. At first I was in doubt since how can you lock in on your tasks when there are cats around. But boy, was I in shock when I tried this cafe.", 
  };

  return (
    <div className="min-h-screen bg-[#FBF3DE] px-24 py-16 font-montserrat">
      <div className="flex gap-16">

        <div className="flex-1">

          <div className="w-full aspect-[21/9] bg-[#D9D9D9] border-2 border-black mb-10 overflow-hidden rounded-[10px] shadow-[5px_5px_0_0_#85522533]">
            <img src={cafe.imageUrl} alt="User Post" className="w-full h-full object-cover rounded-[10px]" />
          </div>

          <div className="relative flex-1 bg-[#FEF6EA] border-2 border-[#855225] rounded-[10px] px-6 py-6 flex-col shadow-[5px_5px_0_0_#85522533]">
            
            <h1 className="text-[47px] font-black mb-4 tracking-tighter leading-none text-[#855225]">
              {cafe.title} Review
            </h1>

            {/* Headlines */}
            <div className="flex flex-wrap gap-5 mb-5 items-center font-black text-sm uppercase">
              
              {/* Posted By */}
              <Link href={`/profile/${mockPost.username}`} className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center">
                  <IoPersonCircle className="text-xl text-[#4A90E2]" />
                </div>
                <div className="flex flex-col mt-1">
                  <span className="text-[10px] leading-none text-[#262626]">Posted By:</span>
                  <span className="text-[10px] text-black/70">{mockPost.username}</span>
                </div>
              </Link>

              {/* Price */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center">
                  <IoPricetag className="text-xl text-[#FBBA00]" />
                </div>
                <div className="flex flex-col mt-1 text-[10px]">
                  <span className="leading-none text-[#262626]">Price:</span>
                  <span className="text-black/70">{cafe.price}</span>
                </div>
              </div>

              {/* City */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center">
                  <IoLocationSharp className="text-xl text-[#E11F25]" />
                </div>
                <div className="flex flex-col mt-1 text-[10px]">
                  <span className="leading-none text-[#262626]">City:</span>
                  <span className="text-black/70">{cafe.city}</span>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-[4px] border-2 border-black shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)] flex items-center justify-center">
                  <IoTime className="text-xl text-[#FF7300]" />
                </div>
                <div className="flex flex-col mt-1 text-[10px]">
                  <span className="leading-none text-[#262626]">Time:</span>
                  <span className="text-black/70">{cafe.time}</span>
                </div>
              </div>

              {/* Ratings*/}
              <div className="ml-auto flex items-center h-10">
                <Ratings ratings={mockPost.userRating} />
              </div>
            </div>

            <div className="border-b-2 border-[#855225] mb-5 w-full" />

            {/* DESCRIPTION */}
            <p className="text-[14px] leading-[1.6] text-[#262626] font-medium text-justify mb-8">
              {mockPost.content}
            </p>

            {/* SPOTLIGHT SECTION */}
            <SpotlightSection />

            {/* INTERACTION BAR (NOW BELOW SPOTLIGHT) */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center bg-white border-2 border-[#855225] rounded-[10px] shadow-[4px_4px_0_0_#85522533] overflow-hidden">
                <button className="p-2 hover:bg-green-50 border-r-2 border-[#855225] transition-colors active:translate-y-[1px]">
                  <IoArrowUpOutline className="text-xl text-[#855225]" />
                </button>
                <span className="px-4 font-black text-[#855225] text-md tabular-nums">124</span>
                <button className="p-2 hover:bg-red-50 border-l-2 border-[#855225] transition-colors active:translate-y-[1px]">
                  <IoArrowDownOutline className="text-xl text-[#855225]" />
                </button>
              </div>

              <button className="flex items-center gap-2 bg-[#855225] text-white px-4 py-2 rounded-[8px] border-2 border-[#855225] shadow-[4px_4px_0_0_#26262633] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black text-xs uppercase active:scale-95">
                <IoChatbubbleOutline className="text-lg" />
                Comment
              </button>
            </div>
          </div>

          {/* DISCUSSION HEADER & FILTERS */}
          <div className="flex items-center mt-12 mb-4">
            <h2 className="font-bold text-[30px] text-[#855225] uppercase tracking-tighter">
              Discussion (12)
            </h2>
            <div className="ml-auto flex gap-2">
              {["All(67)", "Cat (10)", "Most Relevant(10)"].map((label, idx) => (
                <button 
                  key={label}
                  className={`px-4 py-2 rounded-[10px] text-[10px] font-black border-2 border-black transition-all
                    ${idx === 0 ? 'bg-[#A83600] text-white shadow-[3px_3px_0_0_#000]' : 'bg-[#D1B291] text-white hover:bg-[#A83600]'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <Comments reviews={sampleComments} /> 
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