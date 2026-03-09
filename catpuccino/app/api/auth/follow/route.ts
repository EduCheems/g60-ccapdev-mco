import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Follow from "@/models/Follow";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { targetUserId, action } = await req.json();

    if (!targetUserId) {
      return NextResponse.json(
        { error: "targetUserId is required" },
        { status: 400 }
      );
    }

    const followerId = new mongoose.Types.ObjectId(session.user.id as string);
    const followingId = new mongoose.Types.ObjectId(targetUserId);

    if (followerId.equals(followingId)) {
      return NextResponse.json(
        { error: "Cannot follow yourself" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingFollow = await Follow.findOne({
      followerId,
      followingId,
    });

    if (action === "follow") {
      if (existingFollow) {
        return NextResponse.json(
          { message: "Already following", isFollowing: true },
          { status: 200 }
        );
      }

      await Follow.create({ followerId, followingId });
      await User.findByIdAndUpdate(followingId, { $inc: { followersCount: 1 } });
      await User.findByIdAndUpdate(followerId, { $inc: { followingCount: 1 } });

      return NextResponse.json(
        { message: "Followed successfully", isFollowing: true },
        { status: 200 }
      );
    }

    if (action === "unfollow") {
      if (!existingFollow) {
        return NextResponse.json(
          { message: "Not following", isFollowing: false },
          { status: 200 }
        );
      }

      await Follow.deleteOne({ followerId, followingId });
      await User.findByIdAndUpdate(followingId, {
        $inc: { followersCount: -1 },
      });
      await User.findByIdAndUpdate(followerId, {
        $inc: { followingCount: -1 },
      });

      return NextResponse.json(
        { message: "Unfollowed successfully", isFollowing: false },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Invalid action. Use 'follow' or 'unfollow'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Follow error:", error);
    return NextResponse.json(
      { error: "Failed to update follow status" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const targetUserId = searchParams.get("userId");

    if (!targetUserId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingFollow = await Follow.findOne({
      followerId: new mongoose.Types.ObjectId(session.user.id as string),
      followingId: new mongoose.Types.ObjectId(targetUserId),
    });

    return NextResponse.json({
      isFollowing: !!existingFollow,
    });
  } catch (error) {
    console.error("Check follow error:", error);
    return NextResponse.json(
      { error: "Failed to check follow status" },
      { status: 500 }
    );
  }
}
