import mongoose from "mongoose";

const RelationshipSchema = new mongoose.Schema({
      
      followerUserId: {
        type: String,
      },
      followedUserId: {
        type: String,
      }
      
    },
    { timestamps: true }
)
export default mongoose.model("Relationship", RelationshipSchema);