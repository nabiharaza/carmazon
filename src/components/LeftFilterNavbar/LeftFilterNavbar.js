import React, {useState} from 'react';
import './LeftFilterNavbar.css';

const LeftFilterNavbar = ({onApplyFilters}) => {
    const carMakes = ['Honda', 'Toyota', 'Hyundai', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz'];
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isCollapsed, setCollapsed] = useState(false);
    const [localFilters, setLocalFilters] = useState({
        make: [],
        model: '',
        mileage: '',
        condition: '',
        state: '',
        city: '',
        zipCode: ''
    });
    const [isNavbarCollapsed, setNavbarCollapsed] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleMakeChange = (event) => {
        const {value, checked} = event.target;
        const updatedMakes = checked
            ? [...localFilters.make, value]
            : localFilters.make.filter(make => make !== value);
        setLocalFilters(prevFilters => ({
            ...prevFilters,
            make: updatedMakes
        }));
    };

    const handleModelChange = (event) => {
        const {value} = event.target;
        setLocalFilters(prevFilters => ({
            ...prevFilters,
            model: value
        }));
    };

    const handleMileageChange = (event) => {
        const {value} = event.target;
        setLocalFilters(prevFilters => ({
            ...prevFilters,
            mileage: value
        }));
    };

    const handleConditionChange = (event) => {
        const {value} = event.target;
        setLocalFilters(prevFilters => ({
            ...prevFilters,
            condition: value
        }));
    };

    const handleStateChange = (event) => {
        const {value} = event.target;
        setLocalFilters(prevFilters => ({
            ...prevFilters,
            state: value
        }));
    };

    const handleCityChange = (event) => {
        const {value} = event.target;
        setLocalFilters(prevFilters => ({
            ...prevFilters,
            city: value
        }));
    };

    const handleZipCodeChange = (event) => {
        const {value} = event.target;
        setLocalFilters(prevFilters => ({
            ...prevFilters,
            zipCode: value
        }));
    };

    const handleApplyFiltersClick = () => {
        onApplyFilters(localFilters);
    };

    const toggleNavbar = () => {
        setNavbarCollapsed(!isNavbarCollapsed);
    };

    return (
        <div className={`left-navbar ${isNavbarCollapsed ? 'collapsed' : ''}`}>
            <div className="navbar-toggle" onClick={toggleNavbar}>
                <div className="burger"></div>
                <div className="burger"></div>
                <div className="burger"></div>
            </div>
            <h2 className="navbarTitle">Search Filters</h2>
            <div className="filter-group">
                <input
                    type="text"
                    placeholder="Enter Zip Code"
                    value={localFilters.zipCode}
                    onChange={handleZipCodeChange}
                />
            </div>
            <div className="filter-group">
                <div className="dropdown">
                    <button className="dropdown-toggle" onClick={toggleDropdown}>
                        Make
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
                <input
                    type="text"
                    value={localFilters.model}
                    onChange={handleModelChange}
                    placeholder="Model"
                />
            </div>
            <div className="filter-group">
                <input
                    type="text"
                    value={localFilters.mileage}
                    onChange={handleMileageChange}
                    placeholder="Mileage"
                />
            </div>
            <div className="filter-group">
                <select
                    value={localFilters.condition}
                    onChange={handleConditionChange}
                    className="dropdown-toggle"
                >
                    <option value="">Condition</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                </select>
            </div>
            <div className="filter-group">
                <input
                    type="text"
                    value={localFilters.state}
                    onChange={handleStateChange}
                    placeholder="State"
                />
            </div>
            <button onClick={handleApplyFiltersClick}>Apply Filters</button>
        </div>
    );
};

export default LeftFilterNavbar;
