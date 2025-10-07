// src/lib/imageUpload.js
import fs from "fs";
import stream from "stream";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadStream = (readable, options) =>
  new Promise((resolve, reject) => {
    const upload = cloudinary.v2.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });

    readable.pipe(upload);
  });

const imageuploadcloudanary = async (file, folder, height, quality) => {
  const options = { folder, resource_type: "auto" };

  if (height) options.height = height;
  if (quality) options.quality = quality;

  // Validate env configuration early for clearer errors
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary environment variables are not set");
  }

  try {
    // Try to detect a filesystem path on the incoming file object (formidable versions differ)
    const possiblePath = file?.filepath || file?.filePath || file?.path || file?.tempFilePath;

    if (possiblePath && fs.existsSync(possiblePath)) {
      const readStream = fs.createReadStream(possiblePath);
      return await uploadStream(readStream, options);
    }

    // If formidable produced an in-memory buffer (some configs), use a buffer -> stream
    if (file?.buffer) {
      const readable = new stream.PassThrough();
      readable.end(file.buffer);
      return await uploadStream(readable, options);
    }

    // Fallback: if we have raw data, try base64 upload (less efficient)
    if (file?.mimetype && file?.size && file?.bytes) {
      const base64 = Buffer.from(file.bytes).toString("base64");
      const dataUrl = `data:${file.mimetype};base64,${base64}`;
      return await cloudinary.v2.uploader.upload(dataUrl, options);
    }

    throw new Error("Unable to locate file data for upload");
  } catch (err) {
    // Add more context to the error for the caller
    const wrapped = new Error(`Cloudinary upload failed: ${err?.message || err}`);
    wrapped.original = err;
    throw wrapped;
  }
};

export default imageuploadcloudanary;
