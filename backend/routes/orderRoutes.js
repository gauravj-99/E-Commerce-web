const express = require("express");
const router = express.Router();

const {
  placeOrder,
  placeOrderNow,
  getUserOrders
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/place", protect, placeOrder);
router.post("/place-now", protect, placeOrderNow);
router.get("/", protect, getUserOrders);
router.get("/:userId", protect, getUserOrders);

module.exports = router;