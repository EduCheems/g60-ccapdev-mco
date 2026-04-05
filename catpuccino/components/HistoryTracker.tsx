"use client";

import { useEffect } from "react";

export default function HistoryTracker({ cafeId, cafeName }: { cafeId: string, cafeName: string }) {
  useEffect(() => {
    const saved = localStorage.getItem("visited_cafes");
    let history = saved ? JSON.parse(saved) : [];

    const newEntry = {
      id: cafeId,
      name: cafeName,
      timestamp: Date.now(),
    };

    history = [newEntry, ...history.filter((item: any) => item.id !== cafeId)].slice(0, 5);

    localStorage.setItem("visited_cafes", JSON.stringify(history));
  }, [cafeId, cafeName]);

  return null; 
}