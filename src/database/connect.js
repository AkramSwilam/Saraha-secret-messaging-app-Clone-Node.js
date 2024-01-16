import mongoose from "mongoose";

export const connectDB=async ()=>{
    await mongoose.connect(process.env.DB_URL).then(
        (value)=>{
            console.log("DB Connected");
        }
    ).catch(
        (error)=>{
            console.log(error);
        }
    )
}