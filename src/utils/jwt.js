import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()  
const Token = async(data)=>{
 
const accessToken = jwt.sign(
    {
        id: data._id,
        role: data.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "15m"
    }
);
   


const refreshToken = jwt.sign(
    {
        id: data._id,
        role: data.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
);
    return {
       accessToken ,
  refreshToken

    }
}


export default Token

