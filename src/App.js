import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import LeftFilterNavbar from './components/LeftFilterNavbar/LeftFilterNavbar';
import './components/Navbar/Navbar.css';
import './App.css';
import Card from "./components/Card/Card"; // Change import to match your component name
import { Grid, Pagination } from '@mui/material';

function App() {
  const [filters, setFilters] = useState({ make: '', model: '', mileage: '', condition: '', state: '', city: '' });
  const [jsonData, setJsonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Adjust the number of items per page as needed
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage, filters]);

  // Function to handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Function to handle filter application
  const handleApplyFilters = () => {
    setCurrentPage(1); // Reset to first page when filters are applied
  };

  const fetchData = async (page) => {
    // Construct URL with filters and page parameter
    let queryString = new URLSearchParams({
      ...(filters.make && { make: filters.make }),
      ...(filters.model && { model: filters.model }),
      ...(filters.mileage && { mileage: filters.mileage }),
      ...(filters.condition && { condition: filters.condition }),
      ...(filters.state && { state: filters.state }),
      ...(filters.city && { city: filters.city }),
      page: page || 1 // Use the provided page or default to page 1
    }).toString();

    const apiUrl = `https://auto.dev/api/listings?${queryString}`;
    console.log('API URL:', apiUrl);

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('Fetched JSON Data:', data);
      setJsonData(data.records || []);
      // Calculate total pages based on totalCount from the response
      setTotalPages(Math.ceil(data.totalCount / itemsPerPage));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChangePage = (event, page) => {
    fetchData(page); // Fetch data for the selected page
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
          <p>Applied Filters: {JSON.stringify(filters)}</p>
          <Grid container spacing={3} justifyContent="center">
            {jsonData.map((record, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card data={record} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
