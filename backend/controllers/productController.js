const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const { search, city, color, minPrice, maxPrice, sort } = req.query;

    let query = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (city) {
      query.city = city;
    }

    if (color) {
      query.colors = color;
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    let products = Product.find(query);

    if (sort === "price_asc") {
      products = products.sort({ price: 1 });
    }

    if (sort === "price_desc") {
      products = products.sort({ price: -1 });
    }

    if (sort === "rating") {
      products = products.sort({
        "rating.stars": -1,
      });
    }

    products = await products;

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
};
