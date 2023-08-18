import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";




export const login =  async(req,res,next)=>{

    try {
        const{email,password}=req.body; 

        const user=await User.findOne({email}).select("+password")
       
       
        if(!user) return next(new ErrorHandler("Invalid Email or Password",400))
        
       
        const isMatch=await bcrypt.compare(password,user.password);
       
        if(!isMatch) return next(new ErrorHandler("Invalid Email or password",400))
       
        //all email and password is true
        sendCookies(user,res,`Welcome back ${user.name}`,200);
       
    } catch (error) {
        next(error)
    }
}



export const register=async(req,res,next)=>{
    try {
        const{name,email,password}=req.body
        //finding user by email
        let user=await User.findOne({email});
    
        //if user exist
        if(user) return next(new ErrorHandler("User already Exists",400))
        
        //if user not exist- else block
    
            //secure password by hashing
            const hashedPassword=await bcrypt.hash(password,10);
    
            user=await User.create({name,email,password:hashedPassword});
    
            //sendcookie in util folder
            sendCookies(user,res,"Registered Successfully",201);
    } catch (error) {
        next(error)
    }


}


export const getMyProfile=(req,res)=>{

    return res.status(200).json({
        success:true,
        user:req.user,       //decoded id stored in req.user(see auth.js)
    })
    

};  

export const logout=(req,res)=>{

    return res.status(200).cookie("token","",{       //making token empty
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="development"? "lax":"none",  //backend and front on different url
        secure:process.env.NODE_ENV==="development"? false : true,
    }).json({     //main work :deleting cookie
        success:true,
        user:req.user,
    })
    

};
