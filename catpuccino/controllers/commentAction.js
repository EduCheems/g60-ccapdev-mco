'use server'

import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { revalidatePath } from "next/cache";
import Interaction from "@/models/Interaction";

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


// New argument: UserId
export async function getCommentsForPost(postID, userId = null) {
    try {
        await connectDB();
        const comments = await Comment.find({ postID, isDeleted: false})
            .populate("userID", "name profilePicURL") 
            .sort({ createdAt: 1 })
            .lean();

        const safeComments = JSON.parse(JSON.stringify(comments));

        // -- Experimental wait (Map all of that particular user's interactions)
        const interactionMap = {}; 
        if (userId){
            //Find all interactions of the user for a specific comment
            const interactions = await Interaction.find({
                userID: userId,
                targetID: { $in: safeComments.map(c => c._id) },
                targetType: "Comment"
            }).lean();
            
            interactions.forEach(int => {
                interactionMap[int.targetID.toString()] = 
                    int.voteValue === 1 ? "up" : int.voteValue === -1 ? "down" : null;
            });
        }
        // -- 

        const commentMap = {};
        const roots = [];

        safeComments.forEach(comment => {
            comment.replies = []; // Initialize empty replies array
            
            comment.userVote = interactionMap[comment._id] || null; 
            
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

export async function deleteComment(commentId, postId) {
    try {
        await connectDB();

        const deletedComment = await Comment.findByIdAndUpdate(
            commentId,
            {
                isDeleted: true,
                imageUrl: null,
            },
            {new: true}
        );

        // refresh
        revalidatePath(`/view-post/${postId}`);
        return {success: true};
    } catch (error) {
        console.error("Comment Delete Error:", error);
        throw error;
    }
}

export async function editComment(commentId, updatedContent, postId) {
    try {
        await connectDB();

        const editedComment = await Comment.findByIdAndUpdate(
            commentId,
            {
                content: updatedContent
            },
            {new: true}
        )

        revalidatePath(`/view-post/${postId}`);
        return {
            success: true,
            comment: JSON.parse(JSON.stringify(editedComment))
        };
    } catch (error) {
        console.error("Comment Edit Error:", error);
        throw error;
    }
}