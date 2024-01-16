import { connectDB } from "./database/connect.js";
import  messageRouter from "./modules/message/message_router.js";
import  userRouter from "./modules/user/user_router.js";
import authRouter from "./modules/authentication/auth_router.js"
import { globalErrorHandler } from "./shared/async_handler.js";

export const bootstrap=(app,express)=>{
    connectDB()
    app.use(express.json())
    app.use("/users",userRouter)
    app.use("/messages",messageRouter)
    app.use("/auth",authRouter)
    
    app.use("*",(req,res,nxt)=>{
        return res.send("404 Not Found");
    })

    app.use(globalErrorHandler)
}