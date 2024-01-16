import jwt from "jsonwebtoken"
import { asyncHandler } from "../shared/async_handler.js"
import { User } from "../database/models/user_model.js";

export const auht = asyncHandler(
    async (req, res, nxt) => {
        const { authorization } = req.headers;
        console.log(authorization.startsWith("Bearer "));
        if (!authorization||!authorization.startsWith("Bearer ")) {
            return nxt(new Error("not valid token", { cause: 401 }))
        }
        const token=authorization.split("Bearer ")
        const decoded = jwt.verify(token[1], process.env.TOKEN_SIGNATURE)
        if (!decoded?.id) {
            return nxt(new Error("User not found", { cause: 400 }))
        }
        const user = await User.findById(decoded.id)
        if (!user) {
            return nxt(new Error("Not registered user", { cause: 404 }))
        }

        req.user=user
        return nxt()
    }
)