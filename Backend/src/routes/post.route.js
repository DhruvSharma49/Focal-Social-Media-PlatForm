
const express = require("express");
const requireLogin = require("../middleware/requirelogin");
const Post = require("../module/post.model");

const router = express.Router();

// router.post("/createPost", requireLogin, async (req, res) => {
//   const {title,body,pic} = req.body

//     if(!title || !body ||!pic){
//         return res.status(400).json({error:"Please Fill all the Fields"})
//     }
//     // const post = new Post({title:"Test",body:"Test Body",postedBy:req.user})
//     const post = new Post({title,body,pic,postedBy:req.user})
//     await post.save()
//     return res.status(200).json({msg:"Post Created Successfully"})
// });

router.post("/createPost", requireLogin, async (req, res) => {
  try {
    const { caption, image } = req.body;

    if (!caption)
      return res.status(400).json({ error: "Caption & Image required" });

    const post = new Post({
      caption,
  
      postedBy: req.user._id,
    });

    await post.save();
    res.status(201).json({ msg: "Post created", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.get("/allPosts", requireLogin, async (req, res) => {
//   // console.log(req.user)
//   // return;
//   try {
//     const allPost = await Post.find({ postedBy: req.user._id });
//     return res.status(200).json({ posts: allPost });
//   } catch (error) {
//     console.log("Error", error);
//   }
// });

router.get("/allPosts", requireLogin, async (req, res) => {
  const posts = await Post.find()
    .populate("postedBy", "username avatarUrl")
    .sort({ createdAt: -1 });

  res.json({ posts });
});


router.put("/like/:postId", requireLogin, async (req, res) => {
  const postId = req.params.postId;
  const requiredPost = await Post.findByIdAndUpdate(postId, {
    $push: { likes: req.user._id },
  });
  // console.log(requiredPost)

  return res.status(200).json({ msg: "Like Updated" });
});

router.put("/unlike/:postId", requireLogin, async (req, res) => {
  const postId = req.params.postId;
  const requiredPost = await Post.findByIdAndUpdate(postId, {
    $pull: { likes: req.user._id },
  });

  return res.status(200).json({ msg: "UnLike Updated" });
});

router.put("/comment/:postId", requireLogin, async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  await Post.findByIdAndUpdate(req.params.postId, {
    $push: { comments: comment },
  });
  return res.status(200).json({ msg: "Comment Updated" });
});

// router.delete("/delete/:postId", requireLogin, async (req, res) => {
//   const post = await Post.findById(req.params.postId);
//   if (post.postedBy._id.toString() === req.user._id.toString()) {
//     await Post.findOneAndDelete(req.params.postId);
//     return res.status(200).json({ msg: "Post Deleted Successfully" });
//   } else {
//     return res
//       .status(400)
//       .json({ error: "You are not eligible for this command" });
//   }
// });

router.delete("/delete/:postId", requireLogin, async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) return res.status(404).json({ error: "Post not found" });

  if (post.postedBy.toString() !== req.user._id.toString())
    return res.status(403).json({ error: "Not allowed" });

  await Post.findByIdAndDelete(req.params.postId);
  res.json({ msg: "Post deleted" });
});


module.exports = router;


