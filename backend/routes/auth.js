
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "eco_shop_secret_key_2024";

const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@ecoshop.com",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin"
  },
  {
    id: "2",
    name: "Green Company",
    email: "company@ecoshop.com",
    password: bcrypt.hashSync("admin123", 10),
    role: "company",
    companyName: "EcoGoods Inc."
  }
];

router.post("/register", (req, res) => {
  try {
    const { name, email, password, role, companyName } = req.body;
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      role: role || "user",
      companyName: companyName || null
    };
    
    users.push(newUser);
    
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
