const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ShortUrl = require('./models/shortUrl');
const path = require('path');

const app = express();

// Configure CORS to allow your React frontend
app.use(cors({
  origin: 'http://localhost:5173', // Update this to Vite's port
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/urlShortener')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes for creating and retrieving short URLs
app.use('/api', require('./routes/url'));

// Handle shortened URLs
app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  
  if (shortUrl == null) {
    return res.status(404).json({ message: 'Short URL not found' });
  }
  
  shortUrl.clicks++;
  await shortUrl.save();

  // Redirect to the original URL
  res.redirect(shortUrl.full);
});

// Serve static files from Vite's build (for production)
app.use(express.static(path.join(__dirname, '../client/dist')));

// Fallback to index.html for any other route (React SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
