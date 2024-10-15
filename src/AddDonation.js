import React, { useState } from 'react';
import axios from 'axios';

const AddDonation = () => {
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/donations', {
        donorName,
        email,
        amount,
        paymentMethod,
      });
      setMessage('Donation added successfully!');
      setDonorName('');
      setEmail('');
      setAmount('');
      setPaymentMethod('');
    } catch (error) {
      setMessage('Failed to add donation');
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Add a Donation</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="donorName">Donor Name</label>
            <input
              type="text"
              className="form-control"
              id="donorName"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method</label>
            <select
              className="form-control"
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Add Donation</button>
        </form>
        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default AddDonation;
