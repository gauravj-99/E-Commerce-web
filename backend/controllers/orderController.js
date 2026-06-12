const Order = require("../models/order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.placeOrder = async (req, res) => {
  try {
    const userId = (req.user && req.user._id) || req.body.userId;

    const cart = await Cart.findOne({ user: userId }).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    for (let item of cart.products) {
      const product = item.product;
      const price = (product && product.price) || 0;
      totalAmount += item.quantity * price;
    }

    const order = new Order({
      user: userId,
      products: cart.products,
      totalAmount,
      status: "Delivery Pending"
    });

    await order.save();

    await Cart.findOneAndDelete({ user: userId });

    res.json({ message: "Order placed successfully ✅", order });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Place order immediately for a single product (bypass cart)
exports.placeOrderNow = async (req, res) => {
  try {
    const userId = (req.user && req.user._id) || req.body.userId;
    const { productId, quantity } = req.body;

    if (!productId) return res.status(400).json({ message: "ProductId required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const totalAmount = (product.price || 0) * (quantity || 1);

    const order = new Order({
      user: userId,
      products: [{ product: productId, quantity: quantity || 1 }],
      totalAmount,
      status: "Delivery Pending"
    });

    await order.save();

    res.json({ message: "Order placed successfully ✅", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId || (req.user && req.user._id);

    if (!userId) return res.status(400).json({ message: "User ID required" });

    const orders = await Order.find({ user: userId }).populate("products.product");

    res.json(orders || []);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
``
