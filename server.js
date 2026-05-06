const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/productDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
app.post("/products", async (req, res) => {
  try {
    res.status(201).json(await Product.create(req.body));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    res.json(
      await Product.findByIdAndUpdate(req.params.id, req.body,{ new: true })
    );
  } catch {
    res.status(400).json({ message: "Update failed" });
  }
});
app.get("/products", async (req, res) => {
  try {
    res.json(await Product.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));