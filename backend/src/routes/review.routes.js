import express from "express";
import { addReview, deleteReview, getProductReviews } from "../controllers/review.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:id", protect, addReview);
router.delete("/:id", protect, deleteReview);
router.get("/:id", getProductReviews);

export default router;