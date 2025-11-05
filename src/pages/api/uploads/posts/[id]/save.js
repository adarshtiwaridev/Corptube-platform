import dbConnect from "@/lib/dbConnect";
import UserPostUpload from "@/models/UserPostUpload";
import UserUploadPost from "@/models/UserUploadPost";
import UserVideoUpload from "@/models/UserVideoUpload";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { userId, postId } = req.body;

       let post =
           (await UserPostUpload.findById({ _id: postId })) ||
           (await UserUploadPost.findById({ _id: postId })) ||
           (await UserVideoUpload.findById({ _id: postId }));
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

   // ✅ Ensure savedBy and totalSaved are defined
if (!Array.isArray(post.savedBy)) {
  post.savedBy = [];
}
if (typeof post.totalSaved !== "number") {
  post.totalSaved = 0;
}

// ✅ Toggle Save Logic
if (!post.savedBy.includes(userId)) {
  post.savedBy.push(userId);
  post.totalSaved += 1;
} else {
  // ✅ Optional: Handle unsave toggle
  post.savedBy = post.savedBy.filter((id) => id.toString() !== userId.toString());
  post.totalSaved = Math.max(post.totalSaved - 1, 0);
}

await post.save();

return res.status(200).json({
  success: true,
  totalSaved: post.totalSaved,
  savedBy: post.savedBy,
});
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
