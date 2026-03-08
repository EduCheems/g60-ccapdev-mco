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
        //required: [true, 'Password is required'],
    },
    oauthProvider: {
    type: String, // 'google', 'facebook', etc.
    default: null,
    }, 
    role: {
        type: [String], 
        enum: ["user", "owner", "admin"],
        default: ["user"],
    },
    profile: {
        firstName: { 
            type: String, 
            required: true 
        },
        lastName: { 
            type: String, 
            required: true 
        },
        profilePicURL: { 
            type: String, 
            default: null 
        },
        coverPicURL: { 
            type: String, 
            default: null 
        },
        bio: { 
            type: String, 
            default: "" 
        },
        shortDescription: { 
            type: String, 
            default: ""
        },
    },
    isDeactivated: {
        type: Boolean,
        default: false,
    },
    rememberToken: { 
        type: String 
    },
    tokenExpiration: { 
        type: Date 
    },
    favoriteCatCafeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CatCafe',
        //required: [true, 'Favorite Cat Cafe is required'],
    }
    }, {
    timestamps: true // Automatically handles createdAt and updatedAt
}); 

// Don't delete this one 
const User = models.User || model('User', UserSchema); 

export default User; 