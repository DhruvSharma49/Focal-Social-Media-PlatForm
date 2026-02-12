const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "posts", // organized storage
    });

    console.log("File uploaded to Cloudinary:", response.url);

    // delete local file AFTER upload success
    fs.unlinkSync(localFilePath);
    return response.secure_url; // return only image url
  } catch (error) {
    //Remove the locally saved temporary files as the upload operation got failed
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

module.exports = { uploadOnCloudinary };
