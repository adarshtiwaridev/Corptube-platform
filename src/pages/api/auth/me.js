import { parse } from "cookie";
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";
import users from "../../../models/users";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { token } = parse(req.headers.cookie || "");
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const user = await users.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        accountType: user.accountType,
        profilePhoto: user.profilePhoto,
      }
    });
  } catch (err) {
    console.error("/api/auth/me error", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}


