const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    const product = new Product({
      name,
      price,
      description,
      category,
      stock
    });

    await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { keyword, category } = req.query;

    let query = {};

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query);

    res.json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};