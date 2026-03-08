import { connectDB } from "@/lib/mongodb"; 
import Post from "@/models/Post";
import User from "@/models/User";
import CatCafe from "@/models/CatCafe";
import { NextRequest, NextResponse } from "next/server"; 
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { auth } from "@/auth";

//handles the POST request to create a new post
export async function POST(req: Request){
    try {
        
        const session = await auth(); 

        if (!session || !session.user){
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
            foodImage 
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

        return NextResponse.json({ message: "Post created successfully", post: newPost }, { status: 201 });

    }catch (error: any) {
        console.error("ACTUAL POST ERROR:", error);
        return NextResponse.json({ message:"Failed to create post!!!!" }, { status: 500 });
    }
}

//Experimental wait 
export async function GET (req: Request){
  try {
    await connectDB(); 

    const posts = await Post.find({})
    .populate("cafeID")
    .sort({ createdAt: -1})
    .lean(); 

    // 1. This converts the MongoDB ObjectIds into actual strings
    const safePosts = JSON.parse(JSON.stringify(posts));
    
    // 2. Return safePosts, NOT posts
    return NextResponse.json(safePosts, { status: 200 });

  } catch (error) {
    console.error("Error fetching posts: ", error); 
    return NextResponse.json({message: "Failed to fetch posts "}, { status: 500}); 
  }
}

