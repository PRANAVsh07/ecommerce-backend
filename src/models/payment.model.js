import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        currency: {
            type: String,
            default: "INR"
        },

        status: {
            type: String,
            enum: [
                "created",
                "pending",
                "successful",
                "failed",
                "refunded"
            ],
            default: "created"
        },

        paymentGateway: {
            type: String,
            default: "razorpay"
        },

        gatewayOrderId: {
            type: String
        },

        gatewayPaymentId: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;