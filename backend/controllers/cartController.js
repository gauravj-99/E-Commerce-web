const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const userId = (req.user && req.user._id) || req.body.userId;
    const { productId, quantity } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [
          {
            product: productId,
            quantity: quantity || 1
          }
        ]
      });
    } else {
      const itemIndex = cart.products.findIndex(
        item => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.products[itemIndex].quantity = (cart.products[itemIndex].quantity || 0) + (quantity || 1);
      } else {
        cart.products.push({ product: productId, quantity: quantity || 1 });
      }
    }

    await cart.save();

    res.json({ message: "Cart updated", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.params.userId || (req.user && req.user._id);

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const cart = await Cart.findOne({ user: userId }).populate("products.product");

    if (!cart) {
      return res.json({ message: "Cart is empty", products: [] });
    }

    res.json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = (req.user && req.user._id) || req.body.userId;

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
    const { productId } = req.body;
    const userId = (req.user && req.user._id) || req.body.userId;

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