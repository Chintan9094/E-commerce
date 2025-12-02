import { Product } from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";

export const createProduct = async (req, res, next) => {
    try {
        const { name, price, description, category, seller } = req.body;

        if(!name || !price || !description || !category){
            return next(new AppError("Required fields missing",400));
        }

        const imageUrl = req.file ? req.file.path: "";

        const product = await Product.create({
            name,
            price,
            description,
            category,  
            image: imageUrl,
            seller: req.user._id
        });

        res.json({
            success: true,
            message: "Product created!",
            product
        });
        
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate("seller", "name email");

        if(!products){
            return next(new AppError("Products not found",404));
        }
        
        res.json({
            success: true,
            products,
        });

    } catch (error) {
        next(error);
    }
};

export const getProductsById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if(!product){
            return next(new AppError("Product not found",404));
        }

        res.json({
            success: true,
            product
        });
        
    } catch (error) {
        next(error);
    }
};

export const getProductByQuery = async (req, res, next) => {
    try {
        const { search, category, sort, page = 1, limit = 5} = req.query;

        const queryObj = {};

        if(search) queryObj.$text = {$search: search};
        if(category) queryObj.category = category;
        
        let mongoQuery = Product.find(queryObj);

        if(sort){
            const sortBy = sort.split(",").join(" ");
            mongoQuery = mongoQuery.sort(sortBy);
        } else {
            mongoQuery = mongoQuery.sort("-createdAt");
        }

        const skip = (page - 1) * limit;
        mongoQuery = mongoQuery.skip(skip).limit(Number(limit));

        const products = await mongoQuery;
        const total = await Product.countDocuments(queryObj);

        res.json({
            success: true,
            total,
            page: Number(page),
            limit: Number(limit),
            products
        });
        
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {name, price, description, category} = req.body;

        if(!name && !price && !description  && !category){
            return next(new AppError("Atleast one filed is required",400));
        }

        const updateData = {};
        if(name) updateData.name = name;
        if(price) updateData.price = price;
        if(description) updateData.description = description;
        if(category) updateData.category = category;
        
        const product = await Product.findByIdAndUpdate(id, updateData, {new: true});

        if(!product){
            return next(new AppError("Product not found!",404));
        }

        if(product.seller.toString() !== req.user._id.toString()){
            return next(new AppError("Not your product",403));
        }

         if (req.file) {
            product.image = req.file.path; 
        }
        
        res.json({
            success: true,
            message: "Product Updated!",
            product
        });
        
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return next(new AppError("Product not found",404));
        }

        res.json({
            success: true,
            message: "Product deleted Successfully!",
            name: Product?.name
        });
        
    } catch (error) {
        if(error.message === "CastError"){
            return next(new AppError("Invalid ID formate",404));
        }
        next(error);
    }
};             