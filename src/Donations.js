import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Donations = () => {
  const [donations, setDonations] = useState([]);

  // Fetch donations from the backend
  useEffect(() => {
    axios.get('http://localhost:3000/donations')
      .then(response => {
        setDonations(response.data);
      })
      .catch(error => {
        console.error('Error fetching donations:', error);
      });
  }, []);

  return (
    <div>
      <h1>Donations</h1>
      <ul>
        {donations.map(donation => (
          <li key={donation._id}>
            {donation.donorName} donated ${donation.amount} via {donation.paymentMethod}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Donations;
