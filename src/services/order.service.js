
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


const ordercancel = async(data,userid)=>{
          

 
            const order = await Order.findOne({
    _id: data,
    user: userid
});
      if (!order) {
    throw new AppError("Order not found", 404);
      }
  if(order.status==="delivered"){
    throw new AppError("order cannot be cancelled" ,400)
  }

  if (order.status === "cancelled") {
    throw new AppError("Order is already cancelled", 400);
}

   if(order.status=="confirmed"){
     
    await refund(userid , data)
   }



  for (const item of order.items) {
    const product = await Product.findById(item.product);

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    product.stock += item.quantity;

    await product.save();
}
order.status = "cancelled";
await order.save();

return order;



}
export {orders ,myorder,Singleorder,ordercancel}