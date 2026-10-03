import { order } from "../controllers/order.controller";
import AppError from "../error/usererror";
import Order from "../models/order.model";
import Cart from "../models/cart.model";
import Product from "../models/product.model";


const orders = async(data)=>{

    const finduser = await Cart.findOne({user:data})
    if(!finduser){
    throw new AppError("user cart not found",404)
    }

    if (finduser.items.length === 0) {
    throw new AppError("cart is empty", 400);
}

const item = finduser.items.find(
    item => item.product.toString() === productid
);
 if(!item){
    throw new AppError("usercart not found" , 404)
 }
      if(product.stock<value){
        throw  new AppError("not enough quantuty" ,404)
      }

}

export {orders}