const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file to Cloudinary with dynamic folder
// folderName: "posts" or "stories"
const uploadOnCloudinary = async (localFilePath, folderName = "posts") => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folderName,
    });

    console.log(
      `File uploaded to Cloudinary (${folderName}):`,
      response.secure_url
    );

    fs.unlinkSync(localFilePath); // delete local temp file

    return { url: response.secure_url, public_id: response.public_id };
  } catch (error) {
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    console.error("Cloudinary upload error:", error.message);
    return null;
  }
};

// Delete file from Cloudinary using public_id
const deleteFromCloudinary = async (public_id, resourceType = "image") => {
  try {
    if (!public_id) return false;
    await cloudinary.uploader.destroy(public_id, {
      resource_type: resourceType,
    });
    console.log("File deleted from Cloudinary:", public_id);
    return true;
  } catch (error) {
    console.error("Cloudinary delete error:", error.message);
    return false;
  }
};

module.exports = { uploadOnCloudinary, deleteFromCloudinary };
