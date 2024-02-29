import React, { useState } from 'react';
import './LeftFilterNavbar.css'; // You can create a separate CSS file for styling

const LeftNavbar = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const handleMakeChange = (event) => {
    setMake(event.target.value);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleFilterClick = () => {
    // Implement your filter logic here (e.g., API calls, state updates)
    console.log('Filter clicked!');
    console.log('Make:', make);
    console.log('Model:', model);
    console.log('Year:', year);
  };

  return (
    <div className="left-navbar">
      <h2>Search Filters</h2>
      <div className="filter-group">
        <label htmlFor="make">Make:</label>
        <select
          id="make"
          value={make}
          onChange={handleMakeChange}
        >
          <option value="">Select Make</option>
          <option value="honda">Honda</option>
          <option value="toyota">Toyota</option>
          <option value="hyundai">Hyundai</option>
          {/* Add more make options here */}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="model">Model:</label>
        <input
          type="text"
          id="model"
          value={model}
          onChange={handleModelChange}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="year">Year:</label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={handleYearChange}
        />
      </div>
      <button onClick={handleFilterClick}>Apply Filters</button>
    </div>
  );
};

export default LeftNavbar;
