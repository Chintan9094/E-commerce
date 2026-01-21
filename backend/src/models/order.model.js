import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        address: {
            name: String,
            phone: String,
            address: String,
            city: String,
            state: String,
            pincode: String,
        },

        subtotal: Number,
        shipping: Number,
        tax: Number,

        totalAmount: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["pending", "shipped", "delivered", "cancelled"],
            default: "pending"
        },
        statusHistory: [
    {
      status: String,
      date: { type: Date, default: Date.now },
    },
  ],
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);