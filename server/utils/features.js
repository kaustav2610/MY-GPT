import jwt from "jsonwebtoken"

export const sendCookies=(user,res,message,statusCode=200)=>{
    
    //storing user id securely for future authentication purpose
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)  //in DB id is denoted as _id alwasy

    res.status(statusCode).cookie("token",token,{
        httpOnly:true,
        maxAge:15*60*1000,
        sameSite:process.env.NODE_ENV==="development"? "lax":"none",  //backend and front on different url
        secure:process.env.NODE_ENV==="development"? false : true,
    }).json({
        success:true,
        message,
    })
}