import PostPreview from "./profile/PostPreview";
import PostThread from "./PostThread";
import PhotoCollage from "./PhotoCollage";

interface PostCarouselProps {
  posts: any[]; 
  variant?: "preview" | "thread" | "collage"; 
}

export default function PostCarousel({ posts, variant = "preview" }: PostCarouselProps) {
  return (
    <div className="w-full bg-[#FEF6EA] py-12 overflow-hidden">
      <div className="flex overflow-x-auto gap-12 px-[140px] pb-10 -mb-10 snap-x snap-mandatory no-scrollbar">
        
        {posts.map((_, index) => (
          <div key={index} className="snap-center shrink-0 first:pl-0 last:pr-[140px]">
            {variant === "thread" && <PostThread />}
            {variant === "collage" && <PhotoCollage />}
            {variant === "preview" && 
            <PostPreview 
              id="thread-1"
              cafeName="Meow Cafe"
              rating={5}
              username="CatLover99"
              price="₱₱"
              city="Makati"
              time="8:00 AM - 9:00 PM"
              content="This place is amazing! The orange cat 'Mochi' is literally a social butterfly. Highly recommend checking this place out if you need a study break."
            />}
          </div>
        ))}

      </div>
    </div>
  );
}