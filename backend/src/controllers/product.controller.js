import { Product } from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";

export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      price,
      originalPrice,
      description,
      category,
      brand,
      stock,
      sku,
    } = req.body;

    if (!name || !price || !description || !category || !brand) {
      return next(new AppError("Required fields missing", 400));
    }

    const imageUrl = req.file ? req.file.path : "";

    const product = await Product.create({
      name,
      price,
      originalPrice,
      description,
      category,
      brand,
      stock,
      sku,
      image: imageUrl,
      seller: req.user._id,
    });

    res.json({
      success: true,
      message: "Product created!",
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("seller", "name email");

    if (!products) {
      return next(new AppError("Products not found", 404));
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

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductByQuery = async (req, res, next) => {
  try {
    const {
      search,
      category,
      brand,
      sort,
      price,
      rating,
      page = 1,
      limit = 5,
    } = req.query;

    const queryObj = {};

    if (search) queryObj.$text = { $search: search };
    if (category) {
      queryObj.category = { $regex: `^${category}$`, $options: "i" };
    }

    if (brand) {
      queryObj.brand = { $regex: `^${brand}$`, $options: "i" };
    }

    if (price) {
      const [min, max] = price.split("-");
      queryObj.price = {
        $gte: Number(min),
        $lte: Number(max),
      };
    }

    if (rating) {
      queryObj.averageRating = { $gte: Number(rating) };
    }

    let mongoQuery = Product.find(queryObj);

    if (sort) {
      let sortOption = {};

      switch (sort) {
        case "price-low":
          sortOption = { price: 1 };
          break;

        case "price-high":
          sortOption = { price: -1 };
          break;

        case "newest":
          sortOption = { createdAt: -1 };
          break;

        default:
          sortOption = { createdAt: -1 };
      }
      mongoQuery = mongoQuery.sort(sortOption);
    } else {
      mongoQuery = mongoQuery.sort({ createdAt: -1 });
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
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      name,
      price,
      description,
      category,
      originalPrice,
      brand,
      stock,
      sku,
    } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (price) updateData.price = price;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (originalPrice) updateData.originalPrice = originalPrice;
    if (brand) updateData.brand = brand;
    if (stock !== undefined) updateData.stock = stock;
    if (sku) updateData.sku = sku;

    if (req.file) {
      updateData.image = req.file.path;
    }

    if (Object.keys(updateData).length === 0) {
      return next(new AppError("Atleast one field is required", 400));
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!product) {
      return next(new AppError("Product not found!", 404));
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return next(new AppError("Not your product", 403));
    }

    res.json({
      success: true,
      message: "Product Updated!",
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.json({
      success: true,
      message: "Product deleted Successfully!",
      name: Product?.name,
    });
  } catch (error) {
    if (error.message === "CastError") {
      return next(new AppError("Invalid ID formate", 404));
    }
    next(error);
  }
};

export const getMyProducts = async (req, res, next) => {
  try {
    const { search, sort, page = 1, limit = 5 } = req.query;

    const queryObj = {
      seller: req.user._id.toString(),
    };

    if (search) {
      queryObj.$text = { $search: search };
    }

    let query = Product.find(queryObj);

    if (sort === "price-low") query = query.sort({ price: 1 });
    else if (sort === "price-high") query = query.sort({ price: -1 });
    else query = query.sort({ createdAt: -1 });

    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(Number(limit));
    const products = await query;
    const total = await Product.countDocuments(queryObj);

    res.json({
      success: true,
      products,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    next(error);
  }
};

export const getTopProducts = async (req, res, next) => {
  try {
    const sellerId = req.user._id;

    const products = await Product.find({ seller: sellerId })
      .sort({ sales: -1 })   
      .limit(5)             
      .select("name sales price stock");

    const formatted = products.map(p => ({
      name: p.name,
      sales: p.sales,
      revenue: p.sales * p.price,
      stock: p.stock,
    }));

    res.json({
      success: true,
      products: formatted,
    });
  } catch (error) {
    next(error);
  }
};