import AppError from "../error/usererror.js"

import { createpayment ,verifyservice} from "../services/payment.service.js"


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

    // next: send these to service

    const result = await verifyservice(Rorderid,paymentid,paymentsignature)
};

export{newpayment,verifyPayment}

