const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const quoteRoutes = require('./routes/quoteRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use('/api/quotes', quoteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
