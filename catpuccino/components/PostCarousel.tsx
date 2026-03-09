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
        
        {posts.map((post) => {
          // Safely calculate the net score for the votes
          const netScore = (post.upvoteCount || 0) - (post.downvoteCount || 0);
          const safeId = post._id || post.id;

          return (
            <div key={safeId} className="snap-center shrink-0 first:pl-0 last:pr-[140px]">
              
              {/* Pass the real post data down to PostThread and PhotoCollage too! */}
              {variant === "thread" && <PostThread post={post} />}
              {variant === "collage" && <PhotoCollage post={post} />} 
              
              {variant === "preview" && (
                <PostPreview 
                  id={safeId}
                  title={post.title || "Untitled"}
                  cafeName={post.cafeID?.name || "Unknown Cafe"}
                  rating={post.overallRating || 0}
                  username={post.authorName || "Anonymous"}
                  price={post.cafeID?.priceRange || "₱ 0"}
                  city={post.cafeID?.location || "Metro Manila"}
                  time={post.cafeID?.operatingHours || "N/A"}
                  content={post.body || ""}
                  image={post.catImage}
                  initialVotes={netScore}
                />
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
}