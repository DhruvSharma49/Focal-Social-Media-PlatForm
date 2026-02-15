const express = require("express");
const requireLogin = require("../middleware/requirelogin");
const Story = require("../module/story.model");
const { uploadOnCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");
const upload = require("../middleware/multer.middleware");
const router = express.Router();

// Create the story
router.post("/story", requireLogin, upload.single("storyPic"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Story image is required" });

    const mediaData = await uploadOnCloudinary(req.file.path, "stories");
    if (!mediaData) return res.status(500).json({ error: "Upload failed" });

    const story = new Story({
      userId: req.user._id,
      mediaURL: mediaData.url,
      cloudinaryId: mediaData.public_id,
    });

    await story.save();

    // Return frontend-friendly structure
    res.status(200).json({
      msg: "Story uploaded successfully",
      story: {
        _id: story._id,
        mediaURL: story.mediaURL,
        userId: {
          _id: req.user._id,
          username: req.user.username,
          avatarUrl: req.user.avatarUrl,
        },
        createdAt: story.createdAt,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all stories
router.get("/story", requireLogin, async (req, res) => {
  try {
    const stories = await Story.find()
      .populate("userId", "username avatarUrl")
      .sort({ createdAt: -1 });

    const formattedStories = stories.map((story) => ({
      _id: story._id,
      mediaURL: story.mediaURL,
      userId: {
        _id: story.userId._id,
        username: story.userId.username,
        avatarUrl: story.userId.avatarUrl,
      },
      createdAt: story.createdAt,
    }));

    res.status(200).json({ stories: formattedStories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete expired stories (every 30 sec)
setInterval(async () => {
  try {
    const now = new Date();
    const expiredStories = await Story.find({
      createdAt: { $lte: new Date(now - 60 * 1000) }, // 1 min expiry
    });

    for (const story of expiredStories) {
      if (story.cloudinaryId) await deleteFromCloudinary(story.cloudinaryId);
      await Story.findByIdAndDelete(story._id);
      console.log("Deleted expired story:", story._id);
    }
  } catch (err) {
    console.error("Error deleting expired stories:", err.message);
  }
}, 30 * 1000);

module.exports = router;
