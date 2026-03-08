import mongoose, { Schema, model, models} from 'mongoose'; 

const UserSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID is required'],
    },
    name: {
        type: String, 
        required: [true, 'Username is required'], 
        unique: true,
    }, 
    email: {
        type: String, 
        required: [true, 'Email address is required'], 
        unique: true,
    }, 
    password: {
        type: String, 
        required: function() { return !this.oauthProvider; } 
    },
    role: {
        type: String, 
        enum: ["user", "owner", "admin"],
        default: "user",
    },
    profilePicURL: { 
        type: String, 
        default: "/default-avatar.png",
    },
    bio: { 
        type: String, 
        default: "Meow Meow Meow" 
    },
    isDeactivated: {
        type: Boolean,
        default: false,
    },
    followersCount: {
        type: Number,
        default: 0
    },
    followingCount: { 
        type: Number, 
        default: 0 
    },
    postsCount: { 
        type: Number, 
        default: 0 
    },
    }, {
    timestamps: true // Automatically handles createdAt and updatedAt
}); 

// Don't delete this one 
const User = models.User || model('User', UserSchema); 

export default User; 