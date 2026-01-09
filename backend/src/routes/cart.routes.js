import express from "express";
import {
  addToCart,
  removeFromCart,
  getMyCart
} from "../controllers/cart.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.delete("/remove", protect, removeFromCart);
router.get("/cart", protect, getMyCart);

export default router;
                                                                                                                                      