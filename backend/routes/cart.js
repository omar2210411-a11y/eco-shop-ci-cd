const express = require('express');
const router = express.Router();

const carts = [];

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  let cart = carts.find(c => c.userId === userId);
  if (!cart) {
    cart = { userId, items: [] };
    carts.push(cart);
  }
  res.json(cart);
});

router.post('/add', (req, res) => {
  const { userId, productId, quantity } = req.body;
  let cart = carts.find(c => c.userId === userId);
  if (!cart) {
    cart = { userId, items: [] };
    carts.push(cart);
  }
  
  const item = cart.items.find(i => i.productId === productId);
  if (item) {
    item.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }
  res.json(cart);
});

router.post('/remove', (req, res) => {
  const { userId, productId } = req.body;
  const cart = carts.find(c => c.userId === userId);
  if (cart) {
    cart.items = cart.items.filter(i => i.productId !== productId);
  }
  res.json(cart || { userId, items: [] });
});

router.post('/update', (req, res) => {
  const { userId, productId, quantity } = req.body;
  const cart = carts.find(c => c.userId === userId);
  if (cart) {
    const item = cart.items.find(i => i.productId === productId);
    if (item) {
      if (quantity <= 0) {
        cart.items = cart.items.filter(i => i.productId !== productId);
      } else {
        item.quantity = quantity;
      }
    }
  }
  res.json(cart || { userId, items: [] });
});

module.exports = router;