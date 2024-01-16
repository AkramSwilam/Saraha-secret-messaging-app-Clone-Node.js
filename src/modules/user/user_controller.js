import { User } from "../../database/models/user_model.js"
import jwt, { decode } from "jsonwebtoken"
import { asyncHandler } from "../../shared/async_handler.js"
import cloudinary from "../../shared/cloudinary.js"
import qrcodeGenerator from "../../shared/qrcode.js"

export const getUsers = asyncHandler(
    async (req, res, nxt) => {
        return res.json({ user:req.user })
    }

)

export const profilePicture=asyncHandler(
    async(req,res,nxt)=>{
        console.log(req.user._id);
        const user = await User.findByIdAndUpdate(req.user._id,{profileImage:req.file.finalDest},{new:true})
        return res.json({message:"done",user,file:req.file})
    }
)

export const profilePictureCloud=asyncHandler(
    async(req,res,nxt)=>{
        const cloud=await cloudinary.uploader.upload(req.file.path,{folder:`saraha/users/${req.user._id}/profilePicture`})
        // const user = await User.findByIdAndUpdate(req.user._id,{profileImage:req.file.finalDest},{new:true})
        return res.json({message:"done",file:req.file,cloud})
    }
)

export const getUserInfo=asyncHandler(
    async(req,res,nxt)=>{
        const user=await User.findById(req.user._id)
        const url =await qrcodeGenerator(user)
        return res.json({url})
    }
)