const Order = require("../models/order");
const Cart = require("../models/Cart");

exports.placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    for (let item of cart.products) {
      const product = item.product;
      totalAmount += item.quantity * 1000; // simple price logic (we improve later)
    }

    const order = new Order({
      user: userId,
      products: cart.products,
      totalAmount
    });

    await order.save();

    await Cart.findOneAndDelete({ user: userId });

    res.json({
      message: "Order placed successfully ✅",
      order
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId })
      .populate("products.product");

    res.json(orders);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
``
