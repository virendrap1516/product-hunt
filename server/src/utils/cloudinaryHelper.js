import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filepath) => {
  try {
    if (!filepath) return;
    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
    });
    fs.unlinkSync(filepath);
    return response.secure_url;
  } catch (error) {
    fs.unlinkSync(filepath);
    console.error("Cloudinary upload error:", error);
  }
};

export default uploadImage;
