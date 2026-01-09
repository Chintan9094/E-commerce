import { razorpay } from "../config/razorpay.js";
import { Order } from "../models/order.model.js";
import { AppError } from "../utils/AppError.js";
import crypto from "crypto";

export const createRazorpayOrder = async (req, res, next) => {
    try {
        const { orderId } = req.body;

        const order = await Order.findById(orderId);

        if(!order){
            return next(new AppError("Order not found",404));
        }

        const options = {
            amount: order.totalAmount * 100,
            currency: "INR",
            receipt: `order_rcptid_${order._id}`,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.json({
            success: true,
            orderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID,
        });
        
    } catch (error) {
        next(error);
    }
};

export const verifyPayment = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        const bodyString = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
        .createHmac ("sha256",process.env.RAZORPAY_KEY_SECRET)
        .update(bodyString)
        .digest("hex");

        if(expectedSignature === razorpay_signature) {
            const order = await Order.findById(orderId);
            order.paymentStatus = "paid";   
            order.paymentId = razorpay_payment_id;
            await order.save();

            return res.json({
                success: true,
                message: "Payment verified & order updated!"
            });
            }

            res.status(400).json({
            success: false,
            message: "Payment verification failed"
            });
        
    } catch (error) {
        next(error);
    }
};