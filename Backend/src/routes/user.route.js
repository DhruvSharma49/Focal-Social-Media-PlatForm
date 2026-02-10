const express = require("express");
const requireLogin = require("../middleware/requirelogin");
const User = require("../module/user.model");
const Post = require("../module/post.model");


const jwt = require("jsonwebtoken");
const router = express.Router();

// follow the user
router.put("/follow", requireLogin, async (req, res) => {
  try {
    const followId = req.body.followId;
    const result = await User.findByIdAndUpdate(
      followId,
      {
        $push: { followers: req.user._id },
      },
      {
        new: true,
      },
    );
    const result2 = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: followId },
      },
      {
        new: true,
      },
    );
    return res.status(200).json({ msg: "Followers Updated", user: result2 });
  } catch (error) {
    console.log("Error", error);
  }
});

// Unfollow the user
router.put("/unfollow", requireLogin, async (req, res) => {
  try {
    const unfollowId = req.body.unfollowId;
    const result = await User.findByIdAndUpdate(
      unfollowId,
      {
        $pull: { followers: req.user._id },
      },
      {
        new: true,
      },
    );
    const result2 = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: unfollowId },
      },
      {
        new: true,
      },
    );
    return res.status(200).json({ msg: "User unfollow you" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// For Search any user
router.get("/searchusers", requireLogin, async (req, res) => {
  try {
    const query = req.query.query?.trim();

    if (!query) return res.json({ users: [] });

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ],
      _id: { $ne: req.user._id }, // apna account search me mat dikhao
    })
      .select("name username avatarUrl accountType showFollowers") // ONLY EXISTING FIELDS
      .limit(20);

    res.status(200).json({ users });
    console.log("Search", users);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//Get the all the post of that user who login
router.get("/user/:id", requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("followers", "_id name username")
      .populate("following", "_id name username");

    const posts = await Post.find({ postedBy: req.params.id });

    const isOwner = req.user._id.toString() === req.params.id;
    const isFollower = user.followers.some(
      (f) => f._id.toString() === req.user._id.toString(),
    );

    let followersCount = user.followers.length;
    let followingCount = user.following.length;

    if (user.accountType === "private" && !isOwner && !isFollower) {
      followersCount = user.showFollowers ? user.followers.length : 0;
      followingCount = 0;
    }

    res.json({
      user: {
        ...user.toObject(),
        followersCount,
        followingCount,
      },
      posts:
        user.accountType === "private" && !isOwner && !isFollower ? [] : posts,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Change privacy (including public/private toggle)
router.put("/user/privacy/:id", requireLogin, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id)
      return res.status(403).json({ error: "Unauthorized" });

    const updateData = {};
    if (req.body.accountType) updateData.accountType = req.body.accountType;
    if (req.body.showFollowers !== undefined)
      updateData.showFollowers = req.body.showFollowers;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true },
    ).select("-password");

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update username of the logged-in user
router.put("/user/update-username", requireLogin, async (req, res) => {
  try {
    const { username } = req.body;

    if (!username)
      return res.status(400).json({ message: "Username required" });

    // Check if username is already taken
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "Username taken" });

    // Update the username in DB and return the updated user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username },
      { new: true }, // Return the updated document
    );

    res.json({ message: "Username updated", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
