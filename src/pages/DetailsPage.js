import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import './DetailsPage.css';
import Carousel from 'react-material-ui-carousel';
import {Button} from '@mui/material';
import distanceIcon from '../images/origin2.png';
import clickoffIcon from '../images/origin.png';
import colorIcon from '../images/display_colour.png';
import bodyStyleIcon from '../images/display_style.png';
import bodyTypeIcon from '../images/body_type.png';


function DetailsPage() {
    const {vin} = useParams(); // Access the route parameter 'vin'
    const [record, setRecord] = useState(null);
    const [activeTab, setActiveTab] = useState('more-details');

    useEffect(() => {
        const storedData = localStorage.getItem('jsonData');
        if (storedData) {
            const jsonData = JSON.parse(storedData);
            const matchedRecord = jsonData.find(item => item.vin === vin);
            if (matchedRecord) {
                setRecord(matchedRecord);
            }
        }
    }, [vin]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    if (!record) {
        return <div>Loading...</div>;
    }
    return (
        <div className="details-page">
            <div className="top-title-bar">
                <h2>{record.year} {record.make} {record.model}</h2>
                <div className="details">
                    <p>Price: {record.price} | Mileage: {record.mileage}</p>
                </div>
            </div>
            <div className="details-container">
                <Link to="/">Back</Link>
                <div className="images-container">
                    <Carousel
                        autoPlay={false}
                        animation="slide"
                        indicators={false}
                        navButtonsAlwaysVisible={true}
                        NextIcon={<Button>Next</Button>}
                        PrevIcon={<Button>Prev</Button>}
                        navButtonsProps={{
                            style: {
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                color: '#000',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px'
                            }
                        }}
                    >
                        {record.photoUrls.map((url, index) => (
                            <img key={index} src={url} alt={`Car ${index + 1}`} className="carousel-image"/>
                        ))}
                    </Carousel>
                </div>
                <div className="card">
                    <div className="card-content">
                        <h2>{record.make} {record.model}</h2>
                        <p>Year: {record.year}</p>
                        <p>Price: {record.price}</p>
                        <p>Condition: {record.condition}</p>
                        <p>Mileage: {record.mileage}</p>
                        <p>City: {record.city}</p>
                        <p>State: {record.state}</p>
                        <p>Recent Price Drop: {record.recentPriceDrop ? 'Yes' : 'No'}</p>
                        <p>Is Hot: {record.isHot ? 'Yes' : 'No'}</p>
                        <p>Dealer: {record.dealerName}</p>
                    </div>
                </div>
                <div className="tabs-container">
                    <div className="tabs">
                        <button className={`tab ${activeTab === 'more-details' ? 'active' : ''}`}
                                onClick={() => handleTabClick('more-details')}>More Details
                        </button>
                        <button className={`tab ${activeTab === 'specs' ? 'active' : ''}`}
                                onClick={() => handleTabClick('specs')}>Specs
                        </button>
                        <button className={`tab ${activeTab === 'others' ? 'active' : ''}`}
                                onClick={() => handleTabClick('others')}>Others
                        </button>
                    </div>
                    <div className={`tab-pane ${activeTab === 'more-details' ? 'active' : ''}`}>
                        <div className="detail-item">
                            <img src={distanceIcon} alt="Icon" className="detail-icon"/>
                            <p className="detail-text">Distance From Origin: {record.distanceFromOrigin}</p>
                        </div>
                        <div className="detail-item">
                            <a href={record.clickoffUrl}><img src={clickoffIcon} alt="Icon" className="detail-icon" /></a>
                             <p>Clickoff URL</p>
                        </div>
                        <div className="detail-item">
                            <img src={colorIcon} alt="Icon" className="detail-icon"/>
                            <p className="detail-text">Display Color: {record.displayColor || 'Not available'}</p>
                        </div>
                        <div className="detail-item">
                            <img src={bodyStyleIcon} alt="Icon" className="detail-icon"/>
                            <p className="detail-text">Body Style: {record.bodyStyle}</p>
                        </div>
                        <div className="detail-item">
                            <img src={bodyTypeIcon} alt="Icon" className="detail-icon"/>
                            <p className="detail-text">Body Type: {record.bodyType}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
