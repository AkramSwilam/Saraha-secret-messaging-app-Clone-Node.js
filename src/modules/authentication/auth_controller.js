import { User } from "../../database/models/user_model.js"
import bcrypt from "bcrypt"
import { asyncHandler } from "../../shared/async_handler.js"
import  jwt  from "jsonwebtoken"
import { sendMail } from "../../shared/email.js"
import * as validators from "./auth_validator.js"

export const signup = asyncHandler(async (req, res, nxt) => {
    
        const { firstName, name, lastName, email, password } = req.body

        const validate=validators.signup["body"].validate(req.body,{abortEarly:false})
        if (validate.error) {
            return nxt(new Error(validate.error,{cause:404}))
        }

        const userExisit = await User.findOne({
            email
        })
        if (userExisit) {
            return nxt(new Error("Email Exisit",{cause:409}))
        }

        const hashedPaswword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND))
        const user = await User.create({
            name,
            firstName,
            lastName,
            email,
            password: hashedPaswword
        })
        const token=jwt.sign({id:user._id,email:user.email},process.env.EMAIL_SIGNATURE,{expiresIn:60*5})
        const newToken=jwt.sign({id:user._id,email:user.email},process.env.EMAIL_SIGNATURE,{expiresIn:60*10})
        await sendMail(
            {
                to:email,   
                subject:"Confirmation Email",
                html:`
                <a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}">Confirm Accaount</a>
                <br>
                <br>
                <a href="${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${newToken}">resend confirmation mail</a>
                `,
            }
        )
        return res.status(201).json({ "message": "done", user })
    
})

export const signin = asyncHandler(async (req, res, nxt) => {

    const { email, password } = req.body
  
    const user = await User.findOne({
        email
    })
    if (!user) {
        return nxt(new Error("Email Not Exisit",{cause:404}))
    }
    const match = bcrypt.compareSync(password, user.password)
    if (!match) {
        return nxt(new Error("Password is wrong",{cause:400}))
    }
    const token = jwt.sign({
        name:user.name,
        id:user._id
    },
    process.env.TOKEN_SIGNATURE
    )
    return res.status(200).json({ "message": "done", user,token })

})


export const confirmEmail=asyncHandler(
    async(req,res,nxt)=>{
        const{token}=req.params
        const decoded=jwt.verify(token,process.env.EMAIL_SIGNATURE)
        const user=await User.findByIdAndUpdate(decoded.id,{confirmEmail:true},{new:true})
        return user?  res.json({message:"done",user}) :  nxt(new Error("Not registered user",{cause:402}))
    }
)

export const newConfirmEmail =asyncHandler(
    async(req,res,nxt)=>{
        const{token}=req.params
        const decoded=jwt.verify(token,process.env.EMAIL_SIGNATURE)
        const user=await User.findById(decoded.id)
        if (!user) {
            return res.json({message:"Not registered"})
        }
        if (user.confirmEmail) {
            return res.json({message:"go to login"})
        }

        const newToken=jwt.sign({id:user._id,email:user.email},process.env.EMAIL_SIGNATURE,{expiresIn:60*2})
        const link=`${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`
        await sendMail(
            {
                to:user.email,   
                subject:"New Confirmation Email",
                html:`<a href="${link}">Confirm Accaount</a>`,
            }
        )
        return res.json({message:"check your inbox"})
    }
)