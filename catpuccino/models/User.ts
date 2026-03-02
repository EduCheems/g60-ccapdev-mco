import mongoose, { Schema, model, models} from 'mongoose'; 

const UserSchema = new Schema({
    username: {
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
        required: [true, 'Password is required'],
    }, 
    bio: {
        type: String, 
        default: "Meow meow meow mewo...", 
    },
    profilePic: {
        type: String, 
        default: "/default-avatar.png",
    }
    }, {
    timestamps: true, //To automatically add timestamps for "createdAt" and "updatedAt"
}); 

// Don't delete this one 
const User = models.User || model('User', UserSchema); 

export default User; 