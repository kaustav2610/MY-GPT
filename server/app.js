import  express  from "express"
import { config } from "dotenv"
import userRouter from "./routes/userRouter.js"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"


export const app=express()

config({
    path:"./data/config.env",
})



//middleware
app.use(express.json()) //accept json data from frontend(if not present from postman )
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","PUT","POST","DELETE"],
    credentials:true , //cookie,header will not show in frontend


}))



//using Routes
app.use("/api/v1/users",userRouter)



app.get("/",(req,res)=>{
    res.send("Nice working")
})





//middleware for error handling
app.use(errorMiddleware)
