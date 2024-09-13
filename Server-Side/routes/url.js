const express = require('express');
const ShortUrl = require('../models/shortUrl');
const router = express.Router();

// Get all shortened URLs
router.get('/shortUrls', async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.json(shortUrls);
});

// Create a new shortened URL
router.post('/shortUrls', async (req, res) => {
    try {
      const { fullUrl } = req.body; // Get the full URL from the request body
      const shortUrl = await ShortUrl.create({ full: fullUrl }); // Create the short URL
      
      // Return the details of the newly created short URL
      res.status(201).json({
        message: "URL shortened",
        fullUrl: shortUrl.full,
        shortUrl: `http://localhost:5000/${shortUrl.short}` // Include the shortened URL
      });
    } catch (error) {
      console.error('Error creating short URL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Redirect to full URL
router.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (!shortUrl) return res.sendStatus(404);

  shortUrl.clicks++;
  await shortUrl.save();
  res.redirect(shortUrl.full);
});

module.exports = router;
