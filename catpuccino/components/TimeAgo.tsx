import React from "react";

export default function TimeAgo({ date }: { date: string | Date }) {
  const parsedDate = new Date(date);
  const seconds = Math.floor((Date.now() - parsedDate.getTime()) / 1000);

  const getFormattedTime = () => {
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(Math.max(seconds, 0)) + "s ago"; 
  };

  return <span suppressHydrationWarning>{getFormattedTime()}</span>;
}