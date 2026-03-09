import { connectDB } from "@/lib/mongodb";
import Interaction from "@/models/Interaction";
import Post from "@/models/Post";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { auth } from "@/auth"; 

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const body = await req.json();
        console.log("DEBUG: Received Payload:", body);
        const { targetID, targetType, newVoteValue } = body;

        const user = await User.findOne({ email: session.user.email });
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
        
        const userID = user._id;

        const existingInteraction = await Interaction.findOne({ userID, targetID, targetType });
        const oldVoteValue = existingInteraction ? existingInteraction.voteValue : 0;

        let upvoteChange = 0;
        let downvoteChange = 0;

        if (oldVoteValue === 1) upvoteChange -= 1;
        if (oldVoteValue === -1) downvoteChange -= 1;

        if (newVoteValue === 1) upvoteChange += 1;
        if (newVoteValue === -1) downvoteChange += 1;

        if (existingInteraction) {
            existingInteraction.voteValue = newVoteValue;
            await existingInteraction.save();
        } else {

            await Interaction.create({ userID, targetID, targetType, voteValue: newVoteValue });
        }

        if (targetType === "Post") {
            const updatedPost = await Post.findByIdAndUpdate(
                targetID, 
                { $inc: { upvoteCount: upvoteChange, downvoteCount: downvoteChange } },
                { new: true } 
            );
            
            if (updatedPost) {
                console.log(`DB UPDATED: Upvotes: ${updatedPost.upvoteCount} | Downvotes: ${updatedPost.downvoteCount}`);
            } else {
                // To not accept mock IDs
                console.warn(`Vote accepted but target document ${targetID} not found in DB.`);
                return NextResponse.json({ 
                    success: false, 
                    message: "Target not found in database. Voting only works on real posts!" 
                }, { status: 404 });
            }
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("Voting API Error:", error);
        return NextResponse.json({ message: "Failed to record vote" }, { status: 500 });
    }
}