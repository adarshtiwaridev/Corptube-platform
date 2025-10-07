import formidable from "formidable";
import imageuploadcloudanary from "../../../lib/imageUpload";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const form = formidable({ multiples: false, keepExtensions: true });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const folder = fields.folder || "uploads";
    const height = fields.height ? Number(fields.height) : undefined;
    const quality = fields.quality ? Number(fields.quality) : undefined;

    const file = files.file;
    if (!file) return res.status(400).json({ success: false, message: "file field is required" });

    const uploadRes = await imageuploadcloudanary(
      Array.isArray(file) ? file[0] : file,
      folder,
      height,
      quality
    );

    return res.status(200).json({ success: true, data: uploadRes });
  } catch (err) {
    console.error("/api/media/upload error", err?.message || err, err?.original || 'no-original');

    // In development return more details to help debugging; in production, hide internals
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).json({ success: false, message: err?.message || 'Upload failed', details: err?.original?.message || err });
    }

    return res.status(500).json({ success: false, message: "Upload failed" });
  }
}
