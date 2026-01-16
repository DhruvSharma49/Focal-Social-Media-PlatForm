const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photos: {
    type: String,
  },
  likes: [{ type: ObjectId, ref: "User" }], // Reference of user.models.js (userSchema)

  comments: [
    {
      postBy: { type: ObjectId, ref: "User" }, // Reference of user.models.js (userSchema)
    },
  ],

  postedBy: {
    type: ObjectId,
    ref: "User", // Reference of user.models.js (userSchema)
  },
  // story: {
  //   userId: { type: String, required: true },
  //   mediaURL: { type: String, required: true },
  //   createdAt: { type: Date, default: Date.now(), index: { expires: 60 } },
  // },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;


