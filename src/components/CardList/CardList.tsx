import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './CardList.css'; // Import the CSS file

const CustomCard: React.FC<CustomCardProps> = ({ data }) => {
    const { make, model, vin, year, trim, price, state, city, mileage, dealerName, photoUrls, primaryPhotoUrl,  } = data;
    return (
        <div className='custom-card'>
            <div className='card-media'>
                <Typography className="price-overlay" variant="h6">{price}</Typography>
                <img src={primaryPhotoUrl} alt={`${make} ${model} ${trim}`} className='card-image' />
                <Typography className="overlay-bar" variant="subtitle1">{`${year} ${make} ${model} ${trim}`}</Typography>
            </div>
            <div className="card-content">
                <div className="detail-item">
                    <Typography variant="body2" color="textSecondary">
                        <strong>Location:</strong> {city}. {state}
                    </Typography>
                </div>
                <div className="detail-item">
                    <Typography variant="body2" color="textSecondary">
                        <strong>Mileage:</strong> {mileage}
                    </Typography>
                </div>
                <div className="detail-item">
                    <Typography variant="body2" color="textSecondary">
                        <strong>Dealer Name:</strong> {dealerName}
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default CustomCard;
