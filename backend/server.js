// server.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const Product = require('./models/Product'); 

const app = express();
app.use(cors());
app.use(express.json()); 


console.log('MongoDB URI:', process.env.MONGODB_URI);

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MongoDB URI is missing!');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    console.log(' Database:', mongoose.connection.name);
  })
  .catch((err) => {
    console.error(' Error connecting to MongoDB:', err.message);
  });
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});


// API to get base price
app.get("/api/base-price", (req, res) => {
  res.json({ basePrice: 5000 });
});

// API to get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// API to get single product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// API to update base price
app.get("/api/update-price/:value", (req, res) => {
  const basePrice = parseFloat(req.params.value);
  res.json({ message: "Base price updated successfully", basePrice });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "Server is running", 
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString()
  });
});

// Serve static files
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});