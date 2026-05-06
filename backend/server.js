
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/admin', require('./routes/admin'));

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log('\n📝 Demo Accounts:');
  console.log('  Admin:    admin@ecoshop.com / admin123');
  console.log('  Company:  company@ecoshop.com / admin123');
});

module.exports = app;
