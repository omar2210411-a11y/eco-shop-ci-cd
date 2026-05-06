const express = require('express');
const router = express.Router();

const products = [
  {
    _id: "1",
    name: "Bamboo Toothbrush",
    price: 5.99,
    description: "Eco-friendly bamboo toothbrush with biodegradable bristles",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400",
    category: "Home",
    stock: 100,
    sustainabilityScore: 95,
    environmentalImpact: {
      materials: "Sustainable bamboo",
      packaging: "Compostable box",
      carbonFootprint: "0.05 kg CO2"
    }
  },
  {
    _id: "2",
    name: "Reusable Shopping Bags",
    price: 12.99,
    description: "Set of 3 machine-washable cotton shopping bags",
    image: "https://images.unsplash.com/photo-1534432586043-ead5b99229fb?w=400",
    category: "Home",
    stock: 50,
    sustainabilityScore: 90,
    environmentalImpact: {
      materials: "Organic cotton",
      packaging: "Recycled paper",
      carbonFootprint: "0.3 kg CO2"
    }
  },
  {
    _id: "3",
    name: "Solar Power Bank",
    price: 39.99,
    description: "10000mAh solar power bank with dual USB ports",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400",
    category: "Electronics",
    stock: 30,
    sustainabilityScore: 85,
    environmentalImpact: {
      materials: "Recycled plastic",
      packaging: "Recyclable cardboard",
      carbonFootprint: "2.5 kg CO2"
    }
  },
  {
    _id: "4",
    name: "Bee Wax Wraps",
    price: 18.99,
    description: "Set of 3 reusable food wraps made from organic beeswax",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400",
    category: "Home",
    stock: 75,
    sustainabilityScore: 92,
    environmentalImpact: {
      materials: "Organic cotton, beeswax",
      packaging: "Recycled paper",
      carbonFootprint: "0.1 kg CO2"
    }
  },
  {
    _id: "5",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    description: "Fair-trade certified organic cotton t-shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "Clothing",
    stock: 40,
    sustainabilityScore: 88,
    environmentalImpact: {
      materials: "100% organic cotton",
      packaging: "Recycled bag",
      carbonFootprint: "1.2 kg CO2"
    }
  },
  {
    _id: "6",
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    description: "Vacuum insulated 20oz water bottle",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    category: "Home",
    stock: 60,
    sustainabilityScore: 93,
    environmentalImpact: {
      materials: "Stainless steel",
      packaging: "Cardboard box",
      carbonFootprint: "0.8 kg CO2"
    }
  },
  {
    _id: "7",
    name: "Compostable Phone Case",
    price: 34.99,
    description: "Plant-based compostable phone case",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
    category: "Electronics",
    stock: 45,
    sustainabilityScore: 96,
    environmentalImpact: {
      materials: "Plant-based polymers",
      packaging: "Seed paper box",
      carbonFootprint: "0.4 kg CO2"
    }
  },
  {
    _id: "8",
    name: "LED Grow Light",
    price: 49.99,
    description: "Energy-efficient LED grow light for indoor plants",
    image: "https://images.unsplash.com/photo-1574940375395-9b5d84a8629e?w=400",
    category: "Home",
    stock: 25,
    sustainabilityScore: 82,
    environmentalImpact: {
      materials: "Recycled aluminum",
      packaging: "Recycled cardboard",
      carbonFootprint: "5.0 kg CO2"
    }
  }
];

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

router.post('/', (req, res) => {
  const newProduct = {
    _id: String(products.length + 1),
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

module.exports = router;