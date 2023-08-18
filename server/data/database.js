import mongoose from "mongoose";

export const db=()=>{
    mongoose.connect( process.env.MONGO_URI , {dbName:"GPT_backend"} )
    .then((c)=>console.log(`Database is Cnnected with ${c.connection.host}`))
    .catch((e)=>console.log(e))
}