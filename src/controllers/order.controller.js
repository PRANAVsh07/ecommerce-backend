import AppError from "../error/usererror.js";
import { myorder, ordercancel, orders, Singleorder } from "../services/order.service.js";


const order = async(req ,res)=>{
    const result   = await orders(req.user.id)

      res.status(200).json({
        message:"here are your orders",
        result
      })
}


const userorder =  async(req ,res)=>{
    const result   = await myorder(req.user.id)

      res.status(200).json({
        message:"here are your orders",
        result
      })
}

const singleorder  = async(req,res)=>{
    const productid  = req.params.productid
    const result = await Singleorder(req.user.id ,productid  )

    res.status(200).json({
        message:"here is your order",
      product: result
})
}

const  cancelorder  =async(req,res)=>{
   const orderid =  req.params.orderId 
   const userid = req.user.id

   const result = await ordercancel(orderid,userid)
   

   res.status(200).json({
    message:"order cancel successfully",
    result,
   })
}






export {order,userorder,singleorder,cancelorder}