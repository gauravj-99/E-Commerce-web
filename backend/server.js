require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Atlas Connected ✅"))
.catch(err => console.log(err));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("API Running");
});

const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});