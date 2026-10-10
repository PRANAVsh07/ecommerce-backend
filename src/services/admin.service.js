import Order from "../models/order.model.js";
import AppError from "../error/usererror.js"

import { status, allorders} from "../controllers/admin.controller.js";

const orders = async()=>{
    const order = await Order.find()
     .populate("user", "name email")
     .populate("item.product","name price");

  


      if(order.length===0){
        throw new AppError("no order found",400);
      }
    return order;
}




const orderstatus = async (orderId, status) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw new AppError("Order not found", 404);
    }


    if (order.status === "cancelled") {
        throw new AppError("Operation not allowed for cancelled orders", 400);
    }

    const isValidTransition =
        (order.status === "confirmed" && status === "shipped") ||
        (order.status === "shipped" && status === "delivered");

    if (!isValidTransition) {
        throw new AppError("Invalid status transition", 400);
    }


    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status: status },
        { new: true }
    );


    return updatedOrder;
};


export{orders,orderstatus};