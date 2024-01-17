import mongoose from "mongoose"
import User from "../Models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


export const register = async(req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body,password:hash})
        await newUser.save();
        res.status(200).send("User created");

    } catch (error) {
        next(error)
    }
}

export const login=async(req,res,next)=>{
    try{
        const user=await User.findOne({name:req.body.username})
        if(!user) return next(createError(404,"User not found"));
        const correct = await bcrypt.compare(req.body.password,user.password)
        if(!correct) return next(createError(404,"Wrong credentials"))
        const token=jwt.sign({id:user._id,name:user.username},"Yash")
        const { password, ...others } = user._doc;
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200)
        .json(others)
    }catch(error)
    {
        next(error)
    }
}

export const logout = (req, res) => {
    res.clearCookie("access_token").status(200).send("Logged out successfully");
  }
  