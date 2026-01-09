import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";

export const placeOrder = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({user: req.user._id}).populate("items.product");

        if(!cart || cart.items.length === 0){
            return next(new AppError("Cart is empty",400));
        }

        let totalAmount = 0;
        cart.items.forEach((item) => {
            totalAmount += item.product.price * item.quantity;
        });

        const order = await Order.create({
            user: req.user._id,
            items: cart.items,
            totalAmount
        });

        cart.items = [];
        await cart.save();

        res.json({
            success: true,
            message: "Order placed successfully!",
            order
        });
        
    } catch (error) {
        next(error);
    }
};

export const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort("-createdAt");

        res.json({
            success: true,
            orders
        });
        
    } catch (error) {
        next(error);
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate("user", "name email").populate("items.product", "name price");

        res.json({
            success: true,
            orders
        });
        
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if(!order){
            return next(new AppError("Order not found", 404));
        }

        order.status = status;
        await order.save();

        res.json({
            success: true,
            message: "Order status updated",
            order
        });

    } catch (error) {
        next(error);
    }
};