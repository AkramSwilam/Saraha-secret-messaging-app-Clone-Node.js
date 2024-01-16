import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { bootstrap } from "./src/index_router.js"
const app=express()
const port=5000



import { cronJob } from "./src/shared/cron-job.js"


app.use("/uploads",express.static("./uploads"))
cronJob()
bootstrap(app,express)


app.listen(port,()=>{
    console.log("Server is ON ",port);
})