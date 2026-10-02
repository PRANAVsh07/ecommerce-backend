
import AppError from "../error/usererror.js";
import  Cart from "../models/cart.model.js"
import { cartservice,updatecart} from "../services/cart.service.js";

const cart = async(req  ,res)=>{
    const cartuser = req.user.id
    
    const result = await  cartservice(cartuser)

    res.status(200).json({
        message:"here is your cart",
        result
    }

    )
}

const cartupdate = async(req,res)=>{
    const userid = req.user.id
   const updates = req.body;

    const result  = await updatecart(updates,userid)
}

export {cart,cartupdate}