import jwt from "jsonwebtoken";
import Like from "../Models/Like.js"; // Import the Like model

export const getLikes = async (req, res) => {
  try {
    const postId = req.query.postId;

    // Fetch all the likes for the given postId from the database
    const likes = await Like.find({ postId });

    // Extract and return the userIds from the likes array
    const userIds = likes.map((like) => like.userId);

    return res.status(200).json(userIds);
  } catch (error) {
    console.error("Error while fetching likes:", error);
    return res.status(500).json(error);
  }
};

export const addLike = async (req, res) => {
    const token = req.cookies.access_token;
  
    if (!token) return res.status(401).json("Not logged in!");
  
    try {
      const userInfo = jwt.verify(token, "Yash");
  
      // Create a new Like document using the Mongoose model
      const newLike = new Like({
        userId: userInfo.id,
        postId: req.body.postId,
      });
  
      // Save the new like to the database
      await newLike.save();
  
      return res.status(200).json("Post has been liked.");
    } catch (error) {
      console.error("Error while adding like:", error);
      return res.status(500).json(error);
    }
  };

  export const deleteLike = async (req, res) => {
    const token = req.cookies.access_token;
  
    if (!token) return res.status(401).json("Not logged in!");
  
    try {
      const userInfo = jwt.verify(token, "Yash");
  
      // Find the like document based on userId and postId
      const like = await Like.findOneAndDelete({
        userId: userInfo.id,
        postId: req.query.postId,
      });
  
      if (!like) {
        return res.status(404).json("Like not found.");
      }
  
      return res.status(200).json("Post has been disliked.");
    } catch (error) {
      console.error("Error while deleting like:", error);
      return res.status(500).json(error);
    }
  };