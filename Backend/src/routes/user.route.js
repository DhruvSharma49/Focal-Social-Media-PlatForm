const express = require("express");
const requireLogin = require("../middleware/requirelogin");
const { getIO, getOnlineUsers } = require("../../socket");
const User = require("../module/user.model");
const Post = require("../module/post.model");
const router = express.Router();

const Notification = require("../module/notification.model");

// follow the user
router.put("/follow", requireLogin, async (req, res) => {
  try {
    const { followId } = req.body;

    if (!followId) return res.status(400).json({ error: "followId required" });

    if (followId === req.user._id.toString())
      return res.status(400).json({ error: "Cannot follow yourself" });

    const userToFollow = await User.findById(followId);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) return res.status(404).json({ error: "User not found" });

    // Already following
    if (userToFollow.followers.includes(currentUser._id)) {
      return res.json({ status: "following" });
    }

    // PRIVATE ACCOUNT
    if (userToFollow.accountType === "private") {
      if (!userToFollow.followRequests.includes(currentUser._id)) {
        userToFollow.followRequests.push(currentUser._id);
        await userToFollow.save();

        // ✅ 1. SAVE IN DB
        const newNotification = await Notification.create({
          to: userToFollow._id,
          from: currentUser._id,
          type: "followRequest",
        });

        // ✅ 2. SEND REALTIME IF ONLINE
        const io = getIO();
        const onlineUsers = getOnlineUsers();
        const socketId = onlineUsers.get(followId);

        if (socketId) {
          io.to(socketId).emit("newFollowRequest", {
            _id: newNotification._id,
            fromUser: {
              _id: currentUser._id,
              username: currentUser.username,
              avatarUrl: currentUser.avatarUrl,
            },
            type: "followRequest",
          });
        }
      }

      return res.json({ status: "requested" });
    }

    // PUBLIC ACCOUNT → Direct follow
    userToFollow.followers.push(currentUser._id);
    currentUser.following.push(userToFollow._id);

    await userToFollow.save();
    await currentUser.save();

    return res.json({ status: "following" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Unfollow the user
router.put("/unfollow", requireLogin, async (req, res) => {
  try {
    const { unfollowId } = req.body;

    const userToUnfollow = await User.findById(unfollowId);
    const currentUser = await User.findById(req.user._id);

    userToUnfollow.followers.pull(currentUser._id);
    currentUser.following.pull(unfollowId);

    await userToUnfollow.save();
    await currentUser.save();

    res.json({ status: "unfollowed" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
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
      { new: true }
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
      { new: true } // Return the updated document
    );

    res.json({ message: "Username updated", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/approve/:userId", requireLogin, async (req, res) => {
  try {
    const requesterId = req.params.userId;

    const currentUser = await User.findById(req.user._id);
    const requester = await User.findById(requesterId);

    currentUser.followRequests.pull(requesterId);

    if (!currentUser.followers.includes(requesterId)) {
      currentUser.followers.push(requesterId);
    }

    if (!requester.following.includes(currentUser._id)) {
      requester.following.push(currentUser._id);
    }

    await currentUser.save();
    await requester.save();

    // 🔥 IMPORTANT CHANGE
    const deletedNotification = await Notification.findOneAndDelete({
      to: currentUser._id,
      from: requesterId,
      type: "followRequest",
    });

    res.json({
      msg: "Request approved",
      deletedNotificationId: deletedNotification?._id,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/reject/:userId", requireLogin, async (req, res) => {
  try {
    const requesterId = req.params.userId;

    const currentUser = await User.findById(req.user._id);

    currentUser.followRequests.pull(requesterId);
    await currentUser.save();

    // DELETE notification from DB
    await Notification.deleteOne({
      to: currentUser._id,
      from: requesterId,
      type: "followRequest",
    });

    res.json({ msg: "Request rejected", requesterId });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get Other User Profile
router.get("/otherprofile/:id", requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("followers", "_id name username")
      .populate("following", "_id name username");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ postedBy: req.params.id })
      .populate("postedBy", "username avatarUrl")
      .populate("comments.postedBy", "username avatarUrl")
      .sort({ createdAt: -1 });

    const isOwner = req.user._id.toString() === req.params.id.toString();

    const isFollower = user.followers.some(
      (f) => f._id.toString() === req.user._id.toString()
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

// Get Logged-in User Profile
router.get("/myprofile", requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("followers", "_id name username")
      .populate("following", "_id name username");

    const posts = await Post.find({ postedBy: req.user._id })
      .populate("postedBy", "username avatarUrl")
      .populate("comments.postedBy", "username avatarUrl")
      .sort({ createdAt: -1 });

    res.json({
      user,
      posts,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/notifications", requireLogin, async (req, res) => {
  try {
    const notifications = await Notification.find({
      to: req.user._id,
      isRead: false,
    })
      .populate("from", "username avatarUrl")
      .sort({ createdAt: -1 });

    res.json({ notifications });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/suggestions", requireLogin, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    // Find users who are NOT current user AND not already followed
    let users = await User.find({
      _id: { $ne: req.user._id, $nin: currentUser.following },
    })
      .limit(6) // max 6 suggestions
      .select("username name avatarUrl accountType"); // ONLY EXISTING FIELDS

    res.json({ users });
  } catch (err) {
    console.error("Suggestions error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
