import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import './Card.css'; // Import the CSS file

function CustomCard({ data }) {
  const { vin, make, model, year, trim, photoUrls, price, state, city, mileage, dealerName } = data;

  return (
    <Card className="custom-card">
      <CardMedia
        className="card-media"
        image={photoUrls[0]}
        title={`${make} ${model}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {make} {model}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          VIN: {vin}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Year: {year}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Trim: {trim}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          State: {state}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          City: {city}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Mileage: {mileage}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Dealer Name: {dealerName}
        </Typography>
      </CardContent>
      <Button className="details-button" variant="contained" color="primary">Details</Button>
    </Card>
  );
}

export default CustomCard;
