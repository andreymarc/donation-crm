import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/donations')
      .then(response => {
        setDonations(response.data);
      })
      .catch(error => {
        console.error('Error fetching donations:', error);
        setError(error.message);
      });
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Donations</h4>
        {error && <div className="alert alert-danger">Failed to load donations: {error}</div>}
        <ul className="list-group">
          {donations.map(donation => (
            <li key={donation._id} className="list-group-item">
              <strong>{donation.donorName}</strong> donated <strong>${donation.amount}</strong> via {donation.paymentMethod}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Donations;
