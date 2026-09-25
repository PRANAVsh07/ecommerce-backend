import registerService from "../services/auth.service.js";

const registerUser = async (req, res) => {
    const user = await registerService(req.body);

    res.status(201).json({
        message: "User created successfully",
        user:{
         name: user.name,
         email:user.email
        }
    });
};
export default registerUser
