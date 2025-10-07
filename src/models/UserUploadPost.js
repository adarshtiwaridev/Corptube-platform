import mongoose from "mongoose";

const { Schema } = mongoose;

const userUploadPostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true  },
    userCategory: { type: String },
    description: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.UserUploadPost ||
  mongoose.model("UserUploadPost", userUploadPostSchema);
