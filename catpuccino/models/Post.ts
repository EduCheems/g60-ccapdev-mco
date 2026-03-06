//imports the mongoose library
import mongoose, { Schema, model, models } from "mongoose";

//defines the schema for the Post model
const PostSchema = new Schema({
   userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    cafeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CatCafe',
        required: [true, 'Cafe ID is required'],
    },
    authorName:{
        type: String,
        required: [true, 'Author name is required'],
    },
    isAnonymous:{
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        required: [true, 'Post title is required'],
    },
    body: {
        type: String,
        required: [true, 'Post body is required'],
    },
    ratings:{
        sociability: {
            type: Number,
            min: 1,
            max: 5,
        },
        ambience:{
            type: Number,
            min: 1,
            max: 5, 
        },
        food:{
            type: Number,
            min: 1,
            max: 5,
        },
        catmosphere:{
            type: Number,
            min: 1,
            max: 5,
        },
        service:{
            type: Number,
            min: 1,
            max: 5,
        }
       
    },
    overallRating: {
        type: Number,
        min:1,
        max:5,
    },
    upvoteCount: {
        type: Number,
        default: 0,
    },
    downvoteCount: {
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    },
    isEdited:{
        type: Boolean,
        default: false,
    },
    isDeleted:{
        type: Boolean,
        default: false,
    }},
    {
    timestamps: true
    });

const Post = models.Post || model("Post", PostSchema);
export default Post;