const express = require("express");
const router = express.Router();
const { addProduct, getProducts } = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");

router.post("/add", protect, admin, addProduct);

router.get("/", getProducts);
module.exports = router;