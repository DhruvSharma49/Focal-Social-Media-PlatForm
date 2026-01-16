const express = require("express");
const requireLogin = require("../middleware/requirelogin");
const User = require("../module/user.module");
const Post = require("../module/post.module");
const { encrypted, decrypt } = require("../utilities/password");

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
      }
    );
    const result2 = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: followId },
      },
      {
        new: true,
      }
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
      }
    );
    const result2 = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: unfollowId },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ msg: "User unfollow you" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get the all the post of that user who login
router.get("/user/:id", requireLogin, async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  const posts = await Post.find({ postedBy: req.params.id });
  return res.status(200).json({ posts, user });
  console.log("h");
});

// Update the user profile
router.put("/user/updateprofile/:id", requireLogin, async (req, res) => {
  try {
    const userId = req.params.id;
    const updateUserData = req.body;

    // agar password update ho raha hai
    if (updateUserData.password) {
      updateUserData.password = await encrypted(updateUserData.password); 
    }

    const result = await User.findByIdAndUpdate(
      userId,
      { $set: updateUserData },
      { new: true }
    )

    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign({ id: result._id }, process.env.SECRET_KEY);

    return res.status(200).json({ msg: "Profile Updated", user: result });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
