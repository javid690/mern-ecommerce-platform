const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");

const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice, paymentMethod } = req.body;

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
      paymentMethod,
    });

    await sendEmail(
      "New Ecommerce Order",
      `
      <h2>New Order Received</h2>

      <p><strong>Customer:</strong> ${req.user.name}</p>

      <p><strong>Email:</strong> ${req.user.email}</p>

      <p><strong>Total Price:</strong> $${totalPrice}</p>

      <h3>Products Ordered</h3>

      <ul>
        ${orderItems
          .map((item) => `<li>${item.title} × ${item.quantity}</li>`)
          .join("")}
      </ul>
      `,
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
};
