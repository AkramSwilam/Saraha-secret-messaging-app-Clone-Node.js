import { asyncHandler } from "../shared/async_handler.js";
import * as validators from "../modules/authentication/auth_validator.js"
const dataMethods=['body','params','headers','query','file']

export const validation = (scheme) => {

   return (req, res, nxt) => {
    let errors=[]
    dataMethods.forEach(
        (method)=>{
            if (scheme[method]) {
                const validate = scheme[method].validate(req[method], { abortEarly: false })
                if (validate.error) {
                    errors.push(validate.error)
                }
            }
            
        }
    )
        if (errors.length>0) {
            return nxt(new Error(errors, { cause: 404 }))
        }
        return nxt()
    }


}