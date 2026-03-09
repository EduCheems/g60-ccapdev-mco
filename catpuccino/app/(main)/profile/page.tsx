'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PostPreview from "@/components/profile/PostPreview";
import EditProfile from "@/components/EditProfile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState("reviews");
  const [displayName, setDisplayName] = useState<string>("Random User");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>("/default-profile.svg");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState<string>(displayName);
  const [editProfileImageUrl, setEditProfileImageUrl] = useState<string>("");
  const [bio, setBio] = useState<string>("add bio here");
  const [editBio, setEditBio] = useState<string>(bio);

  const [topCafe1, setTopCafe1] = useState<string>("---");
  const [topCafe2, setTopCafe2] = useState<string>("---");
  const [topCafe3, setTopCafe3] = useState<string>("---");
  const [editTopCafe1, setEditTopCafe1] = useState<string>(topCafe1);
  const [editTopCafe2, setEditTopCafe2] = useState<string>(topCafe2);
  const [editTopCafe3, setEditTopCafe3] = useState<string>(topCafe3);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);

  const viewedUserId = searchParams.get("userId");
  const loggedInUserId = (session?.user as any)?.id as string | undefined;
  const profileUserId = viewedUserId || loggedInUserId;

  const isLoggedIn = !!session;
  const isOwnProfile = !viewedUserId || viewedUserId === loggedInUserId;
  const isOwner =
    typeof session?.user?.email === "string" &&
    session.user.email.toLowerCase().includes("owner");

  useEffect(() => {
    if (!isLoggedIn || !profileUserId) return;

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
          if (data.username) setDisplayName(data.username);
          if (data.bio) setBio(data.bio);
          if (data.profilePic) setProfileImageUrl(data.profilePic);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, [isLoggedIn, profileUserId, viewedUserId]);

  useEffect(() => {
    if (!isLoggedIn || !viewedUserId || viewedUserId === loggedInUserId) return;

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
  }, [isLoggedIn, viewedUserId, loggedInUserId]);

  const handleProfileImageFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditProfileImageUrl(reader.result as string);
    };
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

  const handleCancelEditProfile = () => {
    setIsEditingProfile(false);
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

    const cafeHolder=[editTopCafe1.trim() || topCafe1,
      editTopCafe2.trim() || topCafe2,editTopCafe3.trim() || topCafe3
    ].filter(Boolean);
    console.log(cafeHolder);
    try{
      const res= await fetch("api/auth/profile",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        name: editName.trim() || displayName,
        bio: editBio.trim() || bio,
        profilePic: editProfileImageUrl.trim() || profileImageUrl,
        favCafe:cafeHolder,
      }),
      });
      if(!res){
        console.error("Failed to update");
      }
    } catch (err) {
      console.error("Failed to toggle follow:", err);
    }
  };


  useEffect(()=>{
    setDisplayName(session?.user?.name||displayName)
    setBio(session?.user?.bio ||bio)
    setProfileImageUrl(session?.user.profilePicURL||profileImageUrl);
    setTopCafe1(session?.user?.favCafe?.[0]||topCafe1);
    setTopCafe2(session?.user?.favCafe?.[1]||topCafe2);
    setTopCafe3(session?.user?.favCafe?.[2]||topCafe3);
  },[session]);

  
  
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
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-poppins font-bold text-[#262626]">
                  {displayName}
                </h1>
                {isOwner && (
                  <img
                    src="/ownertag.svg"
                    alt="Cafe owner badge"
                    className="h-25 w-auto"
                  />
                )}
              </div>

              <div className="flex gap-4 text-[#262626] font-medium">
                <span><strong>{followersCount}</strong> Followers</span>
                <span><strong>{followingCount}</strong> Following</span>
                <span><strong>{postsCount}</strong> Posts</span>
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

          {/* Right side: action button (Create Cafe / Edit / Follow) */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {isLoggedIn && isOwnProfile && isOwner && (
              <Link
                href="/create-cafe"
                className="px-8 py-2 rounded-full text-sm font-bold border border-[#d55c06] text-white bg-[#d55c06] hover:bg-[#f37b26] transition"
              >
                Create Cafe
              </Link>
            )}
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
        onCancel={handleCancelEditProfile}
        onSave={handleSaveProfile}
      />

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
            onClick={() => setActiveTab("comments")}
            className={`px-5 py-2 rounded-[10px] text-sm font-bold text-white border-2 border-black transition ${
              activeTab === "comments"
                ? "bg-[#AA4B1B]"
                : "bg-[#D1B291]"
            }`}
          >
            Comments
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

        {/*  COMMENTS  */}
        {activeTab === "comments" && (
          <div className="flex flex-col gap-6">
          <PostPreview 
            id="post-3"
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
            id="post-4"
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

      </section>

    </div>
  );
}

export default ProfilePage;