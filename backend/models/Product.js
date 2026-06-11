const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    oldPrice: Number,

    discountPercentage: Number,

    rating: {
      stars: {
        type: Number,
        default: 5,
      },

      reviewsCount: {
        type: Number,
        default: 0,
      },
    },

    category: {
      type: String,
      default: "Beauty Products",
    },

    colors: [String],

    stockStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      default: "In Stock",
    },

    city: String,

    images: [String],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
