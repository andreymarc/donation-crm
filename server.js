// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator'); // Imported express-validator

// Import Routes
const authRoutes = require('./routes/auth');
const donationRoutes = require('./routes/donations'); // Ensure this is lowercase if the file is named `donations.js`

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongoose connected successfully'))
  .catch(err => console.error('Mongoose connection error:', err));

// Define Donation Schema and Model
const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// Ensure the Donation model is only compiled once
const Donation = mongoose.models.Donation || mongoose.model('Donation', donationSchema);

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/donations', donationRoutes); // Donation routes

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Donation CRM API');
});

// GET route to Fetch Donations
app.get('/donations', async (req, res) => {
  try {
    const donations = await Donation.find(); // Use Mongoose to fetch donations
    res.json(donations);
  } catch (err) {
    console.error('Error fetching donations:', err);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// POST route to create a new donation with validation
app.post('/donations',
  [
    check('donorName', 'Donor name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('amount', 'Amount must be a number greater than 0').isFloat({ gt: 0 }),
    check('paymentMethod', 'Payment method is required').not().isEmpty(),
  ],
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { donorName, email, amount, paymentMethod } = req.body;

    try {
      const newDonation = new Donation({
        donorName,
        email,
        amount,
        paymentMethod,
        date: new Date()
      });
      await newDonation.save();
      res.status(201).json(newDonation);
    } catch (err) {
      console.error('Error saving donation:', err);
      res.status(500).json({ error: 'Failed to save donation' });
    }
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
