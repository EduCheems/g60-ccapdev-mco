'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Comments from "@/components/CommentCard";
import Link from "next/link";
import PostPreview from "@/components/profile/PostPreview";

const ProfilePage = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState("reviews");
  const [displayName, setDisplayName] = useState<string>("CarLover67");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>("/default-profile.svg");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState<string>(displayName);
  const [editProfileImageUrl, setEditProfileImageUrl] = useState<string>("");
  const [bio, setBio] = useState<string>("add bio here");
  const [editBio, setEditBio] = useState<string>(bio);

  const [topCafe1, setTopCafe1] = useState<string>("Mew Mew Cafe");
  const [topCafe2, setTopCafe2] = useState<string>("Mew Brew Spot");
  const [topCafe3, setTopCafe3] = useState<string>("Cat Corner");
  const [editTopCafe1, setEditTopCafe1] = useState<string>(topCafe1);
  const [editTopCafe2, setEditTopCafe2] = useState<string>(topCafe2);
  const [editTopCafe3, setEditTopCafe3] = useState<string>(topCafe3);

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
    setEditTopCafe1(topCafe1);
    setEditTopCafe2(topCafe2);
    setEditTopCafe3(topCafe3);
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
    setTopCafe1(editTopCafe1.trim() || topCafe1);
    setTopCafe2(editTopCafe2.trim() || topCafe2);
    setTopCafe3(editTopCafe3.trim() || topCafe3);
    setIsEditingProfile(false);
  };

  return (
    <div className="min-h-screen bg-[#D5AE85] flex flex-col">

      {/*  HEADER SECTION  */}
      <section className="bg-[#fff2d1] w-full px-[140px] py-8">
        <div className="flex items-start justify-between gap-8">

          {/* Left side: avatar + profile info */}
          <div className="flex items-center gap-8">
            {/* Profile Picture */}
            <div className="w-[180px] h-[180px] rounded-full border-4 border-[#733903] overflow-hidden bg-gray-300">
              <img
                src={profileImageUrl || "/default-profile.svg"}
                alt="Profile picture"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-poppins font-bold text-[#262626]">
                {displayName}
              </h1>

              <div className="flex gap-4 text-[#262626] font-medium">
                <span><strong>67</strong> Followers</span>
                <span><strong>67</strong> Following</span>
                <span><strong>67</strong> Posts</span>
              </div>

              <p className="text-[#262626]">
                {bio}
              </p>

              {/* Top 3 recommended cafes */}
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0C35B] text-[#3A240D] text-sm font-semibold shadow-[0_3px_0_rgba(0,0,0,0.25)] border border-black/20"
                >
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#DFA52B] text-xs font-bold border border-black/20">
                    1
                  </span>
                  <span>{topCafe1}</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E2E2E6] text-[#262626] text-sm font-semibold shadow-[0_3px_0_rgba(0,0,0,0.15)] border border-black/10"
                >
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#C0C0C5] text-xs font-bold border border-black/10">
                    2
                  </span>
                  <span>{topCafe2}</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#B57335] text-[#FBF3DE] text-sm font-semibold shadow-[0_3px_0_rgba(0,0,0,0.35)] border border-black/20"
                >
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#8E531B] text-xs font-bold border border-black/20">
                    3
                  </span>
                  <span>{topCafe3}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right side: action button (Edit / Follow) */}
          <div className="mt-2">
            {isLoggedIn && isOwnProfile && (
              <button
                onClick={handleOpenEditProfile}
                className="px-8 py-2 rounded-full text-sm font-bold border border-[#d55c06] text-white bg-[#d55c06] hover:bg-[#f37b26] transition"
              >
                Edit Profile
              </button>
            )}

            {isLoggedIn && !isOwnProfile && (
              <button
                type="button"
                onClick={handleToggleFollow}
                className={`px-8 py-2 rounded-full text-sm font-bold border transition ${
                  isFollowing
                    ? "border-[#855225] bg-white text-[#855225] hover:bg-[#F5E4C8]"
                    : "border-[#d55c06] text-white bg-[#d55c06] hover:bg-[#f37b26]"
                }`}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
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

              {/* Top 3 recommended cafes (editable) */}
              <div className="flex flex-col gap-2 mt-1">
                <label className="text-sm font-semibold text-[#262626]">
                  Top 3 recommended cafes
                </label>

                <input
                  type="text"
                  value={editTopCafe1}
                  onChange={(e) => setEditTopCafe1(e.target.value)}
                  className="px-3 py-2 rounded-[8px] border border-[#C9A57A] bg-[#FFF8EC] text-sm text-[#855225] outline-none focus:ring-2 focus:ring-[#AA4B1B]"
                  placeholder="Cafe #1"
                />

                <input
                  type="text"
                  value={editTopCafe2}
                  onChange={(e) => setEditTopCafe2(e.target.value)}
                  className="px-3 py-2 rounded-[8px] border border-[#C9A57A] bg-[#FFF8EC] text-sm text-[#855225] outline-none focus:ring-2 focus:ring-[#AA4B1B]"
                  placeholder="Cafe #2"
                />

                <input
                  type="text"
                  value={editTopCafe3}
                  onChange={(e) => setEditTopCafe3(e.target.value)}
                  className="px-3 py-2 rounded-[8px] border border-[#C9A57A] bg-[#FFF8EC] text-sm text-[#855225] outline-none focus:ring-2 focus:ring-[#AA4B1B]"
                  placeholder="Cafe #3"
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