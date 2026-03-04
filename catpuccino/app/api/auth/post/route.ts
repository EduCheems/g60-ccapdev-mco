import { connectDB } from "@/lib/mongodb"; 
import Post from "@/models/Post";
import User from "@/models/User";
import CatCafe from "@/models/CatCafe";
import { NextResponse } from "next/server"; 

//handles the POST request to create a new post
export async function POST(req: Request){
    try {
        // Extract token from Authorization header
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            // If no token is provided, return an unauthorized response
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        //extracts the necessary data from the request body and connects to the database
        const { userID, selectedCafe, isAnonymous, title, body, ratings } = await req.json();
        await connectDB();

        //calculates the overall rating based on the individual ratings provided in the request body
        const overallRating= (ratings.sociability + ratings.ambience + ratings.food + ratings.work_friendly + ratings.service) / 5;

        //Finds the user by their userID and the cafe by uts 
        const user = await User.findById(userID);
        const cafe = await CatCafe.findOne({name: selectedCafe});
        if(!user&&!cafe){
            return NextResponse.json({ message: "User or Cafe not found" }, { status: 404 });
        }
        //creates a new post in the database
        const newPost = await Post.create({
            userID,
            cafeID: cafe._id,
            authorName: user.name,
            isAnonymous,
            title,
            body,
            ratings,
            overallRating,
        });
        //updates the total reviews and averages based on the new post's ratings
        cafe.totalReviews += 1;
        cafe.averages.sociability = ((cafe.averages.sociability * (cafe.totalReviews - 1)) + ratings.sociability) / cafe.totalReviews;
        cafe.averages.ambience = ((cafe.averages.ambience * (cafe.totalReviews - 1)) + ratings.ambience) / cafe.totalReviews;
        cafe.averages.food = ((cafe.averages.food * (cafe.totalReviews - 1)) + ratings.food) / cafe.totalReviews;
        cafe.averages.work_friendly = ((cafe.averages.work_friendly * (cafe.totalReviews - 1)) + ratings.work_friendly) / cafe.totalReviews;
        cafe.averages.service = ((cafe.averages.service * (cafe.totalReviews - 1)) + ratings.service) / cafe.totalReviews;
        await cafe.save();
        alert("Post created successfully");
        return NextResponse.json({ message: "Post created successfully", post: newPost }, { status: 201 });

    }catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}