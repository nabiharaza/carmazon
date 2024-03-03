import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import './CarDetail.css';
import Carousel from 'react-material-ui-carousel';
import {Button} from '@mui/material';
import distanceIcon from '../../assets/icons/distance-pin.svg';
import clickoffIcon from '../../assets/icons/link.svg';
import colorIcon from '../images/display_colour.png';
import bodyStyleIcon from '../../assets/icons/car.svg';
import bodyTypeIcon from '../../assets/icons/noun-car-95549.svg';
import backarrow from '../../assets/icons/back-arrow-icon.png';
import hotlisting from '../../assets/icons/hot-listing.png';
import priceIcon from '../../assets/icons/noun-price-tag-5016978.svg';
import conditionIcon from '../../assets/icons/noun-sale-offer-4316748.svg';
import mileageIcon from '../../assets/icons/noun-speedometer-3955246.svg';
import priceDropIcon from '../../assets/icons/noun-price-drop-5974867.svg';
import ShopIcon from '../../assets/icons/noun-car-dealer-789273.svg';
import LocationIcon from '../../assets/icons/noun-location-6646256.svg';


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
    const {vin} = useParams<{ vin: string }>(); // Access the route parameter 'vin'
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
                    <img src={backarrow} alt="Back Arrow" className="back-arrow-icon"/>
                    <span className="back-text">Back</span>
                </Link>
            </div>
            <div className="top-title-bar">
                <div className="title-wrapper">
                    {/*{record.isHot && <img src={hotlisting} alt="Hot" className="hot-icon"/>}*/}
                    {/*{record.isHot && <span className="hot-label">Hot Listing</span>}*/}
                    {/*{record.recentPriceDrop && <span className="price-drop-label">Price Drop</span>}*/}
                    <h2>{record.year} {record.make} {record.model}</h2>
                    {record.isHot && <span className="hot-label">Hot Listing</span>}
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
                                backgroundColor: 'rgb(234,233,233)',
                                color: '#000',
                                borderRadius: '20%',
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
                    <h2>{record.year} {record.make} {record.model}</h2>
                    <div className="detail-item">
                        <img src={priceIcon} alt="Price Icon" className="detail-icon"/>
                        <p className="detail-label">Price:</p>
                        <p className="detail-value">{record.price}</p>
                    </div>
                    <div className="detail-item">
                        <img src={conditionIcon} alt="Condition Icon" className="detail-icon"/>
                        <p className="detail-label">Condition:</p>
                        <p className="detail-value">{record.condition}</p>
                    </div>
                    <div className="detail-item">
                        <img src={mileageIcon} alt="Mileage Icon" className="detail-icon"/>
                        <p className="detail-label">Mileage:</p>
                        <p className="detail-value">{record.mileage}</p>
                    </div>
                    <div className="detail-item">
                        <img src={LocationIcon} alt="City Icon" className="detail-icon"/>
                        <p className="detail-label">City:</p>
                        <p className="detail-value">{record.city}, {record.state}</p>
                    </div>
                    <div className="detail-item">
                        <img src={priceDropIcon} alt="Price Drop Icon" className="detail-icon"/>
                        <p className="detail-label">Recent Price Drop:</p>
                        <p className="detail-value">{record.recentPriceDrop ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="detail-item">
                        <img src={ShopIcon} alt="Dealer Icon" className="detail-icon"/>
                        <p className="detail-label">Dealer:</p>
                        <p className="detail-value">{record.dealerName}</p>
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
                            <a href={record.clickoffUrl}>
                                <img src={clickoffIcon} alt="Icon" className="detail-icon"/>
                            </a>
                            <p>Clickoff URL</p>
                        </div>
                        <div className="detail-item">
                            {/* <img src={colorIcon} alt="Icon" className="detail-icon"/> */}
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

export default CarDetail;
