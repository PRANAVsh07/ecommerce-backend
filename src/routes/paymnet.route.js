

import express from"express"
import { newpayment, verifyPayment } from "../controllers/payment.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const paymentRouter = express.Router()

paymentRouter.post('/create/:orderId' ,authMiddleware,newpayment )
paymentRouter.post('/verify',verifyPayment)


export {paymentRouter}