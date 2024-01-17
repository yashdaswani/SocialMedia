import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  postId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Like = mongoose.model("Like", likeSchema);

export default Like;
