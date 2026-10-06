import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";

import AppError from "../error/usererror.js"
import razorpay from "../config/razorpay.js";
import crypto from "crypto";

const createpayment  = async(userid   , orderid)=>{
           const user = await User.findById(userid);

          if (!user) {
    throw new AppError("user not found", 404);
}
            const order = await Order.findOne({
    _id: orderid,
    user: userid
});
      if (!order) {
    throw new AppError("Order not found", 404);
}

  if(order.status!=="pending"){
    throw new AppError("payment already doner" , 404)
  }


  const razorpayOrder = await razorpay.orders.create({
    amount: order.totalAmount * 100,
    currency: "INR",
    receipt: orderid
});

  const payment = await Payment.create({
      user:userid,
      order:orderid,
       amount:order.totalAmount,
        gatewayOrderId: razorpayOrder.id

  })
return {
    payment,
    razorpayOrder
};
}


const verifyservice = async(Rorderid,paymentid ,paymentsignature)=>{
   
    const body = Rorderid + "|" + paymentid;

     const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

    if (expectedSignature !== paymentsignature) {
    throw new AppError("Payment does not verify", 400)
}
const payment = await Payment.findOne({
    gatewayOrderId: Rorderid
});

if(!payment){
    throw new AppError("Payment does not verify", 400)
}
payment.status = "successful";
payment.gatewayPaymentId = paymentid;

await payment.save();

const order = await Order.findById(payment.order);
if (!order) {
    throw new AppError("Order not found", 404);
}

order.status = "confirmed";

await order.save();
return {
    payment,
    order
};
   
}

export {createpayment,verifyservice}    