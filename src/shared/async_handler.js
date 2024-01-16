
export const asyncHandler=(fn)=>{
    return (req,res,nxt)=>{
        fn(req,res,nxt).catch(
            (error)=>{
                return nxt(new Error(error,{cause:500}))
            }
        )
    }
}

export const globalErrorHandler=(error,req,res,nxt)=>{
    return res.status(error.cause||400).json({"message":"error","msgError":error.message})
}