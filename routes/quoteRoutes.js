const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');

router.post('/', async (req, res) => {
    const { quoteText, author } = req.body;
    try {
      const newQuote = new Quote({ quoteText, author });
      const savedQuote = await newQuote.save();
      res.status(201).json(savedQuote);
    } catch (error) {
      res.status(500).json({ message: 'Failed to add quote' });
    }
  });
  //this code have error i will fix in a bit

router.get('/', async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve quotes' });
  }
});

router.get('/random', async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomQuote = await Quote.findOne().skip(random);
    res.json(randomQuote);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve random quote' });
  }
});

module.exports = router;
