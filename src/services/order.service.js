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
    const cost =0;
for (const item of finduser.items) {
    const product = await Product.findById(item.product);

     if(!product){
        throw new AppError("product not found",404);
     }

     if (item.quantity > product.stock) {
        throw new AppError("not enough quantity",400);

        cost+=product.price*item.quantity
        const orderItems = [];

        orderItems.push()
}
}


}

export {orders}