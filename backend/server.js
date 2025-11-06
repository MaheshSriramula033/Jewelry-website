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
    console.log('✅ Connected to MongoDB successfully');
    console.log('📊 Database:', mongoose.connection.name);
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err.message);
  });

// ✅ CORRECT: Public folder is inside backend
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// Routes for different pages
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/collection", (req, res) => {
  res.sendFile(path.join(publicPath, "collection.html"));
});

// API Routes
app.get("/api/base-price", (req, res) => {
  res.json({ basePrice: 5000 });
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    console.log(`📦 Found ${products.length} products`); // Debug log
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "Server is running", 
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});