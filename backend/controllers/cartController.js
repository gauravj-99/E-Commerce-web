const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = new Cart({
      user: userId,
      products: [
        {
          product: productId,
          quantity: quantity
        }
      ]
    });

    await cart.save();

    res.json({
      message: "Cart created successfully",
      cart
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    const cart = await Cart.findOne({ user: userId })
      .populate("products.product");

    if (!cart) {
      return res.json({ message: "Cart is empty" });
    }

    res.json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.products.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.products[itemIndex].quantity = quantity;
    }

    await cart.save();

    res.json({
      message: "Cart updated",
      cart
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();

    res.json({
      message: "Item removed",
      cart
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};