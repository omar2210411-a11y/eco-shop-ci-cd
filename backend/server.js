const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

/* -------------------- CORS -------------------- */

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

/* -------------------- Middleware -------------------- */

app.use(express.json());

/* -------------------- Routes -------------------- */

app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/admin', require('./routes/admin'));

/* -------------------- Test Route -------------------- */

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

/* -------------------- Server -------------------- */

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Server URL active`);
  console.log('\n📝 Demo Accounts:');
  console.log('  Admin:    admin@ecoshop.com / admin123');
  console.log('  Company:  company@ecoshop.com / admin123');
});

module.exports = app;