import { Types } from "mongoose"
import { Message } from "../../database/models/message_model.js"
import { asyncHandler } from "../../shared/async_handler.js"
import { User } from "../../database/models/user_model.js"

export const getMessages=asyncHandler(
    async(req,res,nxt)=>{
        const mssgs=req.user.messages
        return res.json({mssgs})
    }
)

export const addMessage=asyncHandler(
    async(req,res,nxt)=>{
        const id=req.body.recieverId
        console.log(req.body.content);
        // const mssgs=await Message.create({content:req.body.content,recieverId:req.body.recieverId})
        // return res.json({mssgs})
        if (!Types.ObjectId.isValid(id)) {
            console.log("here");
            return nxt(new Error("In-valid Id",{cause:404}))
        }
        if (req.body.content=="") {
            return nxt(new Error("enter your message",{cause:404}))
        }
        const user=await User.findByIdAndUpdate(id,{
            $push:{messages:req.body.content}
        },
        {new:true})
        if (!user) {
            return nxt(new Error("User not found",{cause:404}))
        }
       const message= await Message.create({
            content:req.body.content,
            recieverId:id
        })
        return res.json({message:"done",user,message})
    }
)

