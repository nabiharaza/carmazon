import React, { useState, useEffect } from 'react';
import { fetchZipCodeCoordinates } from '../../service/commonService';
import Sidebar from '../../components/Sidebar/Sidebar';
import { fetchCarListingData } from '../../service/carListingService'; 
import CardList from '../../components/CardList/CardList';
import { Link } from 'react-router-dom';
import { Grid, Pagination } from '@mui/material';
import './CarListing.css';

const CarListing: React.FC = () => {
    const [jsonData, setJsonData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState<number>(20); // Adjust the number of items per page as needed
    
    const [totalPages, setTotalPages] = useState<number>(1);
    const [filters, setFilters] = useState<Filters>({
        make: [],
        model: '',
        mileage: '',
        condition: '',
        state: '',
        city: '',
        zipCode: '',
        latitude: 0,
        longitude: 0
    });

    useEffect(() => {
        fetchData(); // Calls a function to fetch data
    }, [currentPage, filters]); // Dependency array: useEffect will re-run if currentPage or filters change

    const handleApplyFilters = async (localFilters: Filters) => {        
        setFilters(localFilters);
        setCurrentPage(1);
    };

    const fetchData = async (page?: number) => {
        const queryParams: Record<string, string> = {
            page: String(page || currentPage || 1) // Convert page number to string
        };
        for (const key in filters) {
            if (filters[key as keyof typeof filters]) {
                const filterValue = filters[key as keyof typeof filters];
                if (Array.isArray(filterValue)) {
                    if (filterValue.length > 0) {
                        queryParams[key] = filterValue.join('&' + key + '=');
                    }
                } else {
                    queryParams[key] = filterValue as string;
                }
            }
        }
        let queryString = new URLSearchParams(queryParams).toString();

        try {
            const res = await fetchCarListingData(queryString);
            if (res) {
                setJsonData(res.records || []);
                setTotalPages(Math.ceil(res.totalCount / itemsPerPage));
            } else {
                // Handle null response or error
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className='body'>
            <div className='sidebar'>
                <Sidebar onApplyFilters={handleApplyFilters}/>
            </div>
            <div className='content'>
                <div>
                    <h1>Hello, Car Lovers!</h1>
                    <div className='cards'>
                        <Grid container spacing={3} justifyContent="center">
                        {jsonData.map((record: any, index: number) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                        {/* Use Link component to handle navigation */}
                                        <Link className='link' to={`/details/${record.vin}`}>
                                            <CardList data={record} />
                                        </Link>
                                    </Grid>
                                ))}
                        </Grid>
                    </div>
                    <div className='pagination'>
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
        </div>
    );
};

export default CarListing;
