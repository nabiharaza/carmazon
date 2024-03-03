import React, { useState } from 'react';
import './Sidebar.css';
import { fetchZipCodeCoordinates } from '../../service/commonService';

const Sidebar: React.FC<LeftFilterNavbarProps> = ({ onApplyFilters }) => {
    const carMakes = ['Honda', 'Toyota', 'Hyundai', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz'];
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [localFilters, setLocalFilters] = useState<Filters>({
        make: [],
        model: '',
        mileage: '',
        condition: '',
        state: '',
        city: '',
        zipCode: '',
        latitude: 0,
        longitude: 0,
        radius: 0
    });
    const [isNavbarCollapsed, setNavbarCollapsed] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleFieldChange = <K extends keyof Filters>(fieldName: K) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { type, value } = event.target;
        let fieldValue: string | boolean | string[];
        switch (type) {
            case 'checkbox':
                if (Array.isArray(localFilters[fieldName])) {
                    fieldValue = (localFilters[fieldName] as string[]).includes(value)
                        ? (localFilters[fieldName] as string[]).filter(item => item !== value)
                        : [...(localFilters[fieldName] as string[]), value];
                } else {                
                    fieldValue = localFilters[fieldName] !== value ? value : '';
                }
                break;
            default:
                fieldValue = value;
                break;
        }
        
        setLocalFilters(prevFilters => ({
            ...prevFilters,
            [fieldName]: fieldValue 
        }));
    };

    const handleApplyFiltersClick = async () => {
        if (localFilters.zipCode) {
            const zipCodeCoordinates: Coordinates | null = await fetchZipCodeCoordinates(localFilters.zipCode);
            if (zipCodeCoordinates) {
                localFilters.latitude = zipCodeCoordinates.latitude;
                localFilters.longitude = zipCodeCoordinates.longitude;
            }
            onApplyFilters(localFilters);
        } else {
            onApplyFilters(localFilters);
        }
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
            <div>
                <div className="filter-group">
                    <input
                        type="text"
                        placeholder="Enter Zip Code"
                        value={localFilters.zipCode}
                        onChange={handleFieldChange('zipCode')}
                    />
                </div>
                <div className="filter-group">
                    <select
                        value={localFilters.radius}
                        onChange={handleFieldChange('radius')}
                        className="dropdown-toggle"
                    >
                        <option value="">Radius</option>
                        <option value="10">10</option>
                        <option value="30">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                    </select>
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
                                            onChange={handleFieldChange('make')}
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
                        onChange={handleFieldChange('model')}
                        placeholder="Model"
                    />
                </div>
                <div className="filter-group">
                    <input
                        type="text"
                        value={localFilters.mileage}
                        onChange={handleFieldChange('mileage')}
                        placeholder="Mileage"
                    />
                </div>
                <div className="filter-group">
                    <select
                        value={localFilters.condition}
                        onChange={handleFieldChange('condition')}
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
                        onChange={handleFieldChange('state')}
                        placeholder="State"
                    />
                </div>
            </div>
            <button onClick={handleApplyFiltersClick}>Apply Filters</button>
        </div>
    );
};

export default Sidebar;
