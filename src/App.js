import React from 'react';
import Donations from './Donations'; // Import the Donations component
import AddDonation from './AddDonation';

function App() {
    return (
        <div className="App">
            <h1> Donation CRM</h1>
            <AddDonation />
            <Donations />
        </div>
    );
}

export default App;

