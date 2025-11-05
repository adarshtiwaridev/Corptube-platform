import dbConnect from "@/lib/dbConnect";
import UserPostUpload from "@/models/UserPostUpload";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const posts = await UserPostUpload.find({})
      .populate("user", "name email profilePic")
      .populate("comments.user", "name email profilePic")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: posts });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
