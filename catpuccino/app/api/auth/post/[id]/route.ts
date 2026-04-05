import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { auth } from "@/auth";
import User from "@/models/User";
import CatCafe from "@/models/CatCafe";
import { NextResponse } from "next/server";

// 1. GET: Fetch post data to pre-fill the edit form
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const post = await Post.findById(id).lean();

    if (!post || post.isDeleted) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching post" }, { status: 500 });
  }
}

// 2. PUT: Update the existing post
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    
    const session = await auth();
    if (!session?.user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user = await User.findOne({ email: session.user.email }).lean();
    const post = await Post.findById(id);

    if (!post || post.isDeleted) return NextResponse.json({ message: "Post not found" }, { status: 404 });
    if (post.userID.toString() !== user._id.toString()) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const body = await req.json();

    post.title = body.title || post.title;
    post.body = body.body || post.body;
    post.ratings = body.ratings || post.ratings;
    post.catName = body.catName ?? post.catName;
    post.catImage = body.catImage ?? post.catImage;
    post.foodName = body.foodName ?? post.foodName;
    post.foodImage = body.foodImage ?? post.foodImage;
    post.isAnonymous = body.isAnonymous ?? post.isAnonymous;
    
    const vals = Object.values(post.ratings) as number[];
    post.overallRating = vals.reduce((a, b) => a + b, 0) / vals.length;
    
    post.isEdited = true;

    await post.save();
    return NextResponse.json({ message: "Post updated successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();
    
    const session = await auth();
    if (!session?.user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user = await User.findOne({ email: session.user.email }).lean();
    const post = await Post.findById(id);

    if (!post) return NextResponse.json({ message: "Post not found" }, { status: 404 });
    if (post.userID.toString() !== user._id.toString()) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    post.isDeleted = true;
    await post.save();

    await User.findByIdAndUpdate(user._id, { $inc: { postsCount: -1 } });
    
    if (post.cafeID) {
      await CatCafe.findByIdAndUpdate(post.cafeID, { $inc: { totalReviews: -1 } });
    }

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}