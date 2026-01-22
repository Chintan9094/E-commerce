import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      text: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    stock: {
      type: Number,
      default: 0,
    },

    sales: {
      type: Number,
      default: 0,
    },

    sku: {
      type: String,
      unique: true,
    },

    image: {
      type: String,
      default: "",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reviews: [reviewSchema],

    averageRating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

productSchema.index({
  name: "text",
  description: "text",
  category: "text",
});

export const Product = mongoose.model("Product", productSchema);
