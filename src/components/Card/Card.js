import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import './Card.css'; // Import the CSS file

function CustomCard({ data }) {
  const { make, model, vin, year, trim, price, state, city, mileage, dealerName, photoUrls } = data;

  return (
        <Card className="custom-card">
      <CardMedia
        className="card-media"
        image={photoUrls[0]}
      >
         <Typography className="price-overlay" variant="h7">{price}</Typography>
         <Typography className="make-model-overlay" variant="subtitle1">{make} {model} {trim}</Typography>
      </CardMedia>
    <CardContent className="custom-card-content">
        <div className="card-details">
          <div className="detail-item">
            <Typography variant="body2" color="text.secondary">
              <strong>VIN:</strong> {vin}
            </Typography>
          </div>
          <div className="detail-item">
            <Typography variant="body2" color="text.secondary">
              <strong>Year:</strong> {year}
            </Typography>
          </div>
          <div className="detail-item">
            <Typography variant="body2" color="text.secondary">
              <strong>City</strong> {city},{state}
            </Typography>
          </div>
          <div className="detail-item">
            <Typography variant="body2" color="text.secondary">
              <strong>Mileage:</strong> {mileage}
            </Typography>
          </div>
          <div className="detail-item">
            <Typography variant="body2" color="text.secondary">
              <strong>Dealer Name:</strong> {dealerName}
            </Typography>
          </div>
        </div>
      <Button className="details-button black" variant="contained" color="primary">Details</Button>
      </CardContent>
    </Card>
  );
}

export default CustomCard