import dbConnect from "@/lib/dbConnect";
import UserPostUpload from "@/models/UserPostUpload";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  await dbConnect();

  const { id, commentId } = req.query;
  const session = await getServerSession(req, res);
  const userId = session?.user?.id;

  if (!userId) return res.status(401).json({ success: false, message: "Not authenticated" });

  try {
    const post = await UserPostUpload.findById(id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });

    // Only comment owner or post owner can delete
    if (comment.user.toString() !== userId && post.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    comment.remove();
    await post.save();
    return res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    console.error("Delete Comment API Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
