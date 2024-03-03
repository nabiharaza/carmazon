import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import CarListing from '../pages/CarListing/CarListing';
import CarDetail from '../pages/CarDetail/CarDetail';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <CarListing /> } />
        <Route path="/details/:vin" element={ <CarDetail /> } />
      </Routes>
    </Router>
  );
}

export default AppRouter;