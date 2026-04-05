'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { timeAgo as formatTimeAgoLabel } from "@/lib/utils/timeAgo";
import PostPreview from "@/components/profile/PostPreview";
import MiniComment from "@/components/MiniComment";
import EditProfile from "@/components/EditProfile";

const ProfilePage = () => {
  
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState("reviews");
  const [displayName, setDisplayName] = useState<string>("Loading...");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>("/default-profile.svg");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState<string>("");
  const [editProfileImageUrl, setEditProfileImageUrl] = useState<string>("");
  const [bio, setBio] = useState<string>("...");
  const [editBio, setEditBio] = useState<string>("");

  const [topCafe1, setTopCafe1] = useState<string>("---");
  const [topCafe2, setTopCafe2] = useState<string>("---");
  const [topCafe3, setTopCafe3] = useState<string>("---");
  const [editTopCafe1, setEditTopCafe1] = useState<string>("");
  const [editTopCafe2, setEditTopCafe2] = useState<string>("");
  const [editTopCafe3, setEditTopCafe3] = useState<string>("");

  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);

  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const viewedUserId = searchParams.get("userId");
  const isLoggedIn = status === "authenticated";
  
  const isOwnProfile = !viewedUserId;
  const isOwner = typeof session?.user?.email === "string" && session.user.email.toLowerCase().includes("owner");

  useEffect(() => {
   
    if (status === "loading") return;
    if (!isLoggedIn && !viewedUserId) {
       setDisplayName("Guest User");
       setBio("Please log in to view your profile.");
       return;
    }

    const fetchProfile = async () => {
      try {
        const url = viewedUserId
          ? `/api/auth/profile?userId=${viewedUserId}`
          : "/api/auth/profile";
        
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setFollowersCount(data.followersCount ?? 0);
          setFollowingCount(data.followingCount ?? 0);
          setPostsCount(data.postsCount ?? 0);
          setDisplayName(data.username ?? data.name ?? "Random User");
          setBio(data.bio ?? "add bio here");
          setProfileImageUrl(data.profilePic ?? data.profilePicURL ?? "/default-profile.svg");
          setTopCafe1(data.favCafe?.[0] ?? "---");
          setTopCafe2(data.favCafe?.[1] ?? "---");
          setTopCafe3(data.favCafe?.[2] ?? "---");
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, [status, isLoggedIn, viewedUserId]);

  // 2. FETCH POSTS
  useEffect(() => {
    if (status === "loading") return;
    if (!isLoggedIn && !viewedUserId) {
      setPostsLoading(false);
      return;
    }

    setPostsLoading(true);
    const url = viewedUserId
      ? `/api/auth/post?userId=${viewedUserId.toString()}` 
      : `/api/auth/post?isOwnProfile=true`;

    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        const fetchedPosts = Array.isArray(data) ? data : (data?.posts || data?.data || []);
        console.log("Raw posts data from API:", data);
        setPosts(fetchedPosts);
      })
      .catch((err) => {
        console.error(err);
        setPosts([]);
      })
      .finally(() => setPostsLoading(false));
  }, [status, isLoggedIn, viewedUserId]);

  // 3. FETCH COMMENTS
  useEffect(() => {
    if (status === "loading") return;
    if (!isLoggedIn && !viewedUserId) {
      setCommentsLoading(false);
      return;
    }

    setCommentsLoading(true);
    const url = viewedUserId 
      ? `/api/comment?userId=${viewedUserId}` 
      : `/api/comment?isOwnProfile=true`; 

    fetch(url)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        const fetchedComments = Array.isArray(data) ? data : (data?.comments || data?.data || []);
        setComments(fetchedComments);
      })
      .catch((err) => {
        console.error(err);
        setComments([]);
      })
      .finally(() => setCommentsLoading(false));
  }, [status, isLoggedIn, viewedUserId]);

  
  // 4. CHECK FOLLOW STATUS
  useEffect(() => {
    if (!isLoggedIn || isOwnProfile || !viewedUserId) return;

    const checkFollow = async () => {
      try {
        const res = await fetch(`/api/auth/follow?userId=${viewedUserId}`);
        if (res.ok) {
          const { isFollowing: following } = await res.json();
          setIsFollowing(following);
        }
      } catch (err) {
        console.error("Failed to check follow:", err);
      }
    };
    checkFollow();
  }, [isLoggedIn, isOwnProfile, viewedUserId]);


  const handleProfileImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setEditProfileImageUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleToggleFollow = async () => {
    if (!isLoggedIn || isOwnProfile || !viewedUserId) return;
    const action = isFollowing ? "unfollow" : "follow";
    try {
      const res = await fetch("/api/auth/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: viewedUserId, action }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsFollowing(data.isFollowing);
        setFollowersCount((prev) => prev + (data.isFollowing ? 1 : -1));
      }
    } catch (err) {
      console.error("Failed to toggle follow:", err);
    }
  };

  const handleOpenEditProfile = () => {
    setEditName(displayName);
    setEditProfileImageUrl(profileImageUrl ?? "");
    setEditBio(bio);
    setEditTopCafe1(topCafe1);
    setEditTopCafe2(topCafe2);
    setEditTopCafe3(topCafe3);
    setIsEditingProfile(true);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayName(editName.trim() || displayName);
    setProfileImageUrl(editProfileImageUrl.trim() || null);
    setBio(editBio.trim() || bio);
    setTopCafe1(editTopCafe1.trim() || topCafe1);
    setTopCafe2(editTopCafe2.trim() || topCafe2);
    setTopCafe3(editTopCafe3.trim() || topCafe3);
    setIsEditingProfile(false);

    const cafeHolder = [
      editTopCafe1.trim() || topCafe1,
      editTopCafe2.trim() || topCafe2,
      editTopCafe3.trim() || topCafe3
    ].filter(Boolean);

    try {
      const res = await fetch("api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName.trim() || displayName,
          bio: editBio.trim() || bio,
          profilePic: editProfileImageUrl.trim() || profileImageUrl,
          favCafe: cafeHolder,
        }),
      });
      if (!res) console.error("Failed to update");
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const nonAnonymousCommentsCount = comments.filter((c) => c.authorName !== "Anonymous").length;

  return (
    <div className="min-h-screen bg-[#D5AE85] flex flex-col">
      {/* HEADER SECTION  */}
      <section className="bg-[#fff2d1] w-full px-[140px] py-8">
        <div className="flex items-start justify-between gap-8">
          <div className="flex items-center gap-8 min-w-0 flex-1">
            <div className="w-[180px] h-[180px] rounded-full border-4 border-[#733903] overflow-hidden bg-gray-300">
              <img
                src={profileImageUrl || "/default-profile.svg"}
                alt="Profile picture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-3xl font-poppins font-bold text-[#262626] leading-none">
                  {displayName}
                </h1>
                {isOwner && (
                  <img src="/ownertag.svg" alt="Cafe owner badge" className="h-8 w-auto" />
                )}
              </div>
              <div className="flex gap-4 text-[#262626] font-medium">
                <span><strong>{followersCount}</strong> Followers</span>
                <span><strong>{followingCount}</strong> Following</span>
                <span><strong>{postsCount + nonAnonymousCommentsCount}</strong> Posts</span>
              </div>
              <p className="text-[#262626]">{bio}</p>
              <div className="mt-4 flex flex-nowrap gap-3 w-full min-w-0">
                <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0C35B] text-[#3A240D] text-sm font-semibold shadow-[0_3px_0_rgba(0,0,0,0.25)] border border-black/20 flex-1 min-w-0">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#DFA52B] text-xs font-bold border border-black/20">1</span>
                  <span className="truncate">{topCafe1}</span>
                </button>
                <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E2E2E6] text-[#262626] text-sm font-semibold shadow-[0_3px_0_rgba(0,0,0,0.15)] border border-black/10 flex-1 min-w-0">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#C0C0C5] text-xs font-bold border border-black/10">2</span>
                  <span className="truncate">{topCafe2}</span>
                </button>
                <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#B57335] text-[#FBF3DE] text-sm font-semibold shadow-[0_3px_0_rgba(0,0,0,0.35)] border border-black/20 flex-1 min-w-0">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#8E531B] text-xs font-bold border border-black/20">3</span>
                  <span className="truncate">{topCafe3}</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-col items-end gap-2 shrink-0 flex-none">
            {isLoggedIn && isOwnProfile && isOwner && (
              <Link href="/create-cafe" className="px-8 py-2 rounded-full text-sm font-bold border border-[#d55c06] text-white bg-[#d55c06] hover:bg-[#f37b26] transition">
                Create Cafe
              </Link>
            )}
            {isLoggedIn && isOwnProfile && (
              <button onClick={handleOpenEditProfile} className="px-8 py-2 rounded-full text-sm font-bold border border-[#d55c06] text-white bg-[#d55c06] hover:bg-[#f37b26] transition">
                Edit Profile
              </button>
            )}
            {isLoggedIn && !isOwnProfile && (
              <button onClick={handleToggleFollow} className={`px-8 py-2 rounded-full text-sm font-bold border transition ${isFollowing ? "border-[#855225] bg-white text-[#855225] hover:bg-[#F5E4C8]" : "border-[#d55c06] text-white bg-[#d55c06] hover:bg-[#f37b26]"}`}>
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        </div>
      </section>

      <EditProfile
        isOpen={isEditingProfile}
        editName={editName}
        editProfileImageUrl={editProfileImageUrl}
        editBio={editBio}
        editTopCafe1={editTopCafe1}
        editTopCafe2={editTopCafe2}
        editTopCafe3={editTopCafe3}
        onChangeName={setEditName}
        onChangeBio={setEditBio}
        onChangeTopCafe1={setEditTopCafe1}
        onChangeTopCafe2={setEditTopCafe2}
        onChangeTopCafe3={setEditTopCafe3}
        onProfileImageFileChange={handleProfileImageFileChange}
        onCancel={() => setIsEditingProfile(false)}
        onSave={handleSaveProfile}
      />

      {/* TABS SECTION  */}
      <section className="bg-[#FBF3DE] border-t border-[#855225]/20 px-[140px] py-4">
        <div className="flex gap-3">
          <button onClick={() => setActiveTab("reviews")} className={`px-5 py-2 rounded-[10px] text-sm font-bold text-white border-2 border-black transition ${activeTab === "reviews" ? "bg-[#AA4B1B]" : "bg-[#D1B291]"}`}>
            Reviews
          </button>
          <button onClick={() => setActiveTab("comments")} className={`px-5 py-2 rounded-[10px] text-sm font-bold text-white border-2 border-black transition ${activeTab === "comments" ? "bg-[#AA4B1B]" : "bg-[#D1B291]"}`}>
            Comments
          </button>
        </div>
      </section>

      {/* CONTENT SECTION  */}
      <section className="flex-1 bg-[#FEF6EA] px-[140px] py-6 flex flex-col gap-4">
        {activeTab === "reviews" && (
          <div className="flex flex-col gap-6">
            {postsLoading ? (
              <p className="text-[#855225] font-medium">Loading reviews…</p>
            ) : posts.length === 0 ? (
              <p className="text-[#855225]/80">No reviews yet.</p>
            ) : (
              posts.map((post) => {
                const netScore = (post.upvoteCount ?? 0) - (post.downvoteCount ?? 0);
                const safeId = post._id ?? post.id;
                return (
                  <PostPreview
                    key={safeId}
                    id={safeId}
                    title={post.title ?? "Untitled"}
                    cafeName={post.cafeID?.name ?? "Unknown Cafe"}
                    rating={post.overallRating ?? 0}
                    username={post.authorName ?? "Anonymous"}
                    price={post.cafeID?.priceRange ?? "₱"}
                    city={post.cafeID?.location ?? "—"}
                    time={post.cafeID?.operatingHours ?? "—"}
                    content={post.body ?? ""}
                    image={post.catImage}
                    initialVotes={netScore}
                    initialUserVote={post.userVote ?? null}
                    commentCount={post.commentCount ?? 0}
                    createdAt={post.createdAt || new Date()} 
                    postedAt={post.createdAt}
                  />
                );
              })
            )}
          </div>
        )}

        {activeTab === "comments" && (
          <div className="flex flex-col gap-6">
            {commentsLoading ? (
              <p className="text-[#855225] font-medium">Loading comments…</p>
            ) : comments.length === 0 ? (
              <p className="text-[#855225]/80">No comments yet.</p>
            ) : (
              comments.map((comment) => {
                const initialVotes = (comment.upvoteCount ?? 0) - (comment.downvoteCount ?? 0);
                const parentPostId = comment.postID ?? comment.postId;
                if (!parentPostId) return null;
                return (
                  <div key={comment._id} className="flex flex-col gap-2">
                    {comment.postTitle && (
                      <p className="text-xs text-[#855225] font-medium">
                        Comment on: {comment.postTitle}
                      </p>
                    )}
                    <MiniComment
                      id={comment._id}
                      username={comment.authorName ?? "Anonymous"}
                      content={comment.content ?? comment.body ?? ""}
                      createdAt={comment.createdAt || new Date()} 
                      initialVotes={initialVotes}
                      parentPostId={parentPostId}
                      initialUserVote={comment.userVote ?? null}
                      replyCount={comment.replyCount ?? 0}
                    />
                  </div>
                );
              })
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;