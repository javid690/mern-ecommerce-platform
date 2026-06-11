require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../models/Product");

const products = [
  {
    title: "Luxury Matte Lipstick Set",
    description: "Long lasting velvet matte lipstick collection.",
    price: 35,
    oldPrice: 50,
    discountPercentage: 30,
    rating: {
      stars: 4.9,
      reviewsCount: 420,
    },
    category: "Beauty Products",
    colors: ["Red", "Pink", "Nude"],
    stockStatus: "In Stock",
    city: "Karachi",
    images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa"],
  },
  {
    title: "Premium Hydrating Serum",
    description: "Vitamin C skin brightening serum.",
    price: 55,
    oldPrice: 75,
    discountPercentage: 27,
    rating: {
      stars: 4.8,
      reviewsCount: 310,
    },
    category: "Skincare",
    colors: ["Gold"],
    stockStatus: "In Stock",
    city: "Lahore",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be"],
  },
  {
    title: "Organic Face Wash",
    description: "Gentle cleanser for glowing skin.",
    price: 20,
    oldPrice: 28,
    discountPercentage: 20,
    rating: {
      stars: 4.7,
      reviewsCount: 210,
    },
    category: "Face Care",
    colors: ["White"],
    stockStatus: "In Stock",
    city: "Islamabad",
    images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883"],
  },
  {
    title: "Luxury Foundation",
    description: "Full coverage liquid foundation.",
    price: 42,
    oldPrice: 60,
    discountPercentage: 30,
    rating: {
      stars: 4.9,
      reviewsCount: 540,
    },
    category: "Eye Makeup",
    colors: ["Ivory", "Beige", "Honey"],
    stockStatus: "In Stock",
    city: "Karachi",
    images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"],
  },
  {
    title: "Rose Water Toner",
    description: "Refreshing daily facial toner.",
    price: 18,
    oldPrice: 25,
    discountPercentage: 15,
    rating: {
      stars: 4.6,
      reviewsCount: 180,
    },
    category: "Perfumes",
    colors: ["Pink"],
    stockStatus: "In Stock",
    city: "Lahore",
    images: ["https://images.unsplash.com/photo-1617897903246-719242758050"],
  },
  {
    title: "Waterproof Mascara",
    description: "Smudge proof long-lasting volume mascara.",
    price: 25,
    oldPrice: 35,
    discountPercentage: 28,
    rating: {
      stars: 4.8,
      reviewsCount: 275,
    },
    category: "Beauty Tools",
    colors: ["Black"],
    stockStatus: "In Stock",
    city: "Karachi",
    images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"],
  },
  {
    title: "Luxury Perfume For Women",
    description: "Elegant floral fragrance with lasting freshness.",
    price: 65,
    oldPrice: 90,
    discountPercentage: 25,
    rating: {
      stars: 4.9,
      reviewsCount: 630,
    },
    category: "Cream",
    colors: ["Rose Gold"],
    stockStatus: "In Stock",
    city: "Lahore",
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601"],
  },
  {
    title: "Aloe Vera Moisturizer",
    description: "Deep hydration cream for healthy glowing skin.",
    price: 22,
    oldPrice: 30,
    discountPercentage: 18,
    rating: {
      stars: 4.7,
      reviewsCount: 340,
    },
    category: "Beauty Products",
    colors: ["Green"],
    stockStatus: "In Stock",
    city: "Islamabad",
    images: ["https://images.unsplash.com/photo-1571781926291-c477ebfd024b"],
  },
  {
    title: "Professional Makeup Brush Set",
    description: "Premium quality brushes for flawless makeup.",
    price: 48,
    oldPrice: 65,
    discountPercentage: 26,
    rating: {
      stars: 4.8,
      reviewsCount: 490,
    },
    category: "Beauty Products",
    colors: ["Black", "Gold"],
    stockStatus: "In Stock",
    city: "Karachi",
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348"],
  },
  {
    title: "Luxury Eyeshadow Palette",
    description: "Highly pigmented shades for stunning looks.",
    price: 38,
    oldPrice: 55,
    discountPercentage: 31,
    rating: {
      stars: 4.9,
      reviewsCount: 580,
    },
    category: "Beauty Products",
    colors: ["Multi Color"],
    stockStatus: "In Stock",
    city: "Lahore",
    images: ["https://images.unsplash.com/photo-1512496015851-a90fb38ba796"],
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products Seeded Successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
