const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", productController.getProducts);

router.post(
  "/add",
  authMiddleware.protect,
  authMiddleware.admin,
  productController.addProduct
);

module.exports = router;
 
``