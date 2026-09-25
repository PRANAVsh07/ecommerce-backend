import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const DBconnect = async()=>{
    const result  = await mongoose.connect(process.env.MONGO_URL);

    console.log("DBconnect");


}

export default DBconnect