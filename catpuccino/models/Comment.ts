 import mongoose, { Schema, model, models } from "mongoose";

 const CommentSchema = new Schema({
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, "Post ID is required"],
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"],
    },
    parentCommentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null,
    },
    imageUrl: {
        type: String, 
        default: null, 
    }, 
    content: {
        type: String,
        required: [true, "Comment content cannot be empty"],
        trim: true,
    },
    isAnon: {
        type: Boolean,
        default: false,
    },
    isOwnerResponse: {
        type: Boolean,
        default: false,
    },
    upvoteCount: {
        type: Number,
        default: 0,
    },
    downvoteCount: {
        type: Number,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
    }, {
        timestamps: true
    }
);

 const Comment = models.Comment || model("Comment", CommentSchema); 
 
 export default Comment;