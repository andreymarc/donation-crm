import React from 'react';
import Donations from './Donations';
import AddDonation from './AddDonation';

function App() {
    return (
        <div className="App">
            <div className="container mt-5">
                <h1 className="text-center mb-4">Donation CRM</h1>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <AddDonation />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 offset-md-2 mt-4">
                        <Donations />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
