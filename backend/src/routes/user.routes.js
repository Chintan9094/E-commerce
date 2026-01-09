import express from "express";
import { getMyProfile, updateProfile } from "../controllers/user.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateProfile);

router.get("/admin-area", protect, authorizeRoles("admin"),
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome to admin area",
            user: req.user,
        });
    }
);

export default router;