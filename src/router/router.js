import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import LeftFilterNavbar from '../components/LeftFilterNavbar/LeftFilterNavbar';
import DetailsPage from '../pages/DetailsPage'; // Assuming this is the correct path
import Card from "../components/Card/Card";

export default function AppRoutes() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <LeftFilterNavbar />
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <h1>Hello, Car Lovers!</h1>
                    {/* Content for the home route will be rendered here */}
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
