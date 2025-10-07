 
import { IncomingForm } from "formidable";
import imageuploadcloudanary from "@/lib/imageUpload";

// Ensure formidable is set up to parse incoming form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err || !files?.image) {
      console.error("Form parse error:", err);
      return res.status(400).json({ message: "Image file is required." });
    }
const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
    try {
        const result = await imageuploadcloudanary(
         imageFile,
        "pankajphoto",  
        400,             
        "auto"          
      );
      

      return res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error("Cloudinary error:", error);
      return res.status(500).json({ message: "Image upload failed." });
    }
  });
}
