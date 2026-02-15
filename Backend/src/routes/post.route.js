const express = require("express");
const requireLogin = require("../middleware/requirelogin");
const Post = require("../module/post.model");
const { uploadOnCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");
const upload = require("../middleware/multer.middleware");
const router = express.Router();

//Create  the post
router.post("/createPost", requireLogin, upload.single("image"), async (req, res) => {
  try {
    const { caption } = req.body;
    if (!caption || !req.file)
      return res.status(400).json({ error: "Caption & Image required" });

    const imageData = await uploadOnCloudinary(req.file.path, "posts");
    if (!imageData) return res.status(500).json({ error: "Upload failed" });

    const post = await Post.create({
      caption,
      image: imageData.url,
      imagePublicId: imageData.public_id,
      postedBy: req.user._id,
    });

    res.status(201).json({ msg: "Post created", post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Fetch all posts
router.get("/allPosts", requireLogin, async (req, res) => {
  const posts = await Post.find()
    .populate("postedBy", "username avatarUrl")
    .sort({ createdAt: -1 });

  res.json({ posts });
});

//Like
router.put("/like/:postId", requireLogin, async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.postId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate("postedBy", "username avatarUrl")
    .populate("comments.postedBy", "username avatarUrl");

  res.json(post);
});

//Unlike
router.put("/unlike/:postId", requireLogin, async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.postId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate("postedBy", "username avatarUrl")
    .populate("comments.postedBy", "username avatarUrl");

  res.json(post);
});

//comment
router.put("/comment/:postId", requireLogin, async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };

  const post = await Post.findByIdAndUpdate(
    req.params.postId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("postedBy", "username avatarUrl")
    .populate("comments.postedBy", "username avatarUrl");

  res.json(post);
});

//delete the post
router.delete("/delete/:postId", requireLogin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.postedBy.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Not allowed" });

    // Delete image from Cloudinary
    if (post.imagePublicId) {
      await deleteFromCloudinary(post.imagePublicId);
    }

    // Delete post from DB
    await Post.findByIdAndDelete(req.params.postId);

    res.json({ msg: "Post deleted successfully" });
  } catch (err) {
    console.error("Delete post error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Explore / random posts route
router.get("/randomposts", requireLogin, async (req, res) => {
  try {
    // 1. Aggregate: har user se sirf 1 latest post le lo
    let posts = await Post.aggregate([
      { $sort: { createdAt: -1 } }, // latest first
      {
        $group: {
          _id: "$postedBy", // user-wise grouping
          post: { $first: "$$ROOT" }, // har user ka latest post
        },
      },
      { $sample: { size: 20 } }, // 20 random posts total
    ]);

    // 2. Extract actual Post documents
    posts = posts.map((p) => p.post);

    // 3. Populate postedBy and comments.postedBy
    const populatedPosts = await Post.populate(posts, [
      { path: "postedBy", select: "username avatarUrl" },
      { path: "comments.postedBy", select: "username avatarUrl" },
    ]);

    // 4. Send response
    res.json({ posts: populatedPosts });
  } catch (err) {
    console.error("Explore posts error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
