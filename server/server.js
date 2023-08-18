import { app } from "./app.js";
import { db } from "./data/database.js";

//connect to db
db()


app.listen(process.env.PORT ,()=>{
    console.log(`Sever is working on ${process.env.PORT} in ${process.env.MODE} mode`)
})
