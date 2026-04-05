import { connectDB } from "@/lib/mongodb"; 
import mongoose from "mongoose";
import Post from "@/models/Post";
import User from "@/models/User";
import Interaction from "@/models/Interaction";
import CatCafe from "@/models/CatCafe";
import Comment from "@/models/Comment";
import { NextRequest, NextResponse } from "next/server"; 
import { auth } from "@/auth";

//handles the POST request to create a new post
export async function POST(req: Request){
    try {
        
        const session = await auth(); 

        if (!session || !session.user || !session.user.email){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); 
        }

        const userEmail = session.user.email; 
        const { 
            selectedCafe, 
            isAnonymous, 
            title, 
            body, 
            ratings,
            catName, 
            catImage, 
            foodName, 
            foodImage, 
        } = await req.json(); 

        await connectDB(); 

        //experimental wait 
        const dbRatings = {
            sociability: Number(ratings.Sociability || 0),
            ambience: Number(ratings.Ambience || 0),
            food: Number(ratings.Food || 0),
            catmosphere: Number(ratings.Catmosphere || 0),
            service: Number(ratings.Service || 0)
        }

        const overallRating = (
            dbRatings.sociability + 
            dbRatings.ambience + 
            dbRatings.food + 
            dbRatings.catmosphere + 
            dbRatings.service
        ) / 5; 

        const user = await User.findOne({ email: userEmail }); 
        const cafe = await CatCafe.findOne({name: selectedCafe }); 

        if(!user){
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        if(!cafe){
            return NextResponse.json({ message: "Cafe not found" }, { status: 404 });
        }
        
        //creates a new post in the database
        const newPost = await Post.create({

            userID: user._id,
            cafeID: cafe._id,
            authorName: user.username || user.name || userEmail.split('@')[0] || "Anonymous",
            isAnonymous,
            title,
            body,
            ratings: dbRatings,
            overallRating,
            //Experimental wait
            catName, 
            catImage,
            foodName, 
            foodImage, 
        });
        console.log("New post created:", newPost);
        console.log("Successful!");
        
        //updates the total reviews and averages based on the new post's ratings
        console.log(cafe.name);

        cafe.totalReviews += 1;
        console.log("Updated cafe total reviews:", cafe.totalReviews);

        cafe.averages.sociability = ((cafe.averages.sociability * (cafe.totalReviews - 1)) + Number(ratings.Sociability)) / cafe.totalReviews;
        cafe.averages.ambience = ((cafe.averages.ambience * (cafe.totalReviews - 1)) + Number(ratings.Ambience)) / cafe.totalReviews;
        cafe.averages.food = ((cafe.averages.food * (cafe.totalReviews - 1)) + Number(ratings.Food)) / cafe.totalReviews;
        cafe.averages.work_friendly = ((cafe.averages.work_friendly * (cafe.totalReviews - 1)) + Number(ratings.Catmosphere)) / cafe.totalReviews;
        cafe.averages.service = ((cafe.averages.service * (cafe.totalReviews - 1)) + Number(ratings.Service)) / cafe.totalReviews;
       
        console.log("Updated cafe total reviews:", cafe.totalReviews, cafe.averages);
        console.log("Updated cafe averages:", cafe.averages);
        await cafe.save();

        await User.findByIdAndUpdate(user._id, { $inc: { postsCount: 1 } });

         if (catName) {
            await CatCafe.updateOne(
                { name: selectedCafe, "cats.name": catName},
                { $inc: { "cats.$.upVotes": 1 } }
            );
             if (foodName) {
            await CatCafe.updateOne(
                { name: selectedCafe, "menu.itemName": foodName },
                { $inc: { "menu.$.upVotes": 1 } }
            );
        }

        }

        return NextResponse.json({ message: "Post created successfully", post: newPost }, { status: 201 });

    }catch (error: any) {
        console.error("ACTUAL POST ERROR:", error);
        return NextResponse.json({ message:"Failed to create post!!!!" }, { status: 500 });
    }
}

// GET: all posts or posts by userId (for profile Reviews tab)
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const isOwnProfile = searchParams.get("isOwnProfile") === "true";

    const session = await auth();
    let currentUserId = null;

    if (session?.user?.email) {
      const user = await User.findOne({ email: session.user.email }).lean();
      if (user) currentUserId = user._id;
    }

    const filter: any = { isDeleted: false }; 

    // Determine target ID
    const targetIdString = isOwnProfile ? currentUserId?.toString() : userId;

    if (targetIdString) {
      // Validate the ID before converting to prevent crashing on invalid strings
      if (mongoose.Types.ObjectId.isValid(targetIdString)) {
        filter.userID = new mongoose.Types.ObjectId(targetIdString);
      } else {
        return NextResponse.json([], { status: 200 }); // Return empty if ID is invalid
      }
    } else if (isOwnProfile) {
       return NextResponse.json([], { status: 200 }); 
    }

    const posts = await Post.find(filter)
      .populate("cafeID")
      .populate("userID", "image")
      .sort({ createdAt: -1 })
      .lean();

    const safePosts = JSON.parse(JSON.stringify(posts));
    const postIds = safePosts.map((p: any) => new mongoose.Types.ObjectId(p._id));

    if (postIds.length === 0) return NextResponse.json([], { status: 200 });

    // Ensure the aggregation uses the correct types
    const [commentCounts, interactions] = await Promise.all([
      Comment.aggregate([
        { $match: { postID: { $in: postIds }, isDeleted: false } },
        { $group: { _id: "$postID", count: { $sum: 1 } } },
      ]),
      currentUserId ? Interaction.find({
        userID: currentUserId,
        targetID: { $in: postIds },
        targetType: "Post",
      }).lean() : [],
    ]);

    const commentCountMap: Record<string, number> = {};
    commentCounts.forEach((c: { _id: string; count: number }) => {
      commentCountMap[c._id.toString()] = c.count;
    });
    const interactionMap: Record<string, "up" | "down" | null> = {};
    interactions.forEach((int: { targetID: { toString: () => string }; voteValue: number }) => {
      interactionMap[int.targetID.toString()] =
        int.voteValue === 1 ? "up" : int.voteValue === -1 ? "down" : null;
    });

    safePosts.forEach((post: any) => {
      post.userVote = interactionMap[post._id] ?? null;
      post.commentCount = commentCountMap[post._id] ?? 0;
      post.authorImage = post.isAnonymous ? null : (post.userID?.image || null); 
    });

    return NextResponse.json(safePosts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 });
  }
}

