'use server'

import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { revalidatePath } from "next/cache";

// server action method

export async function createComment(commentData) {
    try {
        await connectDB(); 

        const newComment = await Comment.create({
            postID: commentData.postID,
            userID: commentData.userID,
            imageUrl: commentData.imageUrl || null,
            content: commentData.content,
            isAnon: commentData.isAnon,
            parentCommentID: commentData.parentCommentID || null,
        });

        await newComment.populate("userID", "name profilePicURL");

        // reload DB immediately
        revalidatePath(`/view-post/${commentData.postID}`);

        return { 
            success: true, 
            message: "Comment posted!",
            comment: JSON.parse(JSON.stringify(newComment)) ,
            error: null,
        };
    } catch (error) {
        console.error("Comment Error:", error);
        throw error;
    }
}

export async function getCommentsForPost(postID) {
    try {
        await connectDB();
        const comments = await Comment.find({ postID, isDeleted: false})
            .populate("userID", "name profilePicURL") 
            .sort({ createdAt: 1 })
            .lean();

        const safeComments = JSON.parse(JSON.stringify(comments));

        const commentMap = {};
        const roots = [];

        safeComments.forEach(comment => {
            comment.replies = []; // Initialize empty replies array
            commentMap[comment._id] = comment;

            if (comment.parentCommentID === null) {
                roots.push(comment); // Top-level
            } else {
                // If it's a reply, find its parent and push it into the parent's replies array
                if (commentMap[comment.parentCommentID]) {
                    commentMap[comment.parentCommentID].replies.push(comment);
                }
            }
        });

        return roots.reverse();
    } catch (error) {
        console.error("Comment Error:", error);
        throw error;
    }
}