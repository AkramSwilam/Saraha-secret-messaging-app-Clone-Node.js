import { Router } from "express";
import * as authController from "./auth_controller.js"
import { validation } from "../../middelwares/validation.js";
import * as validators from "./auth_validator.js"
const router =Router()

router.post("/signup",validation(validators.signup), authController.signup)

router.post("/signin",validation(validators.login), authController.signin)

router.get("/confirmEmail/:token",authController.confirmEmail)

router.get("/newConfirmEmail/:token",authController.newConfirmEmail)

export default router