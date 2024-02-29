import React, { useState } from 'react';
import './LeftFilterNavbar.css'; // You can create a separate CSS file for styling

const LeftFilterNavbar = ({ filters, onFilterChange, onApplyFilters }) => {
  const carMakes = ['Honda', 'Toyota', 'Hyundai', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz']; // Add more car makes as needed
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleMakeChange = (event) => {
    const { value, checked } = event.target;
    const updatedMakes = checked
      ? [...filters.make, value]
      : filters.make.filter(make => make !== value);
    onFilterChange('make', updatedMakes);
  };

  const handleModelChange = (event) => {
    onFilterChange('model', event.target.value);
  };

  const handleMileageChange = (event) => {
    onFilterChange('mileage', event.target.value);
  };

  const handleConditionChange = (event) => {
    onFilterChange('condition', event.target.value);
  };

  const handleStateChange = (event) => {
    onFilterChange('state', event.target.value);
  };

  const handleCityChange = (event) => {
    onFilterChange('city', event.target.value);
  };

  const constructQueryString = () => {
    let queryString = '';
    if (filters.make.length > 0) {
      queryString += `make=${filters.make.join('&make=')}`;
    }
    if (filters.model) {
      queryString += `${queryString ? '&' : ''}model=${filters.model}`;
    }
    // Add additional filters
    if (filters.mileage) {
      queryString += `${queryString ? '&' : ''}mileage=${filters.mileage}`;
    }
    if (filters.condition) {
      queryString += `${queryString ? '&' : ''}condition=${filters.condition}`;
    }
    if (filters.state) {
      queryString += `${queryString ? '&' : ''}state=${filters.state}`;
    }
    if (filters.city) {
      queryString += `${queryString ? '&' : ''}city=${filters.city}`;
    }
    return queryString;
  };

  return (
    <div className="left-navbar">
      <h2>Search Filters</h2>
      <div className="filter-group">
        <label>Make:</label>
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            Select Make
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {carMakes.map(make => (
                <label key={make}>
                  <input
                    type="checkbox"
                    value={make}
                    checked={filters.make.includes(make)}
                    onChange={handleMakeChange}
                  />
                  {make}
                </label>
              ))}
            </div>
          )}
        </div>
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
      {/* Additional filters */}
      <div className="filter-group">
        <label htmlFor="mileage">Mileage:</label>
        <input
          type="text"
          id="mileage"
          value={filters.mileage}
          onChange={handleMileageChange}
        />
      </div>
      <div className="filter-group">
         <label htmlFor="condition">Condition:</label>
        <select
          id="condition"
          value={filters.condition}
          onChange={handleConditionChange}
        >
          <option value="">Select Condition</option>
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="both">Both</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          value={filters.state}
          onChange={handleStateChange}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={filters.city}
          onChange={handleCityChange}
        />
      </div>
      <button onClick={() => onApplyFilters(constructQueryString())}>Apply Filters</button>
    </div>
  );
};

export default LeftFilterNavbar;
