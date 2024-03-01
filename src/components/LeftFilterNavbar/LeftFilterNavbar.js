import React, { useState } from 'react';
import './LeftFilterNavbar.css';

const LeftFilterNavbar = ({ onApplyFilters }) => {
  const carMakes = ['Honda', 'Toyota', 'Hyundai', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz'];
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    make: [],
    model: '',
    mileage: '',
    condition: '',
    state: '',
    city: '',
    zipCode: ''
  });

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleMakeChange = (event) => {
    const { value, checked } = event.target;
    const updatedMakes = checked
      ? [...localFilters.make, value]
      : localFilters.make.filter(make => make !== value);
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      make: updatedMakes
    }));
  };

  const handleModelChange = (event) => {
    const { value } = event.target;
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      model: value
    }));
  };

  const handleMileageChange = (event) => {
    const { value } = event.target;
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      mileage: value
    }));
  };

  const handleConditionChange = (event) => {
    const { value } = event.target;
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      condition: value
    }));
  };

  const handleStateChange = (event) => {
    const { value } = event.target;
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      state: value
    }));
  };

  const handleCityChange = (event) => {
    const { value } = event.target;
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      city: value
    }));
  };

  const handleZipCodeChange = (event) => {
    const { value } = event.target;
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      zipCode: value
    }));
  };

  const handleApplyFiltersClick = () => {
    onApplyFilters(localFilters);
  };

  return (
    <div className="left-navbar">
      <h2>Search Filters</h2>
       <div className="filter-group">
        <input
          type="text"
          placeholder="Enter Zip Code"
          value={localFilters.zipCode}
          onChange={handleZipCodeChange}
        />
      </div>
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
                    checked={localFilters.make.includes(make)}
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
          value={localFilters.model}
          onChange={handleModelChange}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="mileage">Mileage:</label>
        <input
          type="text"
          id="mileage"
          value={localFilters.mileage}
          onChange={handleMileageChange}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="condition">Condition:</label>
        <select
          id="condition"
          value={localFilters.condition}
          onChange={handleConditionChange}
        >
          <option value="">Select Condition</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          value={localFilters.state}
          onChange={handleStateChange}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={localFilters.city}
          onChange={handleCityChange}
        />
      </div>
      <button onClick={handleApplyFiltersClick}>Apply Filters</button>
    </div>
  );
};

export default LeftFilterNavbar;
