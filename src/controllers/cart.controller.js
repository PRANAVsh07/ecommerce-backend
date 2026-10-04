
import AppError from "../error/usererror.js";
import  Cart from "../models/cart.model.js"
import { cartservice,updatecart,updateField,cartdelete,dleteAllCart} from "../services/cart.service.js";

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

    res.status(200).json({
        message:"user cart",
        result
    })
}

const addField=async(req,res)=>{
    const userid =  req.user.id
    const productid  = req.params.productId
    const quantity = req.body.quantity

    const result   = await updateField(userid,productid , quantity)

    if(!result){
        throw new AppError("Error Occured" , 500)
    }

    

    res.status(200).json({
        message:"updated value",
        result
    })
}


const deleteCart = async(data)=>{
     const userid =  req.user.id
    const productid  = req.params.productId
  

    const result  = await cartdelete(userid,productid)

    if(!result){
        throw new AppError("Cart not avaliable")
    }

    res.status(200).json({
        message:"cart deleted successfully"
    })
}
export {cart,cartupdate,addField,deleteCart}