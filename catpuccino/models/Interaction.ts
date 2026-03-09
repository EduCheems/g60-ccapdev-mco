import mongoose, { Schema, model, models } from "mongoose";

const InteractionSchema = new Schema({
  
    voteID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "voteID is required"],
    },

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
    targetID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
       
        refPath: 'targetType' 
    },
    
    targetType: {
        type: String,
        required: true,
        enum: ['Post', 'Comment'], 
    },
   
    voteValue: {
        type: Number,
        required: true,
        enum: [1, -1, 0], 
    }
}, {
    timestamps: true 
});

InteractionSchema.index({ userID: 1, targetID: 1, targetType: 1 }, { unique: true });

const Interaction = models.Interaction || model("Interaction", InteractionSchema); 
export default Interaction;