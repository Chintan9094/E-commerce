import express from "express";
import { placeOrder, getMyOrders, getAllOrders, updateOrderStatus, getOrderById, getSellerEarnings } from "../controllers/order.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/place", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

router.get("/", protect, authorizeRoles("admin"), getAllOrders);
router.put("/:id", protect, authorizeRoles("admin", "seller"), updateOrderStatus);
router.get("/seller/earnings", protect, authorizeRoles("admin", "seller"), getSellerEarnings);

export default router;