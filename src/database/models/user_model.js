import { Schema,model,Types } from "mongoose";

const userSchema=new Schema(
    {
        firstName:String,
        lastName:String,
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            uniqe:true,
            lowercase:true
        },
        messages:[
            {
                type:String,
                ref:'Message'
            }
        ],
        password:{
            type:String,
            required:true
        },
        phone:{
            type:String,
        },
        age:{
            type:Number,
        },
        confirmEmail:{
            type:Boolean,
            default:false
        },
        gender:{
            type:String,
            enum:['Male','Female'],
            default:'Male'
        },
        profileImage:{
            type:String,
        },
        coverImages:[String]
    }
)

export const User=model("User",userSchema)