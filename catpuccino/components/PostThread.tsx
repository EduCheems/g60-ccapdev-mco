import PostPreview from "./profile/PostPreview";
import MiniComment from "./MiniComment";

export default function PostThread() {
  return (
    <div className="w-[800px] shrink-0 flex flex-col">
      
      <PostPreview 
        id="thread-1"
        cafeName="Meow Cafe"
        rating={5}
        username="CatLover99"
        price="₱₱"
        city="Makati"
        time="8:00 AM - 9:00 PM"
        content="This place is amazing! The orange cat 'Mochi' is literally a social butterfly. Highly recommend checking this place out if you need a study break."
      />

      <div className="relative flex gap-6 mt-12">
        
        {/* Branch lines*/}
        <div className="absolute left-[48px] -top-12 w-[1.5px] h-12 bg-[#855225]/40" />
        
        {/* Horizontal line */}
        <div className="absolute left-[48px] -top-6 w-[412px] h-[1.5px] bg-[#855225]/40" />
        
        {/* vertical line to branch from horizontal line */}
        <div className="absolute left-[460px] -top-6 w-[1.5px] h-6 bg-[#855225]/40" />

        <div className="flex-1">
          <MiniComment 
            username="CatLover99" 
            timeAgo="2h ago" 
            content="The orange cat 'Mochi' is literally a social butterfly. Highly recommend!" 
          />
        </div>
        
        <div className="flex-1"> 
          <MiniComment 
            username="StudyHard" 
            timeAgo="5h ago" 
            content="Great place to meet people. The cats are the perfect icebreakers." 
          />
        </div>

      </div>
    </div>
  );
}