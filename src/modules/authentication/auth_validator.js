import joi from "joi"
export const signup = {
    body: joi.object({
        name: joi.string().min(3).max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).required(),
        age: joi.number().integer().positive().min(12).max(100)
    }).required(),
    params:joi.object(
        {
            flag:joi.boolean().truthy('1').falsy('0')
        }
    )
}

export const login = joi.object({
    email: joi.string().email({ maxDomainSegments: 5, tlds: ['.com', '.net', '.eg', '.edu'] }).required(),
    password: joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).required()
}).required()