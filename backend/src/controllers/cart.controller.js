import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);

    if (!product) return next(new AppError("Product not found", 404));

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
    } else {
      const item = cart.items.find(
        (i) => i.product.toString() === productId
      );

      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    res.json({
      success: true,
      message: "Added to cart",
      cart,
    });
  } catch (error) {
    next(error);
  }
};


export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product", "name price image stock");

    if (!cart) return next(new AppError("Cart not found", 404));

    const itemExists = cart.items.some(
      (i) => i.product.toString() === productId
    );

    if (!itemExists) {
      return next(new AppError("Item not found in cart", 404));
    }

    cart.items = cart.items.filter(
      (i) => i.product.toString() !== productId
    );

    await cart.save();

    res.json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    next(error);
  }
};


export const getMyCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name price image stock");

        if(!cart) return res.json({
            success: true,
            items: []
        });

        res.json({
            success: true,
            cart
        });
        
    } catch (error) {
        next(error);
    }
};

export const updateCartQuantity = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart) return next(new AppError("Cart not found", 404));

    const item = cart.items.find(
      (i) => i.product._id.toString() === productId
    );

    if (!item) return next(new AppError("Item not found", 404));

    if (quantity > item.product.stock) {
      return next(
        new AppError(`Only ${item.product.stock} items available in stock`, 400)
      );
    }

    item.quantity = quantity;
    await cart.save();

    res.json({
      success: true,
      message: "Quantity updated",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

