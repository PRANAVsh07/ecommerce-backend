import AppError from "../error/usererror.js";
import User from "../models/user.model.js";
import uservalidate from"../validators/auth.validate.js"
import Token from "../utils/jwt.js"

import bcrypt from "bcrypt";

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
        email
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
     const accessToken=await Token(user)

  
     return {
        user,
        accessToken
     }

      };




export  {registerService,login};