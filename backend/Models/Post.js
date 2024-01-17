import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
      desc: {
        type: String,
      },
      userId: {
        type: String,
      },
      userName: {
        type: String,
      },
      img: {
        type: String,
      },
      createdAt: {
        type: Date, // Corrected from timestamps to Date
        default: Date.now
    }
      
    },
    { timestamps: true }
)
export default mongoose.model("Post", PostSchema);