import {registerService,login,profileservice} from "../services/auth.service.js";

const registerUser = async (req, res) => {
    const user = await registerService(req.body);

    res.status(201).json({
        message: "User created successfully",
        user:{
         name: user.name,
         email:user.email,
         role:user.role,
        }
    });
};

const userlogin  = async(req,res)=>{
    const result = await login(req.body)
    

 
    res.status(201).json({
        message:"user login successfully",
        result:{
        name:result.user.name,
        email:result.user.email,
        role:result.user.role,
        },
        accesstoken:result.accessToken
        

    });
};


const profile = async(req,res)=>{
     const user = await profileservice(req.user.id);

     res.status(200).json({
        message:"Profie",
        user:{
          name:user.name,
          email:user.email,
          role:user.role,
        }
     })

}
export  {registerUser,userlogin,profile}
