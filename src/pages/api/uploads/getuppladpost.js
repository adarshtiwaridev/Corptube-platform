import dbConnect from "../../../lib/dbConnect";
import   UserUploadPost from "../../../models/UserUploadPost";
export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  try {
   
  if (method === "GET") {
      const posts = await UserUploadPost.find()
         .populate({
    path: "user",
    model: "User",  
    select: "userId fullName email  profilePhoto accountType",
  })
  .sort({ createdAt: -1 });

     console.log("posts getuppladpost",posts);
      return res.status(200).json({ success: true, data: posts });
    }

    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  } catch (err) {
    console.error("/api/uploads/getuppladpost error", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
