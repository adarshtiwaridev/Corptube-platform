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
   const { userId, postId, text } = req.body;
   console.log("userId",userId);
   console.log("postId",postId);
   console.log("text",text);
        if (!userId || !postId || !text) {
        return res.status(400).json({ success: false, message: "Missing userId or postId or text" });
        }
    const post = (await UserPostUpload.findById({ _id: postId })) ||
                 (await UserUploadPost.findById({ _id: postId })) ||
                 (await UserVideoUpload.findById({ _id: postId }));
                 console.log("post",post);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    post.comments.push({ user: userId, text: text });
    await post.save();

    return res.status(200).json({ success: true, message: "Comment added", comments: post.comments });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
