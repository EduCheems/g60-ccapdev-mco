import { connectDB } from "@/lib/mongodb"; 
import Post from "@/models/Post";
import User from "@/models/User";
import CatCafe from "@/models/CatCafe";
import { NextRequest, NextResponse } from "next/server"; 
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

//handles the POST request to create a new post
export async function POST(req: NextRequest){
    try {
        // Extract token from Authorization header
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            // If no token is provided, return an unauthorized response
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        //JWT_SECRETKEY is used to verify the token and extract the user ID of the post author
        const JWTSKEY = process.env.JWT_SECRETKEY;
        //Neccessary check to ensure that the JWT_SECRETKEY is defined in the environment variables before attempting to verify the token
        if (!JWTSKEY) {
            throw new Error("JWT_SECRETKEY is not defined in environment variables");
        }

        /*The token is verified using the JWT_SECRETKEY, and if the token is valid, the user ID of 
        the post author is extracted from the token's payload and stored in holder variable*/
        const holder: any = jwt.verify(token, JWTSKEY);

        //extracts the necessary data from the request body and connects to the database
        const { selectedCafe, isAnonymous, title, body, ratings } = await req.json();
        console.log("Extracted data from request body:", { selectedCafe, isAnonymous, title, body, ratings });
        
        await connectDB();
        
        //calculates the overall rating based on the individual ratings provided in the request body
        const overallRating= (Number(ratings.Sociability) + Number(ratings.Ambience) + Number(ratings.Food) + Number(ratings.Catmosphere) + Number(ratings.Service)) / 5;
        console.log("Calculated overall rating:", overallRating);
        //Finds the user by their userID and the cafe
        const userID = holder.userId;
        const user = await User.findById(userID);
        const cafe = await CatCafe.findOne({name: selectedCafe});
       
        
        if(!user){
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        if(!cafe){
            return NextResponse.json({ message: "Cafe not found" }, { status: 404 });
        }
        console.log(Number(ratings.Sociability), Number(ratings.Ambience), Number(ratings.Food), Number(ratings.Catmosphere), Number(ratings.Service));
        //creates a new post in the database
        const newPost = await Post.create({
            userID: new mongoose.Types.ObjectId(holder.userId),
            cafeID: cafe._id,
            authorName: user.username,
            isAnonymous,
            title,
            body,
            ratings:{
                sociability: Number(ratings.Sociability),
                ambience: Number(ratings.Ambience),
                food: Number(ratings.Food),
                catmosphere: Number(ratings.Catmosphere),
                service: Number(ratings.Service),   
            },
            overallRating: Number(overallRating),
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
        cafe.averages.catmosphere = ((cafe.averages.catmosphere * (cafe.totalReviews - 1)) + Number(ratings.Catmosphere)) / cafe.totalReviews;
        cafe.averages.service = ((cafe.averages.service * (cafe.totalReviews - 1)) + Number(ratings.Service)) / cafe.totalReviews;
       
        console.log("Updated cafe total reviews:", cafe.totalReviews, cafe.averages);
        console.log("Updated cafe averages:", cafe.averages);
        await cafe.save();
        
        return NextResponse.json({ message: "Post created successfully", post: newPost }, { status: 201 });

    }catch (error: any) {
        return NextResponse.json({ message:"Failed to create post!!!!" }, { status: 500 });
    }
}

