import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import LeftFilterNavbar from './components/LeftFilterNavbar/LeftFilterNavbar';
import './components/Navbar/Navbar.css';
import './App.css';
import Card from "./components/Card/Card";

function App() {
  const [filters, setFilters] = useState({ make: '', model: ''});
  const [jsonData, setJsonData] = useState([]);

  // Function to handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Function to handle filter application
  const handleApplyFilters = () => {
    // Fetch data based on filters
    fetchData();
  };

  const fetchData = async () => {
    // Construct URL with filters
    const queryString = new URLSearchParams(filters).toString();
    const apiUrl = `https://auto.dev/api/listings?${queryString}`;
    console.log('API URL:', apiUrl);
    try {
      // Make API request with filters
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('Fetched JSON Data:', data);
      setJsonData(data.records || []); // Ensure jsonData is an array
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <LeftFilterNavbar
          filters={filters}
          onFilterChange={handleFilterChange}
          onApplyFilters={handleApplyFilters}
        />
        <div className="content">
          <h1>Hello, Car Lovers!</h1>
          {/* Display applied filters */}
          <p>Applied Filters: {JSON.stringify(filters)}</p>
          <div className="card-container">
            {Array.isArray(jsonData) && jsonData.map((record, index) => (
              <Card key={index} data={record} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
