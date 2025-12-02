import { Product } from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";

export const addReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if(!product){
            return next(new AppError("Product not found",404));
        }

        const existingReview = product.reviews.find(
            (rev) => rev.user.toString() === req.user._id.toString()
        );

        if(existingReview){
            existingReview.rating = rating;
            existingReview.comment = comment;
        } else {
            product.reviews.push({
                user: req.user._id,
                name: req.user.name,
                rating,
                comment
            });
        }
        product.numReviews = product.reviews.length;
        
        if(product.reviews.length > 0){
            product.averageRating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
        } else{
            product.averageRating = 0;
        }

        await product.save();

        res.json({
            success: true,
            message: "Review submitted",
            product
        });
        
    } catch (error) {
        next(error);
    }
};

export const deleteReview = async (req, res, next) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if(!product){
            return next(new AppError("Product not found",404));
        }

        product.reviews = product.reviews.filter(
            (r) => r.user.toString() !== req.user._id.toString()
        );

        product.numReviews = product.reviews.length;

        product.averageRating = product.numReviews === 0 ? 0 : product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.numReviews;

        await product.save();

        res.json({
            success: true,
            message: "Review deleted successfully"
        });
        
    } catch (error) {
        next(error);
    }
};

export const getProductReviews = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate("reviews.user", "name email");

        if(!product) return next(new AppError("Product not found",404));

        res.json({
            success: true,
            reviews: product.reviews
        });
        
    } catch (error) {
        next(error);
    }
};