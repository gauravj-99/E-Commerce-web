const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Get products
router.get("/", productController.getProducts);

// ✅ Add product (admin only)
router.post(
  "/add",
  authMiddleware.protect,
  authMiddleware.admin,
  productController.addProduct
);

module.exports = router;
 
``