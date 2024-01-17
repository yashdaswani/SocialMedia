
import jwt from "jsonwebtoken";
import Relationship from "../Models/Relationship.js";



export const getRelationships = async (req, res) => {
  try {
    const { followedUserId } = req.query;
    const relationships = await Relationship.find({
      followedUserId: followedUserId,
    }).select("followerUserId");

    const followerUserIds = relationships.map((relationship) => relationship.followerUserId);
    return res.status(200).json(followerUserIds);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const addRelationship = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "Yash", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const newRelationship = new Relationship({
        followerUserId: userInfo.id,
        followedUserId: req.body.userId,
      });
      await newRelationship.save();

      return res.status(200).json("Following");
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};

export const deleteRelationship = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "Yash", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      await Relationship.deleteOne({
        followerUserId: userInfo.id,
        followedUserId: req.query.userId,
      });

      return res.status(200).json("Unfollow");
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};
