import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { NextResponse} from "next/server";
import { auth } from "@/auth"

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

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const postID = searchParams.get("postID");

        await connectDB();

        // only get comments from specific post
        const comments = await Comment.find({postID, isDeleted: false})
            .populate("userID", "username profile.profilePicURL")
            .sort({ createdAt: -1 })
            .lean();

        const safeComments = JSON.parse(JSON.stringify(comments));
        return NextResponse.json(safeComments, { status: 200});

    } catch (error) {
        console.error("Error fetching comments: ", error);
        return NextResponse.json({message: "Failed to fetch comments "}, { status: 500});
    }
}