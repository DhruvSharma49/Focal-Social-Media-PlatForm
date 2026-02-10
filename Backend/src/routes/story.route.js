const express = require("express");
const requireLogin = require("../middleware/requirelogin");
const Story = require("../module/story.model");

const router = express.Router();

// Create story (user login required)
router.post("/story", requireLogin, async (req, res) => {
  const { storyPic } = req.body;
  if (!storyPic) return res.status(400).json({ error: "storyPic is required" });

  const story = new Story({
  
    userId: req.user._id,
    mediaURL: storyPic
  });

  await story.save();
  res.status(200).json({ msg: "Story created successfully", story });
});

// Get all stories of a user
router.get("/story/:userId", async (req, res) => {
  const stories = await Story.find({ userId: req.params.userId });
  res.status(200).json({ stories });
});

module.exports = router;
