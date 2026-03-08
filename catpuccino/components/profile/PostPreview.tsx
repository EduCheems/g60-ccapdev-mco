import VoteButtons from "../VoteButtons";
import ReplyButton from "../ReplyButton";
import Link from "next/link"; 

import { 
  IoLocationSharp, 
  IoPricetag, 
  IoTime, 
  IoPersonCircle, 
} from "react-icons/io5";

const InfoTag = ({ icon: Icon, iconColor, label, value }: { icon: React.ElementType; iconColor: string; label: string; value: string }) => (
  <div className="flex items-center gap-2.5">
    <div className="flex items-center justify-center w-7 h-7 bg-white border-[1.5px] border-black rounded-md shadow-[inset_3px_3px_1px_rgba(133,82,37,0.3)]">
      <Icon className={`text-[15px] ${iconColor}`} />
    </div>
    <div className="flex flex-col gap-0.5 leading-none">
      <span className="text-[10px] text-black font-extrabold uppercase tracking-wide">{label}:</span>
      <span className="text-xs text-black font-bold">{value}</span>
    </div>
  </div>
);

export default function PostPreview() {
  return (
    <div className="w-full max-w-[800px] border-[1.5px] border-black bg-[#FEF6EA] rounded-2xl p-6 font-montserrat shadow-[5px_5px_0_0_rgb(133_82_37_/_0.2)]">
      
      {/* Header: User Info */}
      <div className="flex items-center gap-3 mb-4">
        <IoPersonCircle className="w-9 h-9 text-[#A86734]" />
        <span className="text-sm font-medium text-black">
          &lt;username&gt; - &lt;no. hr/days ago&gt;
        </span>
        <button className="ml-auto text-gray-500 font-bold tracking-widest hover:text-black">
          •••
        </button>
      </div>

      {/* Title & Cafe */}
      <h2 className="text-3xl font-black text-black mb-1 tracking-tight">Title</h2>
      <p className="text-sm font-medium text-black mb-5">&lt;Cafe Name&gt;</p>

      {/* Tags Grid */}
      <div className="flex flex-wrap gap-6 mb-6">
        <InfoTag 
          icon={IoPricetag} 
          iconColor="text-[#FFB800]" /* Yellow */
          label="Price" 
          value="₱150-₱350" 
        />
        <InfoTag 
          icon={IoLocationSharp} 
          iconColor="text-[#E63946]" /* Red */
          label="City" 
          value="Quezon City" 
        />
        <InfoTag 
          icon={IoTime} 
          iconColor="text-[#FF7A00]" /* Orange */
          label="Time" 
          value="7:30 AM - 10:00 PM" 
        />
      </div>

      {/* Content Snippet */}
      <div className="mb-6">
        <p className="text-[13px] leading-relaxed text-black/90 text-justify line-clamp-3">
          I have been struggling to lock in these past few days. I keep getting distracted by mini tasks or get consumed by social media. I am glad to have listened to my friend when they recommended that I should study in this specific cat cafe. At first I was in doubt since how can you lock in on your tasks when there are cats around. But boy, was I in shock when I tried this cafe. Not only did I lock in, but having a cat companion boosted my concentration. If ever I get stuck, I would just pat the cat sitting on my lap which actually helped me think. Definitely would come again. They also study friendly food selection. Foods that aren't too messy to eat.
        </p>
        
        <Link 
          href="/post/123" /* TODO: Make  the API shit */
          className="text-[13px] font-bold text-[#A86734] hover:text-black hover:underline transition-colors mt-1 inline-block"
        >
          See more
        </Link>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center gap-4">
        <VoteButtons initialVotes={67} initialUserVote={null} />

        <ReplyButton replyCount={24} />
      </div>

    </div>
  );
}