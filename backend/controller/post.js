
import Post from "../Models/Post.js"
import jwt from "jsonwebtoken";
import moment from "moment";
import Relationship from "../Models/Relationship.js";

export const getPosts = async (req, res) => {
  const userId = req.query.userId; // userId may or may not be present
  let query = {};

  try {
    // If userId is present, add userId filter to the query
    if (userId && userId !== "undefined") {
      query.userId = userId;
    }

    // Fetch posts based on the query
    const posts = await Post.find(query).sort({ createdAt: -1 }).populate("userId", "name profilePic");

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json(error);
  }
};

  export const addPost = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in!");
  
    try {
      const userInfo = jwt.verify(token, "Yash");
      console.log("userInfo:", userInfo);
      console.log("userInfo:", userInfo.id);
      console.log("userUsername:", userInfo.name);
  
      // Create a new Post document using the Mongoose model
      const newPost = new Post({
        desc: req.body.desc,
        img: req.body.img,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        userId: userInfo.id, // Ensure the correct field name is used here
        userName:userInfo.name
      });
  
      // Save the new post to the database
      await newPost.save();
  
      return res.status(200).json("Post has been created.");
    } catch (error) {
      console.error("Token verification error:", error); // Log any token verification errors
      return res.status(500).json(error);
    }
  };
  

  export const deletePost = async(req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "Yash", async (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      try {
        // Find the post to be deleted based on its ID and the user's ID
        const postToDelete = await PostModel.findOne({
          _id: req.params.id,
          userId: userInfo.id,
        });
  
        if (!postToDelete) {
          // If the post does not exist or the user is not the owner, return an error
          return res.status(403).json("You can delete only your post");
        }
  
        // If the post belongs to the user, delete it from the database
        await postToDelete.remove();
  
        return res.status(200).json("Post has been deleted.");
      } catch (error) {
        return res.status(500).json(error);
      }
    });
  };
  
  