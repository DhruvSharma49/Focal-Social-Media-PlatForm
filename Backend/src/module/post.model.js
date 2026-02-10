// const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema.Types;

// const postSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   body: {
//     type: String,
//     required: true,
//   },
//   photos: {
//     type: String,
//   },
//   likes: [{ type: ObjectId, ref: "User" }], // Reference of user.models.js (userSchema)

//   comments: [
//     {
//       postBy: { type: ObjectId, ref: "User" }, // Reference of user.models.js (userSchema)
//     },
//   ],

//   postedBy: {
//     type: ObjectId,
//     ref: "User", // Reference of user.models.js (userSchema)
//   },
// });

// const Post = mongoose.model("Post", postSchema);
// module.exports = Post;


const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [
      {
        text: String,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
