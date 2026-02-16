const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const storySchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: "User", required: true },
  mediaURL: { type: String, required: true },
  cloudinaryId: { type: String, required: true }, // Cloudinary public_id
  createdAt: { type: Date, default: Date.now ,
    index: { expires: 86400000 }
  },
});

const Story = mongoose.model("Story", storySchema);
module.exports = Story;


