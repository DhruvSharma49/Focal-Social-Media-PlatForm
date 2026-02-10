const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    username: { type: String, required: true, unique: true },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }],

    accountType: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },

    showFollowers: {
      type: Boolean,
      default: true,
    },
    avatarUrl: { type: String, default: "" },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
