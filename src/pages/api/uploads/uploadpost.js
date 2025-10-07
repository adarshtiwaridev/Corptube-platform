import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/users";
import UserUploadPost from "../../../models/UserUploadPost";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  try {
    if (method === "POST") {
      const { user, userId, userCategory, description, imageUrl } = req.body || {};

      // Resolve user
      let userDoc = null;
      if (user) userDoc = await User.findById(user).lean();
      if (!userDoc && userId) userDoc = await User.findOne({ userId }).lean();
      if (!userDoc) return res.status(404).json({ success: false, message: "User not found" });

      const doc = await UserUploadPost.create({
        user: userDoc._id,
        userCategory: userCategory || userDoc.category || undefined,
        description,
        imageUrl,
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

      const docs = await UserUploadPost.find(filter)
        .sort({ createdAt: -1 })
        .populate({ path: "user", select: "userId fullName email category accountType" });

      return res.status(200).json({ success: true, data: docs });
    }

    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  } catch (err) {
    console.error("/api/uploads/uploadpost error", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
