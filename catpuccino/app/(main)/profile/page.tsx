'use client'

import { useState } from "react";
import Comments from "@/components/CommentCard";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("reviews");
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-[#D5AE85] flex flex-col">

      {/*  HEADER SECTION  */}
      <section className="bg-[#fff2d1] w-full px-[140px] py-8">
        <div className="flex items-center gap-8">

          {/* Profile Picture */}
          <div className="w-[180px] h-[180px] bg-gray-300 rounded-full"></div>

          {/* Profile Info */}
          <div className="flex flex-col gap-3">

            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-poppins font-bold text-[#262626]">
                CarLover67
              </h1>

              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-2 rounded-[10px] text-sm font-bold transition ${
                  isFollowing
                    ? "bg-[#d55c06] text-white"
                    : "bg-[#d55c06] text-white"
                }`}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>

            </div>

            <p className="text-gray-600">@nickname</p>

            <div className="flex gap-4 text-[#262626] font-medium">
              <span><strong>67</strong> Followers</span>
              <span><strong>67</strong> Following</span>
              <span><strong>67</strong> Posts</span>
            </div>

            <p className="text-[#262626]">
              Your average cat and coffee enjoyer :D
            </p>

          </div>
        </div>
      </section>

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
            onClick={() => setActiveTab("recommendations")}
            className={`px-5 py-2 rounded-[10px] text-sm font-bold text-white border-2 border-black transition ${
              activeTab === "recommendations"
                ? "bg-[#AA4B1B]"
                : "bg-[#D1B291]"
            }`}
          >
            Recommendations
          </button>

          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-5 py-2 rounded-[10px] text-sm font-bold text-white border-2 border-black transition ${
              activeTab === "favorites"
                ? "bg-[#AA4B1B]"
                : "bg-[#D1B291]"
            }`}
          >
            Favorites
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

        {/*  REVIEWS  */}
        {activeTab === "reviews" && (
          <Comments
            reviews={[
              { username: "Customer #1", timeAgo: "10m ago", text: "Goated cafe in sight?!", likes: 67 },
            ]}
          />
        )}

        {/*  RECOMMENDATIONS  */}
        {activeTab === "recommendations" && (
          <Comments
            reviews={[
              { username: "Customer #2", timeAgo: "1h ago", text: "Highly recommend this cozy cat cafe!", likes: 67 },
            ]}
          />
        )}

        {/*  FAVORITES  */}
        {activeTab === "favorites" && (
          <div className="text-center text-[#855225] text-lg font-semibold py-12">
            No favorites yet 🐾
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