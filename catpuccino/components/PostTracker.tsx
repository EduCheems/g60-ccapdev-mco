"use client";

import { useEffect } from "react";

type PostTrackerProps = {
  id: string;
  title: string;
  authorName: string;
  authorId: string; 
  authorImage?: string;
  upvotes: number;
  comments: number;
};

export default function PostTracker({ id, title, authorName, authorId, upvotes, comments }: PostTrackerProps) {
  useEffect(() => {

    const saved = localStorage.getItem("recentPosts");
    let history = saved ? JSON.parse(saved) : [];

    const newEntry = {
      id,
      title,
      authorName,
      authorId,
      upvotes,
      comments,
      visitedAt: Date.now(),
    };

    history = [newEntry, ...history.filter((item: any) => item.id !== id)].slice(0, 5);

    localStorage.setItem("recentPosts", JSON.stringify(history));
  }, [id, title, authorName, upvotes, comments]);

  return null; 
}