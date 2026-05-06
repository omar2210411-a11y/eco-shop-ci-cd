
const express = require("express");
const router = express.Router();

// Simple admin dashboard endpoint
router.get("/dashboard", (req, res) => {
  res.json({ 
    message: "Admin dashboard",
    stats: { 
      totalProducts: 8, 
      totalUsers: 2,
      totalOrders: 0
    }
  });
});

// Admin products endpoint (return empty array for now)
router.get("/products", (req, res) => {
  res.json({ 
    products: [],
    message: "Admin products endpoint - use /api/products for product management"
  });
});

module.exports = router;
