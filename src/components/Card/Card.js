import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

function CustomCard({ data }) {
  const { vin, make, model, year, trim, photoUrls } = data;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={photoUrls[0]}
        alt={`${make} ${model}`}
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
      </CardContent>
    </Card>
  );
}

export default CustomCard;
