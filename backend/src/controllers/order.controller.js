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
    const { search = "", sort = "", page = 1, limit = 5 } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const matchStage = {};
    if (sort) matchStage.status = sort;

    const pipeline = [
      { $match: matchStage },

      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      { $unwind: "$userData" },

      { $unwind: "$items" },

      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productData",
        },
      },
      { $unwind: "$productData" },
    ];

    if (req.user.role === "seller") {
      pipeline.push({
        $match: {
          "productData.seller": req.user._id,
        },
      });
    } else {
      pipeline.push({
        $match: {
          user: req.user._id,
        },
      });
    }

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { "userData.name": { $regex: search, $options: "i" } },
            { "productData.name": { $regex: search, $options: "i" } },
          ],
        },
      });
    }

    pipeline.push(
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$userData" },
          items: {
            $push: {
              product: "$productData",
              quantity: "$items.quantity",
            },
          },
          totalAmount: { $first: "$totalAmount" },
          status: { $first: "$status" },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limitNum }],
          totalCount: [{ $count: "count" }],
        },
      },
    );

    const result = await Order.aggregate(pipeline);

    res.json({
      success: true,
      orders: result[0]?.data || [],
      total: result[0]?.totalCount[0]?.count || 0,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("user", "name email phone")
      .populate("items.product", "name price image images imageUrl sku");

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
    const { search = "", sort = "", page = 1, limit = 5 } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const matchStage = {};

    if (sort) {
      matchStage.status = sort;
    }

    const pipeline = [
      { $match: matchStage },

      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },

      { $unwind: { path: "$items", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productData",
        },
      },
      { $unwind: { path: "$productData", preserveNullAndEmptyArrays: true } },

      ...(search
        ? [
            {
              $match: {
                $or: [
                  { "userData.name": { $regex: search, $options: "i" } },
                  { "productData.name": { $regex: search, $options: "i" } },
                ],
              },
            },
          ]
        : []),

      { $sort: { createdAt: -1 } },

      {
        $group: {
          _id: "$_id",
          user: { $first: "$userData" },
          items: {
            $push: {
              product: "$productData",
              quantity: "$items.quantity",
            },
          },
          totalAmount: { $first: "$totalAmount" },
          status: { $first: "$status" },
          createdAt: { $first: "$createdAt" },
        },
      },

      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limitNum },
          ],
          totalCount: [
            { $count: "count" },
          ],
        },
      },
    ];

    const result = await Order.aggregate(pipeline);

    const orders = result[0]?.data || [];
    const total = result[0]?.totalCount[0]?.count || 0;

    res.json({
      success: true,
      orders,
      total,
    });
  } catch (error) {
    console.error("Aggregation error:", error);
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
