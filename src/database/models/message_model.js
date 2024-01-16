import mongoose, { Schema, Types, model } from "mongoose";

const messageScheme=new Schema(
    {
        content:{
            type:String,
            required:true
        },
        recieverId:{
            type:Types.ObjectId,
            ref:'User'
        }
    }
)
export const Message=model('Message',messageScheme)