import jwt from "jsonwebtoken";
import Comment from "../Models/Comment.js";
import moment from "moment";


export const getComments = async (req, res) => {
    const postId = req.query.postId;
  
    try {
      // Use Mongoose to find comments for the specified postId
      const comments = await Comment.find({ postId })
        .populate("userId", "id name profilePic")
        .sort({ createdAt: -1 });
  
      return res.status(200).json(comments);
    } catch (error) {
      console.error("Error while fetching comments:", error);
      return res.status(500).json(error);
    }
  };


  export const addComments = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in!");
  
    try {
      const userInfo = jwt.verify(token, "Yash", { ignoreExpiration: true });
      console.log("userInfo:", userInfo); // Log the user information
  
      // Create a new Comment document using the Mongoose model
      const newComment = new Comment({
        text: req.body.desc,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        userId: userInfo._id,
        userName:userInfo.name,
        postId: req.body.postId,
      });
  
      // Save the new comment to the database
      await newComment.save();
  
      return res.status(200).json("Comment has been created.");
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(500).json(error);
    }
  };
  
  