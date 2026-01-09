import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  }
}, { _id: false });

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      text: true
    },
    price: {
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
      index: true
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
      default: 0
    },

    numReviews: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
