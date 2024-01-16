import { Router } from "express";
import * as userController from "./user_controller.js"
import { auht } from "../../middelwares/auth.js";
import { allFormats, multerFunctionUploader } from "../../shared/multer.js";
import { multerCloudUploader } from "../../shared/multer_cloud.js";
const router=Router()

router.get("/",auht,userController.getUsers)

router.get("/userInfo",auht,userController.getUserInfo)

router.post("/profilePicture",auht,multerFunctionUploader('extras/imgs',allFormats.image).single("profilePicture"),userController.profilePicture)

router.post("/profilePictureCloud",auht,multerCloudUploader(allFormats.image).single("profilePicture"),userController.profilePictureCloud)

export default router