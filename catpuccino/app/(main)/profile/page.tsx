'use client'

import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Comments from "@/components/CommentCard";
import Link from "next/link";
import PostPreview from "@/components/profile/PostPreview";


const ProfilePage = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState("reviews");
  const [displayName, setDisplayName] = useState<string>("CatLover67");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState<string>(displayName);
  const [editProfileImageUrl, setEditProfileImageUrl] = useState<string>("");
  const [bio, setBio] = useState<string>("add bio here");
  const [editBio, setEditBio] = useState<string>(bio);

  const [isFollowing, setIsFollowing] = useState(false);

  const viewedUserId = searchParams.get("userId");
  const loggedInUserId = (session?.user as any)?.id as string | undefined;

  const isLoggedIn = !!session;
  const isOwnProfile = !viewedUserId || viewedUserId === loggedInUserId;
  
  const handleToggleFollow = () => {
    if (!isLoggedIn || isOwnProfile) return;
    setIsFollowing((prev) => !prev);
    // TODO: Hook this up to a follow/unfollow API when available
  };

  const handleOpenEditProfile = () => {
    setEditName(displayName);
    setEditProfileImageUrl(profileImageUrl ?? "");
    setEditBio(bio);
    setIsEditingProfile(true);
  };

  const handleCancelEditProfile = () => {
    setIsEditingProfile(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayName(editName.trim() || displayName);
    setProfileImageUrl(editProfileImageUrl.trim() || null);
    setBio(editBio.trim() || bio);
    setIsEditingProfile(false);
  };


  useEffect(()=>{
    setDisplayName(session?.user?.name||displayName)
    setBio(session?.user?.bio ||bio)
    setProfileImageUrl(session?.user.profilePicURL||session?.user.image||profileImageUrl);
  },[session]);
  return (
    <div className="min-h-screen bg-[#D5AE85] flex flex-col">

      {/*  HEADER SECTION  */}
      <section className="bg-[#fff2d1] w-full px-[140px] py-8">
        <div className="flex items-center gap-8">

          {/* Profile Picture */}
          <div
            className="w-[180px] h-[180px] bg-gray-300 rounded-full border-4 border-[#855225]/40"
            style={
              profileImageUrl
                ? {
                    backgroundImage: `url(${profileImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          ></div>

          {/* Profile Info */}
          <div className="flex flex-col gap-3">

            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-poppins font-bold text-[#262626]">
                {displayName}
              </h1>

              {isLoggedIn && isOwnProfile && (
                <button
                  onClick={handleOpenEditProfile}
                  className="px-6 py-2 rounded-[10px] text-sm font-bold border border-[#d55c06] text-white bg-[#d55c06] hover:bg-[#f37b26] transition"
                >
                  Edit Profile
                </button>
              )}

              {isLoggedIn && !isOwnProfile && (
                <button
                  type="button"
                  onClick={handleToggleFollow}
                  className={`px-6 py-2 rounded-[10px] text-sm font-bold border transition ${
                    isFollowing
                      ? "border-[#855225] bg-white text-[#855225] hover:bg-[#F5E4C8]"
                      : "border-[#d55c06] text-white bg-[#d55c06] hover:bg-[#f37b26]"
                  }`}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}

            </div>

            <div className="flex gap-4 text-[#262626] font-medium">
              <span><strong>{session?.user.followersCount??0}</strong> Followers</span>
              <span><strong>{session?.user.followingCount??0}</strong> Following</span>
              <span><strong>{session?.user.postCount??0}</strong> Posts</span>
            </div>

            <p className="text-[#262626]">
              {bio}
            </p>

          </div>
        </div>
      </section>

      {/* EDIT PROFILE MODAL */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-[#FFF7EA] rounded-[16px] shadow-xl px-6 py-5 w-full max-w-lg">
            <h2 className="text-lg font-bold text-[#262626] mb-3">
              Edit Profile
            </h2>
            <form
              onSubmit={handleSaveProfile}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-[#262626]">
                  Display name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="px-3 py-2 rounded-[8px] border border-[#C9A57A] bg-[#FFF8EC] text-sm text-[#855225] outline-none focus:ring-2 focus:ring-[#AA4B1B]"
                  placeholder="Enter your name"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-[#262626]">
                  Profile picture
                </label>
                <input
                  type="url"
                  value={editProfileImageUrl}
                  onChange={(e) => setEditProfileImageUrl(e.target.value)}
                  className="px-3 py-2 rounded-[8px] border border-[#C2743A] bg-[#FFE3C4] text-sm text-[#855225] outline-none focus:ring-2 focus:ring-[#AA4B1B]"
                  placeholder="Insert image/file here"
                />
                <span className="text-[11px] text-gray-700">
                  Use a direct image link for now. Upload support can be added later.
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-[#262626]">
                  Bio
                </label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="px-3 py-2 rounded-[8px] border border-[#C9A57A] bg-[#FFF8EC] text-sm text-[#855225] outline-none focus:ring-2 focus:ring-[#AA4B1B] resize-none h-24"
                  placeholder="Write a short bio about yourself"
                />
              </div>

              <div className="flex gap-2 justify-end mt-3">
                <button
                  type="button"
                  onClick={handleCancelEditProfile}
                  className="px-4 py-2 rounded-[10px] text-sm font-semibold text-[#855225] bg-transparent hover:bg-[#F5E4C8] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-[10px] text-sm font-semibold text-white bg-[#AA4B1B] hover:bg-[#8C3A13] transition"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/*  TABS SECTION  */}
      <section className="bg-[#FBF3DE] border-t border-[#855225]/20 px-[140px] py-4">
        <div className="flex gap-3">

          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-5 py-2 rounded-[10px] text-sm font-bold text-white border-2 border-black transition ${
              activeTab === "reviews"
                ? "bg-[#AA4B1B]"
                : "bg-[#D1B291]"
            }`}
          >
            Reviews
          </button>

          <button
            onClick={() => setActiveTab("media")}
            className={`px-5 py-2 rounded-[10px] text-sm font-bold text-white border-2 border-black transition ${
              activeTab === "media"
                ? "bg-[#AA4B1B]"
                : "bg-[#D1B291]"
            }`}
          >
            Media
          </button>

        </div>
      </section>

      {/*  CONTENT SECTION  */}
      <section className="flex-1 bg-[#FEF6EA] px-[140px] py-6 flex flex-col gap-4">


        {activeTab === "reviews" && (
        <div className="flex flex-col gap-6">
          <PostPreview 
            id="post-1"
            cafeName="Cat Cafe Manila"
            rating={5}
            username="CatLover67"
            price="₱₱"
            city="Manila"
            time="10:00 AM - 8:00 PM"
            content="I have been struggling to lock in these past few days. This place actually helped me think!"
            image="/cafe-imgs/hero.png"
          />
          <PostPreview 
            id="post-2"
            cafeName="Neko Coffee"
            rating={4}
            username="CatLover67"
            price="₱₱₱"
            city="Quezon City"
            time="9:00 AM - 10:00 PM"
            content="The cats were super friendly, but the espresso was a bit too bitter for my taste."
            image="/cafe-imgs/cafe2.png"
          />
        </div>
      )}

        {/*  MEDIA  */}
        {activeTab === "media" && (
          <div className="grid grid-cols-3 gap-4">

            <div className="h-[200px] bg-gray-300 rounded-lg"></div>
            <div className="h-[200px] bg-gray-300 rounded-lg"></div>
            <div className="h-[200px] bg-gray-300 rounded-lg"></div>
            <div className="h-[200px] bg-gray-300 rounded-lg"></div>
            <div className="h-[200px] bg-gray-300 rounded-lg"></div>
            <div className="h-[200px] bg-gray-300 rounded-lg"></div>

          </div>
        )}

      </section>

    </div>
  );
}

export default ProfilePage;