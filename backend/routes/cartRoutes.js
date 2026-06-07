const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart
} = require("../controllers/cartController");

router.post("/add", addToCart);

router.get("/:userId", getCart);

router.put("/update", updateCart);

router.delete("/remove", removeFromCart);

module.exports = router;