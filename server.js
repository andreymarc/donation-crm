const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Apply CORS middleware with custom origin logic
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin, such as curl or mobile apps
      if (!origin) return callback(null, true);
      
      // Define allowed origins
      if (['http://localhost:3000', 'http://mydomain.com'].indexOf(origin) === -1) {
        var msg = "The CORS policy for this site does not allow access from the specified origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection string from environment variable
const uri = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
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

const Donation = mongoose.model('Donation', donationSchema);

// Define a simple route for root URL
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
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
