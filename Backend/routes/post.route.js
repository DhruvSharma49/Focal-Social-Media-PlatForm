
const express = require("express");
const requireLogin = require("../middleware/requirelogin");
const Post = require("../module/post.module");

const router = express.Router();

router.post("/createPost", requireLogin, async (req, res) => {
  const {title,body,pic} = req.body

    if(!title || !body ||!pic){
        return res.status(400).json({error:"Please Fill all the Fields"})
    }
    // const post = new Post({title:"Test",body:"Test Body",postedBy:req.user})
    const post = new Post({title,body,pic,postedBy:req.user})
    await post.save()
    return res.status(200).json({msg:"Post Created Successfully"})
});

router.get("/allPosts", requireLogin, async (req, res) => {
  // console.log(req.user)
  // return;
  try {
    const allPost = await Post.find({ postedBy: req.user._id });
    return res.status(200).json({ posts: allPost });
  } catch (error) {
    console.log("Error", error);
  }
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

router.delete("/delete/:postId", requireLogin, async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (post.postedBy._id.toString() === req.user._id.toString()) {
    await Post.findOneAndDelete(req.params.postId);
    return res.status(200).json({ msg: "Post Deleted Successfully" });
  } else {
    return res
      .status(400)
      .json({ error: "You are not eligible for this command" });
  }
});

module.exports = router;


