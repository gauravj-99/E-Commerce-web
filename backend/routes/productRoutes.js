const express = require("express");
const router = express.Router();
const { addProduct, getProducts } = require("../controllers/productController");

// Add Product
router.post("/add", addProduct);

// Get All Products ✅
router.get("/", getProducts);

module.exports = router;