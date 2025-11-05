import { serialize } from "cookie";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  // Clear token cookie set at login/signup
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  res.setHeader("Set-Cookie", cookie);
  return res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
}
