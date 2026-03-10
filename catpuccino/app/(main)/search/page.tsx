"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CafeCard from "@/components/CafeCard";
import PostPreview from "@/components/profile/PostPreview";
import type { Cafe } from "@/app/data/cafes";

type PostData = {
  _id: string;
  title: string;
  cafeID?: {
    name?: string;
    priceRange?: string;
    location?: string;
    operatingHours?: string;
  } | null;
  overallRating?: number;
  authorName: string;
  body: string;
  createdAt: string;
  upvoteCount?: number;
  downvoteCount?: number;
  userVote?: "up" | "down" | null;
  commentCount?: number;
  catImage?: string;
};

type SortOption = "relevance" | "recent" | "popular";

function computeTextScore(text: string, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return 0;

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);
  const haystack = text.toLowerCase();

  return terms.reduce((score, term) => (haystack.includes(term) ? score + 1 : score), 0);
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [cafesRes, postsRes] = await Promise.all([
          fetch("/api/cafe-home", { cache: "no-store" }),
          fetch("/api/auth/post", { cache: "no-store" }),
        ]);

        if (cafesRes.ok) {
          const rawCafes = await cafesRes.json();
          const mappedCafes: Cafe[] = rawCafes.map((cafe: any) => ({
            _id: cafe._id?.toString() ?? "",
            ownerID: cafe.ownerID?.toString() ?? "",
            name: cafe.name ?? "Unknown Cafe",
            description: cafe.description ?? "",
            location: cafe.location ?? "Unknown City",
            operatingHours: cafe.operatingHours ?? "N/A",
            priceRange: cafe.priceRange ?? "₱0",
            averages: cafe.averages ?? {
              sociability: 0,
              ambience: 0,
              food: 0,
              work_friendly: 0,
              service: 0,
            },
            totalReviews: cafe.totalReviews ?? 0,
            cats: cafe.cats ?? [],
            menu: cafe.menu ?? [],
          }));

          setCafes(mappedCafes);
        }

        if (postsRes.ok) {
          const postData = await postsRes.json();
          setPosts(postData);
        }
      } catch (error) {
        console.error("Failed to fetch search data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCafes = useMemo(() => {
    const withScore = cafes.map((cafe) => ({
      cafe,
      score:
        computeTextScore(cafe.name, query) +
        computeTextScore(cafe.description, query) +
        computeTextScore(cafe.location, query),
    }));

    const relevant = query
      ? withScore.filter((item) => item.score > 0)
      : withScore;

    return relevant
      .slice()
      .sort((a, b) => {
        if (sortBy === "relevance") {
          return b.score - a.score;
        }

        const ratingA = a.cafe.averages
          ? (Object.values(a.cafe.averages) as number[]).reduce((sum, v) => sum + v, 0) / 5
          : 0;
        const ratingB = b.cafe.averages
          ? (Object.values(b.cafe.averages) as number[]).reduce((sum, v) => sum + v, 0) / 5
          : 0;

        return ratingB - ratingA;
      })
      .map((item) => item.cafe);
  }, [cafes, query, sortBy]);

  const filteredPosts = useMemo(() => {
    const withScore = posts.map((post) => {
      const baseText = [
        post.title,
        post.body,
        post.cafeID?.name ?? "",
        post.cafeID?.location ?? "",
      ].join(" ");

      const score = computeTextScore(baseText, query);
      return { post, score };
    });

    let relevant = query
      ? withScore.filter((item) => item.score > 0)
      : withScore;

    return relevant
      .slice()
      .sort((a, b) => {
        if (sortBy === "relevance") {
          return b.score - a.score;
        }

        if (sortBy === "recent") {
          const timeA = new Date(a.post.createdAt).getTime();
          const timeB = new Date(b.post.createdAt).getTime();
          if (timeB !== timeA) return timeB - timeA;
        }

        if (sortBy === "popular") {
          const ratingA = a.post.overallRating ?? 0;
          const ratingB = b.post.overallRating ?? 0;
          if (ratingB !== ratingA) return ratingB - ratingA;

          const votesA = (a.post.upvoteCount ?? 0) - (a.post.downvoteCount ?? 0);
          const votesB = (b.post.upvoteCount ?? 0) - (b.post.downvoteCount ?? 0);
          return votesB - votesA;
        }

        return 0;
      })
      .map((item) => item.post);
  }, [posts, query, sortBy]);

  const queryLabel = query ? `"${query}"` : "all cafes and discussions";

  const sortLabel =
    sortBy === "relevance"
      ? "Relevant"
      : sortBy === "recent"
      ? "Recent"
      : "Popular";

  return (
    <div className="min-h-screen w-full bg-[#FBF3DE]">
      <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-12 font-montserrat flex flex-col gap-8 items-start">
        <div className="w-full flex flex-col gap-8">
          <div className="flex justify-between items-center mb-2 px-2">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-black">
                {sortLabel} Search
              </h1>
              <p className="text-sm text-black/70 font-medium mt-1">
                Showing results for {queryLabel}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-black">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-[#FEF6EA] text-black border-[1.5px] border-black rounded-lg px-4 py-2 text-sm md:text-base font-bold cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,0.15)] outline-none hover:translate-y-px hover:shadow-[1px_1px_0_0_rgba(0,0,0,0.15)] transition-all"
              >
                <option value="relevance">Relevance</option>
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          <section className="flex flex-col gap-4">
            <h2 className="text-base md:text-lg font-extrabold tracking-[0.25em] uppercase text-black/80">
              Cafes
            </h2>

            {isLoading ? (
              <p className="text-black/50 font-bold italic py-6 text-center">
                Loading results...
              </p>
            ) : filteredCafes.length > 0 ? (
              <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
                {filteredCafes.map((cafe, index) => {
                  const displayRating = cafe.averages
                    ? (Object.values(cafe.averages) as number[]).reduce(
                        (sum, v) => sum + v,
                        0
                      ) / 5
                    : 0;

                  return (
                    <div key={cafe._id} className="shrink-0 snap-center">
                      <CafeCard
                        id={cafe._id}
                        index={index}
                        name={cafe.name}
                        cardColor="bg-[#87AE73]"
                        badgeText={`${sortLabel}`}
                        badgeColor="bg-[#87AE73]"
                        cafe={cafe}
                        ratings={Math.round(displayRating * 10) / 10}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-black/50 font-bold py-6 text-center">
                No cafes matched this search.
              </p>
            )}
          </section>

          <section className="mt-8 border-t border-[#855225]/30 pt-6">
            <h2 className="text-lg font-black text-black mb-4 flex items-center justify-between">
              <span>Related Discussions</span>
            </h2>

            {isLoading ? (
              <p className="text-black/50 font-bold italic py-6 text-center">
                Loading discussions...
              </p>
            ) : filteredPosts.length > 0 ? (
              <div className="flex flex-col gap-6">
                {filteredPosts.map((post) => {
                  const netScore =
                    (post.upvoteCount ?? 0) - (post.downvoteCount ?? 0);

                  return (
                    <PostPreview
                      key={post._id}
                      id={post._id}
                      title={post.title}
                      cafeName={post.cafeID?.name || "Unknown Cafe"}
                      rating={post.overallRating ?? 0}
                      username={post.authorName}
                      price={post.cafeID?.priceRange || "₱ 0"}
                      city={post.cafeID?.location || "Metro Manila"}
                      time={post.cafeID?.operatingHours || "N/A"}
                      content={post.body}
                      image={post.catImage}
                      initialVotes={netScore}
                      initialUserVote={post.userVote}
                      commentCount={post.commentCount ?? 0}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-black/50 font-bold py-6 text-center">
                No discussions matched this search.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}