import express from "express";
import { placeOrder, getMyOrders, getAllOrders, updateOrderStatus } from "../controllers/order.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/place", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);

router.get("/", protect, authorizeRoles("admin"), getAllOrders);
router.put("/:id", protect, authorizeRoles("admin"), updateOrderStatus);

export default router;



