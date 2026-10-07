import AppError from "../error/usererror.js"

import { createpayment ,verifyservice ,refund} from "../services/payment.service.js"


const newpayment = async(req ,res)=>{

    const order = req.params.orderId;
    const result = await createpayment(req.user.id , order)

    if(!result){
       return res.status(500).json({
            message:"Internal server error"
        })
    }
    res.status(200).json({
        messsage:"Payment created successfully",
        result
    })
}



    const verifyPayment = async (req, res) => {
    const Rorderid = req.body.razorpay_order_id;
    const paymentid = req.body.razorpay_payment_id;
    const paymentsignature = req.body.razorpay_signature;

  

    const result = await verifyservice(Rorderid,paymentid,paymentsignature)
};



const refundcontrols = async(req,res)=>{
 const orderid =  req.params.orderId 
   const userid = req.user.id

   const result = await refund(userid, orderid)
   

   res.status(200).json({
    message:"Payment refund successfully",
    result,
   })
}

export{newpayment,verifyPayment ,refundcontrols}

