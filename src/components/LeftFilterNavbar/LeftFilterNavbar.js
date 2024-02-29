import React from 'react';
import './LeftFilterNavbar.css'; // You can create a separate CSS file for styling

const LeftNavbar = ({ filters, onFilterChange, onApplyFilters }) => {
  const handleMakeChange = (event) => {
    onFilterChange('make', event.target.value);
  };

  const handleModelChange = (event) => {
    onFilterChange('model', event.target.value);
  };

  return (
    <div className="left-navbar">
      <h2>Search Filters</h2>
      <div className="filter-group">
        <label htmlFor="make">Make:</label>
        <select
          id="make"
          value={filters.make}
          onChange={handleMakeChange}
        >
          <option value="">Select Make</option>
          <option value="Honda">Honda</option>
          <option value="Toyota">Toyota</option>
          <option value="Hyundai">Hyundai</option>
          {/* Add more make options here */}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="model">Model:</label>
        <input
          type="text"
          id="model"
          value={filters.model}
          onChange={handleModelChange}
        />
      </div>
      <button onClick={onApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default LeftNavbar;
