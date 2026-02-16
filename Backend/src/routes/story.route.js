const express = require("express");
const requireLogin = require("../middleware/requirelogin");
const Story = require("../module/story.model");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");
const upload = require("../middleware/multer.middleware");

const router = express.Router();

// ==========================
// CREATE STORY
// ==========================
router.post(
  "/story",
  requireLogin,
  upload.single("storyPic"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Story image is required" });
      }

      const mediaData = await uploadOnCloudinary(req.file.path, "stories");

      if (!mediaData) {
        return res.status(500).json({ error: "Upload failed" });
      }

      const story = new Story({
        userId: req.user._id,
        mediaURL: mediaData.url,
        cloudinaryId: mediaData.public_id,
      });

      await story.save();

      res.status(200).json({
        msg: "Story uploaded successfully",
        story: {
          _id: story._id,
          mediaURL: story.mediaURL,
          cloudinaryId: story.cloudinaryId,
          createdAt: story.createdAt,
          userId: {
            _id: req.user._id,
            username: req.user.username,
            avatarUrl: req.user.avatarUrl,
            accountType: req.user.accountType,
            followers: req.user.followers,
          },
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
);

// ==========================
// GET ONLY ACTIVE STORIES
// ==========================
router.get("/story", requireLogin, async (req, res) => {
  try {
    const expiryTime = new Date(Date.now() - 60 * 1000);

    const stories = await Story.find({
      createdAt: { $gt: expiryTime }, // ONLY ACTIVE STORIES
    })
      .populate("userId", "username avatarUrl accountType followers")
      .sort({ createdAt: -1 });

    res.status(200).json({ stories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
//  AUTO DELETE EXPIRED STORIES
// ==========================
setInterval(async () => {
  try {
    const expiryTime = new Date(Date.now() - 60 * 1000); // 1 hour

    const expiredStories = await Story.find({
      createdAt: { $lte: expiryTime },
    });

    for (const story of expiredStories) {
      if (story.cloudinaryId) {
        await deleteFromCloudinary(story.cloudinaryId);
      }

      await Story.findByIdAndDelete(story._id);
      console.log("Deleted expired story:", story._id);
    }
  } catch (err) {
    console.error("Error deleting expired stories:", err.message);
  }
}, 30 * 1000);

module.exports = router;
