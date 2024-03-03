import React from 'react';
// import AppRoutes from './router/router'; // Import the routes
import './App.css';
import CarListing from './pages/CarListing/CarListing';
import Header from './components/Header/Header'
import AppRouter from './router/router';


function app(): JSX.Element {
    
    return (
      <div className='container'>
        <div className='navbar'>
            <Header />
        </div>
        <div className='app-body'>
          <AppRouter />
        </div>
      </div>
        // <Router>
        //     <div className="App">
        //         <Navbar />
        //         <div className="main-content">
        //             <LeftFilterNavbar onApplyFilters={handleApplyFilters} />
        //             <div className="content">
        //                 <Routes>
        //                     <Route
        //                         path="/"
        //                         element={
        //                             <div>
        //                                 <h1>Hello, Car Lovers!</h1>
        //                                 <Grid container spacing={3} justifyContent="center">
        //                                     {jsonData.map((record: any, index: number) => (
        //                                         <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        //                                             {/* Use Link component to handle navigation */}
        //                                             <Link to={`/details/${record.vin}`}>
        //                                                 <Card data={record} />
        //                                             </Link>
        //                                         </Grid>
        //                                     ))}
        //                                 </Grid>
        //                                 <Pagination
        //                                     count={totalPages}
        //                                     page={currentPage}
        //                                     onChange={handleChangePage}
        //                                     color="primary"
        //                                     variant="outlined"
        //                                     shape="rounded"
        //                                 />
        //                             </div>
        //                         }
        //                     />
        //                     <Route path="/details/:vin" element={<DetailsPage />} />
        //                 </Routes>
        //             </div>
        //         </div>
        //     </div>
        // </Router>
    );
}

export default app;
