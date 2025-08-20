import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("we reached cloudinary")
    if (!localFilePath) return null;
    console.log("we have something to upload")
    
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
   console.log("we got local path")
    // Delete local file asynchronously
    fs.unlink(localFilePath, (err) => {
      if (err) console.error("Failed to delete local file:", err);
    });

    return response;
  } catch (error) {
    // Delete local file even if upload fails
    fs.unlink(localFilePath, (err) => {
      if (err) console.error("Failed to delete local file after error:", err);
    });
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export { uploadOnCloudinary };
