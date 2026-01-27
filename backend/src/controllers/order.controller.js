import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import { AppError } from "../utils/AppError.js";
import { Address } from "../models/address.model.js";
import { Product } from "../models/product.model.js";

export const placeOrder = async (req, res, next) => {
  try {
    const { addressId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );

    if (!cart || cart.items.length === 0) {
      return next(new AppError("Cart is empty", 400));
    }

    if (!addressId) {
      return next(new AppError("Address is required", 400));
    }

    const address = await Address.findById(addressId);
    if (!address) {
      return next(new AppError("Address not found", 400));
    }

    for (let item of cart.items) {
      const product = item.product;

      if (!product) {
        return next(new AppError("Product not found in cart", 404));
      }

      if (product.stock < item.quantity) {
        return next(new AppError(`Not enough stock for ${product.name}`, 400));
      }

      await Product.findByIdAndUpdate(product._id, {
        $inc: {
          stock: -item.quantity,
          sales: item.quantity,
        },
      });
    }

    let subtotal = 0;

    cart.items.forEach((item) => {
      subtotal += item.product.price * item.quantity;
    });

    const shipping = subtotal > 5000 ? 0 : 99;
    const tax = subtotal * 0.18;
    const totalAmount = subtotal + shipping + tax;

    const order = await Order.create({
      user: req.user._id,
      items: cart.items,

      address: {
        name: address.name,
        phone: address.phone,
        address: address.address,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      },

      subtotal,
      shipping,
      tax,
      totalAmount,

      status: "pending",
      statusHistory: [{ status: "pending" }],
    });

    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name price image images imageUrl")
      .sort("-createdAt");

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("items.product", "name price image images imageUrl");

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price image images imageUrl");

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    if (!order.statusHistory) {
      order.statusHistory = [];
    }

    order.status = status;

    const exists = order.statusHistory.find(
      (s) => s.status.toLowerCase() === status.toLowerCase(),
    );

    if (!exists) {
      order.statusHistory.push({
        status,
        date: new Date(),
      });
    }
    await order.save();

    res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    next(error);
  }
};
