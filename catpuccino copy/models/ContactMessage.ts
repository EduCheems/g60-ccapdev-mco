import mongoose, { Schema, model, models } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ContactMessage =
  models.ContactMessage || model("ContactMessage", ContactMessageSchema);
export default ContactMessage;
