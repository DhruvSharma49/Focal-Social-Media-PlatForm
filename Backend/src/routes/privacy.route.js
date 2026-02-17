const express = require("express");
const requireLogin = require("../middleware/requirelogin");
const User = require("../module/user.model");
const router = express.Router();
const Notification = require("../module/notification.model");


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



module.exports = router;