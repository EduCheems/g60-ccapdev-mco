import mongoose, { Schema, model, models } from "mongoose";

const InteractionSchema = new Schema({
  userID: { type: String, required: true }, 
  
  targetID: { type: Schema.Types.ObjectId, required: true },
  targetType: { type: String, enum: ["Post", "Comment"], required: true },
  voteValue: { type: Number, enum: [1, -1], required: true },
}, { timestamps: true });

InteractionSchema.index({ userID: 1, targetID: 1, targetType: 1 }, { unique: true });

const Interaction = models.Interaction || model("Interaction", InteractionSchema);
export default Interaction;