import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import Interaction from "@/models/Interaction";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

// NOTE: RAH this is the API method in fetching data from mongoDB. Slower than the server action method.

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session || !session.user) {
            return NextResponse.json({message: "Unauthorized." }, { status: 401});
        }

        await connectDB();

        const { postID, imageUrl, content, isAnon, parentCommentID} = await req.json();

        if (!postID || !content) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400});
        }

        // Create new comment in database
        const newComment = await Comment.create({
            postID,
            userID: session.user.id,
            imageUrl,
            content,
            isAnon: isAnon || false,
            parentCommentID: parentCommentID || null,
            isOwnerResponse: false, // will add logic pa here
        });
        console.log("New comment created:", newComment);
        console.log("Successful!");

        return NextResponse.json(newComment, { status: 201});
    } catch (error: any) {
        console.error("COMMENT ERROR: ", error);
        return NextResponse.json({ message: "Failed to create comment " }, {status: 500});
    }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postID = searchParams.get("postID");
    const userId = searchParams.get("userId");
    const isOwnProfile = searchParams.get("isOwnProfile") === "true";

    await connectDB();
    const session = await auth();

    // 1. Resolve which ID to use (either the param or the logged-in user)
    let targetUserId = userId;
    if (isOwnProfile && session?.user?.id) {
      targetUserId = session.user.id as string;
    }

    // --- CASE A: Fetching for Profile (by targetUserId) ---
    if (targetUserId) {
      const currentUserId = session?.user?.id;

      const comments = await Comment.find({ 
        userID: targetUserId, 
        isDeleted: false, 
        parentCommentID: null 
      })
        .populate("userID", "name")
        .populate("postID", "title")
        .sort({ createdAt: -1 })
        .lean();

      const safeComments = JSON.parse(JSON.stringify(comments));
      const commentIds = safeComments.map((c: { _id: string }) => c._id);

      let replyCountMap: Record<string, number> = {};
      let userVoteMap: Record<string, "up" | "down" | null> = {};

      if (commentIds.length > 0) {
        const [replyCounts, interactions] = await Promise.all([
          Comment.aggregate([
            { $match: { parentCommentID: { $in: commentIds }, isDeleted: false } },
            { $group: { _id: "$parentCommentID", count: { $sum: 1 } } },
          ]),
          currentUserId
            ? Interaction.find({
                userID: currentUserId,
                targetID: { $in: commentIds },
                targetType: "Comment",
              }).lean()
            : [],
        ]);

        replyCounts.forEach((r: { _id: string; count: number }) => {
          replyCountMap[r._id.toString()] = r.count;
        });
        interactions.forEach((i: { targetID: { toString: () => string }; voteValue: number }) => {
          userVoteMap[i.targetID.toString()] =
            i.voteValue === 1 ? "up" : i.voteValue === -1 ? "down" : null;
        });
      }

      const result = safeComments.map((c: any) => ({
        _id: c._id,
        content: c.content,
        body: c.content,
        authorName: c.userID?.name ?? "Anonymous",
        createdAt: c.createdAt,
        timeAgo: formatTimeAgo(c.createdAt),
        postID: c.postID?._id ?? c.postID,
        postTitle: c.postID?.title ?? "Post",
        upvoteCount: c.upvoteCount ?? 0,
        downvoteCount: c.downvoteCount ?? 0,
        userVote: userVoteMap[c._id] ?? null,
        replyCount: replyCountMap[c._id] ?? 0,
      }));

      return NextResponse.json(result, { status: 200 });
    }

    // --- CASE B: Fetching for Specific Post ---
    if (!postID) {
      return NextResponse.json({ message: "postID or userId required" }, { status: 400 });
    }

    const postComments = await Comment.find({ postID, isDeleted: false })
      .populate("userID", "name profilePicURL")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(JSON.parse(JSON.stringify(postComments)), { status: 200 });

  } catch (error) {
    console.error("Error fetching comments: ", error);
    return NextResponse.json({ message: "Failed to fetch comments" }, { status: 500 });
  }
}


function formatTimeAgo(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString();
}