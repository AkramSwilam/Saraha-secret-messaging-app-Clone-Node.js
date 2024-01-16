import { Router } from "express";
import * as messagesController from"./message_controller.js"
import { auht } from "../../middelwares/auth.js";
const router=Router()

router.get("/",auht,messagesController.getMessages)
router.post("/add",messagesController.addMessage)
export default router