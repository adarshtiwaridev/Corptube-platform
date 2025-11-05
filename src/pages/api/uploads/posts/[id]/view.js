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

    if (!post.viewedBy.includes(userId)) {
      post.viewedBy.push(userId);
      post.totalViews += 1;
      await post.save();
    }

    return res.status(200).json({ success: true, totalViews: post.totalViews });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
