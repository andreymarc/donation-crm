import React, { useState } from 'react';
import axios from 'axios';

const AddDonation = () => {
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/donations', {
        donorName,
        email,
        amount,
        paymentMethod
      });
      console.log('Donation added:', response.data);
      alert('Donation successfully added');
    } catch (error) {
      console.error('Error adding donation:', error);
      alert('Failed to add donation');
    }
  };

  return (
    <div>
      <h2>Add a Donation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Donor Name:</label>
          <input
            type="text"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Payment Method:</label>
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Donation</button>
      </form>
    </div>
  );
};

export default AddDonation;
