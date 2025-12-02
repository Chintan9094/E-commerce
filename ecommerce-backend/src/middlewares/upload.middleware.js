import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "ecommerce_products",
        upload_preset: "ecommerce_unsigned",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    }
});

export const upload = multer({ storage });
