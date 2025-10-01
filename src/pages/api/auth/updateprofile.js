// pages/api/user/updateProfile.js
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/users";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  try {
    // ✅ Extract token from cookies or headers
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // we assume token payload contains user.id

    // ✅ Take fields from body
    const { fullName, profilePhoto, category } = req.body;

    // ✅ Update user using _id from token
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName, profilePhoto, category },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
