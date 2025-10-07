import mongoose from "mongoose";

const { Schema } = mongoose;

const userVideoUploadSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    userCategory: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.UserVideoUpload ||
  mongoose.model("UserVideoUpload", userVideoUploadSchema);
