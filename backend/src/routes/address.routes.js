import express from "express";
import { addAddress, getAddresses, deleteAddress, updateAddress } from "../controllers/address.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, addAddress);
router.get("/", protect, getAddresses);
router.delete("/:id", protect, deleteAddress);
router.put("/:id", protect, updateAddress);

export default router;
