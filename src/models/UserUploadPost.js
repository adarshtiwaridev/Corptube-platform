import mongoose from "mongoose";

const { Schema } = mongoose;
// Define the comment schema (embedded subdocument)
const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const userUploadPostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true  },
    userCategory: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    totalComments: { type: Number, default: 0 },
    title: { type: String },
     // ✅ New fields
    totalLikes: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 },
    comments: [commentSchema], // Array of comment subdocuments
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // who liked
    viewedBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // who viewed
    savedBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // who saved
  },
  { timestamps: true }
);

export default mongoose.models.UserUploadPost || mongoose.model("UserUploadPost", userUploadPostSchema);
