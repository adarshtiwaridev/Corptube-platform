import mongoose from "mongoose";

const { Schema } = mongoose;

const userPostUploadSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String },
    imageUrl: { type: String },
    price: { type: Number },
    address: { type: String },
    userCategory: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.UserPostUpload ||
  mongoose.model("UserPostUpload", userPostUploadSchema);
