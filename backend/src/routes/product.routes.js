import express from "express";
import { createProduct, getProducts, getProductsById, updateProduct, deleteProduct, getProductByQuery, getMyProducts, getTopProducts } from "../controllers/product.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/get", getProductByQuery);
router.get("/my", protect, authorizeRoles("seller", "admin"), getMyProducts);
router.get("/:id", getProductsById);

router.post("/", upload.single("image"), protect, authorizeRoles("admin", "seller"), createProduct);
router.put("/:id", protect, authorizeRoles("admin", "seller"), upload.single("image"), updateProduct);
router.delete("/:id", protect, authorizeRoles("admin", "seller"), deleteProduct);
router.get("/seller/top-products", protect, authorizeRoles("seller", "admin"), getTopProducts);

export default router;