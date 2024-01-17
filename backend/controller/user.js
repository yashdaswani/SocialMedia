import jwt from "jsonwebtoken";
import User from "../Models/User.js"; // Import the User model
import mongoose from "mongoose";

export const getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json("Invalid user ID.");
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json("User not found.");
    }

    const { password, ...info } = user.toObject(); // Remove password from the response
    return res.json(info);
  } catch (error) {
    console.error("Error while fetching user:", error);
    return res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    try {
      const userInfo = jwt.verify(token, "Yash");
  
      // Ensure that the user is updating their own profile
      if (userInfo.id !== req.params.userId) {
        return res.status(403).json("You can update only your profile!");
      }
  
      // Find the user document by userId
      const user = await User.findByIdAndUpdate(
        userInfo.id, 
        {
          username: req.body.username,
          city: req.body.city,
          website: req.body.website,
          coverImg: req.body.coverImg,
          profileImg: req.body.profileImg,
        },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json("User not found.");
      }
      console.log(user);
      return res.json("Updated!");
    } catch (error) {
      console.error("Error while updating user:", error);
      return res.status(500).json(error);
    }
  };