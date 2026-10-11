import express from"express"
import dotenv from"dotenv"
import DBconnect from "./src/config/db.js";
import app from "../ecommerce-backend/src/app.js"
import redisClient from "./src/config/redis.js";
dotenv.config();





const start = async()=>{
   await DBconnect()
   await redisClient.connect()

    app.listen(process.env.PORT,()=>{
   console.log("server is listening")
    })
}

start()


