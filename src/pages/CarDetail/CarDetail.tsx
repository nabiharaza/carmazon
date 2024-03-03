import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './CarDetail.css';
import Carousel from 'react-material-ui-carousel';
import { Button } from '@mui/material';
import distanceIcon from '../../assets/images/cartoad.png';
import clickoffIcon from '../images/origin.png';
import colorIcon from '../images/display_colour.png';
import bodyStyleIcon from '../images/display_style.png';
import bodyTypeIcon from '../images/body_type.png';
import backarrow from '../images/icons/back-arrow-icon.png';
// import hotlisting from '../images/icons/fire-flame.gif';

interface Record {
  vin: string;
  isHot: boolean;
  year: number;
  make: string;
  model: string;
  price: number;
  mileage: number;
  condition: string;
  city: string;
  state: string;
  recentPriceDrop: boolean;
  photoUrls: string[];
  distanceFromOrigin: number;
  clickoffUrl: string;
  displayColor: string;
  bodyStyle: string;
  bodyType: string;
  dealerName: string;
}

const CarDetail: React.FC = () => {
    const { vin } = useParams<{ vin: string }>(); // Access the route parameter 'vin'
    const [record, setRecord] = useState<Record | null>(null);
    const [activeTab, setActiveTab] = useState<'more-details' | 'specs' | 'others'>('more-details');
  
    useEffect(() => {
      const storedData = localStorage.getItem('jsonData');
      if (storedData) {
        const jsonData: Record[] = JSON.parse(storedData);
        const matchedRecord = jsonData.find(item => item.vin === vin);
        if (matchedRecord) {
          setRecord(matchedRecord);
        }
      }
    }, [vin]);
  
    const handleTabClick = (tab: 'more-details' | 'specs' | 'others') => {
      setActiveTab(tab);
    };
  
  
    if (!record) {
      return <div>Loading...</div>;
    }
  
    return (
        <div className="details-page">
        <div className="back-button">
            <Link to="/" className="back-link">
            {/* <img src={backarrow} alt="Search" className="back-arrow-icon" /> */}
            <span className="back-text">Back</span>
            </Link>
        </div>
        <div className="top-title-bar">
            <div className="title-wrapper">
            {/* {record.isHot && <img src={hotlisting} alt="Hot" className="hot-icon" />} */}
            <h2>{record.year} {record.make} {record.model}</h2>
            </div>
            <div className="details">
            <p>Price: {record.price} | Mileage: {record.mileage}</p>
            </div>
        </div>
        <div className="details-container">
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
            <div className="short-details-card">
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
                <a href={record.clickoffUrl}>
                    {/* <img src={clickoffIcon} alt="Icon" className="detail-icon" /> */}
                    </a>
                <p>Clickoff URL</p>
                </div>
                <div className="detail-item">
                {/* <img src={colorIcon} alt="Icon" className="detail-icon"/> */}
                <p className="detail-text">Display Color: {record.displayColor || 'Not available'}</p>
                </div>
                <div className="detail-item">
                {/* <img src={bodyStyleIcon} alt="Icon" className="detail-icon"/> */}
                <p className="detail-text">Body Style: {record.bodyStyle}</p>
                </div>
                <div className="detail-item">
                {/* <img src={bodyTypeIcon} alt="Icon" className="detail-icon"/> */}
                <p className="detail-text">Body Type: {record.bodyType}</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default CarDetail;
