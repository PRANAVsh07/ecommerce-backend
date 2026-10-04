import { order } from "../controllers/order.controller.js";
import AppError from "../error/usererror.js";
import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";


const orders = async(data)=>{





    const finduser = await Cart.findOne({user:data})
    if(!finduser){
    throw new AppError("user cart not found",404)
    }

    if (finduser.items.length === 0) {
    throw new AppError("cart is empty", 400);
}
    let cost =0;
       const orderItems = [];
for (const item of finduser.items) {
    const product = await Product.findById(item.product);

     if(!product){
        throw new AppError("product not found",404);
     }

     if (item.quantity > product.stock) {
        throw new AppError("not enough quantity",400);
     }
        cost+=product.price*item.quantity

     
    
     
        orderItems.push({
            product:product.id,
            quantity:item.quantity,
            price:product.price,
});
}

const createorder = await Order.create({
    user: data,
    items: orderItems,
    totalAmount: cost
});


for (const item of finduser.items) {
    const product = await Product.findById(item.product);

     if(!product){
        throw new AppError("product not found",404);
     }

      product.stock -= item.quantity;

    await product.save();
    }
 
finduser.items = [];
await finduser.save();
    





return createorder

       
}



const myorder = async(data)=>{
  
   
    const order = await Order.find({user:data})// find()  return array
    if (order.length === 0) {
    throw new AppError("No order history found", 404);
}
   return order
}


const Singleorder = async(userid, productid)=>{
    const finduser = await Order.find({ user: userid});

    for (const order of finduser) {
        const item = order.items.find(
            item => item.product.toString() === productid
        );

        if (item) {
            return item.product;
        }
    }

    throw new AppError("Product not found in order history", 404);

}

export {orders ,myorder,Singleorder}