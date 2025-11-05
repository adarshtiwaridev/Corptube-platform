import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/users";
import UserVideoUpload from "../../../models/UserVideoUpload";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  try {
    if (method === "POST") {
      const { user, title, userId, videoUrl, thumbnailUrl, userCategory, description } = req.body || {};

      if (!videoUrl || !thumbnailUrl) {
        return res.status(400).json({ success: false, message: "videoUrl and thumbnailUrl are required" });
      }

      // Resolve user
      let userDoc = null;
      if (user) userDoc = await User.findById(user).lean();
      if (!userDoc && userId) userDoc = await User.findOne({ userId }).lean();
      if (!userDoc) return res.status(404).json({ success: false, message: "User not found" });

      const doc = await UserVideoUpload.create({
        user: userDoc._id,
        title,
        videoUrl,
        thumbnailUrl,
        userCategory: userCategory || userDoc.category || undefined,
        description,
      });

      return res.status(201).json({ success: true, data: doc });
    }

    if (method === "GET") {
      const { user, userId } = req.query || {};

      const filter = {};
      if (user) filter.user = user;
      if (userId) {
        const u = await User.findOne({ userId }).select("_id");
        if (u) filter.user = u._id; else return res.status(404).json({ success: false, message: "User not found" });
      }

      const docs = await UserVideoUpload.find(filter)
        .sort({ createdAt: -1 })
        .populate({ path: "user", select: "userId fullName email category accountType" });

      return res.status(200).json({ success: true, data: docs });
    }

    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  } catch (err) {
    console.error("/api/uploads/video error", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
