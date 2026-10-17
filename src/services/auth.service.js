import AppError from "../error/usererror.js";
import User from "../models/user.model.js";
import uservalidate from"../validators/auth.validate.js"
import Token from "../utils/jwt.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );
};




const registerService = async  (data) => {
        uservalidate(data);
    const { email, password, name } = data;

     const existingUser = await User.findOne({ email });

          if (existingUser) {
      throw new Error("Email already registered",409);
}
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        password: hashedPassword,
        email,
       
    });

    return user;
};


const login = async(data)=>{

     const {email ,password} = data

       if(!password||!email){
        throw new AppError("wrong input", 400)
      }
       
     const user= await User.findOne({email})
     
     if(!user){
        throw new AppError("user NOT FOUNd" ,402)
     }
      
       
   
     const match=await bcrypt.compare(password, user.password)

     if(!match){
        throw new AppError("invalid credential" ,401)
     }
  const { accessToken, refreshToken } = Token(user);

  user.refreshToken = refreshToken;
await user.save();
     return {
        user,
        accessToken,
         refreshToken
     }

      };

      const profileservice =async(userId)=>{
        const user  = await User.findById(userId);
      return user
      }





      const refreshtoken = async(data)=>{
      
        if(!data){
          throw new AppError(401)
        }
        let decoded;
        try{
    
        decoded= jwt.verify(
          data, process.env.JWT_REFRESH_SECRET
        )

    
      }
      catch(err){
            console.log("Refresh token error:", err.message);
           throw new AppError("Invalid or expired refresh token", 401);
      }
        const user = await User.findById(decoded.id);


if (!user || data !== user.refreshToken) {
    throw new AppError("Invalid or revoked refresh token", 401);
}
            
       
         const accessToken = generateAccessToken(user);
         return accessToken;
      
        


      }




export  {registerService,login,profileservice,refreshtoken};