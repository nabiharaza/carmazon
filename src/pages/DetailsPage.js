// DetailsPage.js

import React, { useEffect, useState } from 'react';

function DetailsPage({ match }) {
    const [record, setRecord] = useState(null);

    useEffect(() => {
        // Load data from localStorage
        const storedData = localStorage.getItem('jsonData');
        if (storedData) {
            const jsonData = JSON.parse(storedData);
            // Find the record matching the VIN number from the URL parameter
            const matchedRecord = jsonData.find(item => item.vin === match.params.vin);
            if (matchedRecord) {
                setRecord(matchedRecord);
            }
        }
    }, [match.params.vin]);

    if (!record) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Details of Car with VIN: {record.vin}</h2>
            <div>
                <p>Make: {record.make}</p>
                <p>Model: {record.model}</p>
                {/* Add more details as needed */}
            </div>
        </div>
    );
}

export default DetailsPage;
