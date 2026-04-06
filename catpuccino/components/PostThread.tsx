import PostPreview from "./profile/PostPreview";
import MiniComment from "./MiniComment";

interface PostThreadProps {
  post: any;
}

export default function PostThread({ post }: PostThreadProps) {
  if (!post) return null; 

  const netScore = (post.upvoteCount || 0) - (post.downvoteCount || 0);
  const safeId = post._id || post.id;
  const comments = post.comments || [];

  return (
    <div className="w-[800px] shrink-0 flex flex-col">
      
      <PostPreview 
        id={safeId}
        title={post.title || "Untitled"}
        cafeName={post.cafeID?.name || "Unknown Cafe"}
        rating={post.overallRating || 0}
        username={post.authorName || "Anonymous"}
        
        authorId={post.authorId}
        authorImage={post.authorImage}
        
        price={post.cafeID?.priceRange || "₱ 0"}
        city={post.cafeID?.location || "Metro Manila"}
        time={post.cafeID?.operatingHours || "N/A"}
        createdAt={post.createdAt}
        content={post.body || ""}
        image={post.catImage}
        initialVotes={netScore}
        initialUserVote={post.userVote}
        commentCount={post.commentCount || 0}
        isAnonymous={post.isAnonymous || false}
      />

      {comments.length > 0 && (
        <div className="relative flex gap-6 mt-12">
        
        {/* Branch lines */}
        <div className="absolute left-[48px] -top-12 w-[1.5px] h-12 bg-[#855225]/40" />
        <div className="absolute left-[48px] -top-6 w-[412px] h-[1.5px] bg-[#855225]/40" />
        <div className="absolute left-[460px] -top-6 w-[1.5px] h-6 bg-[#855225]/40" />

        {comments.map((comment: any) => {
          const commentScore = (comment.upvoteCount || 0) - (comment.downvoteCount || 0);
          const safeCommentId = comment._id || comment.id;

          return (
            <div key={safeCommentId} className="flex-1">
              <MiniComment 
                id={safeCommentId} 
                username={comment.authorName || "Anonymous"} 
                createdAt={comment.createdAt || new Date()}
                content={comment.body || ""} 
                initialVotes={commentScore}
                initialUserVote={comment.userVote}
                parentPostId={safeId}
                replyCount={comment.replyCount || 0}
              />
            </div>
          );
        })}

      </div>
      )}
    </div>
  );
}