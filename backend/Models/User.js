import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
        unique: true,
      },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
      },
      coverImg: {
        type: String,
        default:""
      },
      profileImg: {
        type: String,
        default:""
      },
      city: {
        type: String,
        default:""
      },
      website: {
        type: String,
        default:""
      },
      
    },
    { timestamps: true }
)
export default mongoose.model("User", UserSchema);