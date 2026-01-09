import express from "express";
import { registerUser, loginUser, logoutUser, getMyProfile, updateProfile } from "../controllers/auth.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);
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