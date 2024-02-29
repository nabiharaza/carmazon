// App.js
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import LeftFilterNavbar from './components/LeftFilterNavbar/LeftFilterNavbar';
import './components/Navbar/Navbar.css';
import './App.css';
import Card from "./components/Card/Card";

function App() {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    // Fetch data from Flask backend when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://auto.dev/api/listings'); // Assumes Flask server is running on same host
      const data = await response.json();
      setJsonData(data.records);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <LeftFilterNavbar />
        <div className="content">
          <h1>Hello, React!</h1>
          <div className="card-container">
            {jsonData.map((record, index) => (
              <Card key={index} data={record} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;