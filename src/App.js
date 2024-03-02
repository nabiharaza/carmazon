import React, { useState, useEffect } from 'react';
// import AppRoutes from './router/router'; // Import the routes
import { Grid, Pagination } from '@mui/material';
import { fetchZipCodeCoordinates } from './service/service';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import LeftFilterNavbar from './components/LeftFilterNavbar/LeftFilterNavbar';
import './components/Navbar/Navbar.css';
import './App.css';
import Card from "./components/Card/Card"; // Adjust this import to match your component name
import DetailsPage from './pages/DetailsPage';
function App() {
    const [jsonData, setJsonData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // Adjust the number of items per page as needed
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        make: [],
        model: '',
        mileage: '',
        condition: '',
        state: '',
        city: '',
        zipCode: ''
    });
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        fetchData();
    }, [currentPage, filters]);

    const handleApplyFilters = async (localFilters) => {
        if (localFilters.zipCode) {
            const zipCodeCoordinates = await fetchZipCodeCoordinates(localFilters.zipCode);
            if (zipCodeCoordinates) {
                setLatitude(zipCodeCoordinates.latitude);
                setLongitude(zipCodeCoordinates.longitude);
            }
        }
        setFilters(localFilters);
        setCurrentPage(1);
    };

    const fetchData = async (page) => {
        let queryString = new URLSearchParams({
            ...(filters.make.length > 0 && {make: filters.make.join('&make=')}),
            ...(filters.model && {model: filters.model}),
            ...(filters.mileage && {mileage: filters.mileage}),
            ...(filters.condition && {condition: filters.condition}),
            ...(filters.state && {state: filters.state}),
            ...(filters.city && {city: filters.city}),
            page: page || 1 // Use the provided page or default to page 1
        }).toString();

        if (latitude !== null && longitude !== null) {
            queryString += `&latitude=${latitude}&longitude=${longitude}`;
        }

        const apiUrl = `https://auto.dev/api/listings?${queryString}`;
        console.log('API URL:', apiUrl);

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            // Write fetched JSON data to local temporary file
            localStorage.setItem('jsonData', JSON.stringify(data.records));
            console.log('Fetched JSON Data:', data);
            setJsonData(data.records || []);
            setTotalPages(Math.ceil(data.totalCount / itemsPerPage));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChangePage = (event, page) => {
        fetchData(page);
    };

return (
  <Router>
    <div className="App">
      <Navbar />
      <div className="main-content">
        <LeftFilterNavbar onApplyFilters={handleApplyFilters} />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1>Hello, Car Lovers!</h1>
                  <Grid container spacing={3} justifyContent="center">
                    {jsonData.map((record, index) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        {/* Use Link component to handle navigation */}
                        <Link to={`/details/${record.vin}`}>
                          <Card data={record} />
                        </Link>
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
              }
            />
            <Route path="/details/:vin" element={<DetailsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  </Router>
);
}

export default App;