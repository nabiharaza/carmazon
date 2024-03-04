import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import './CarDetail.css';
import Carousel from 'react-material-ui-carousel';
import {Button} from '@mui/material';
import {vinIntelligentAnalysis, vinDetails} from '../../service/carListingService';
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
import copyIcon from '../../assets/icons/noun-copy-6644209.svg';

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

interface VinIntelligence {
    targetPrice: number;
    fairPriceHigh: number;
    fairPriceLow: number;
    priceLimitHigh: number;
    priceLimitLow: number;
}

interface VinDetails {
    bodyType: string;
    carfax: string;
    carfaxOneOwner: string;
    colorInterior: string;
    colorExterior: string;
    condition: string;
    features: string[];
    photoUrls: string[];
    dealerName: string;
    address: string;
    phone: string;
    make: string;
    model: string;
    vin: string;
    year: number;
    trim: string;
    price: number;
    state: string;
    city: string;
    mileage: number;
    overlay: string;
    primaryPhotoUrl: string;
    isHot: boolean;
    recentPriceDrop: boolean;
}


const CarDetail: React.FC = () => {
    const {vin} = useParams<{ vin: string }>(); // Access the route parameter 'vin'
    const [record, setRecord] = useState<Record | null>(null);
    const [activeTab, setActiveTab] = useState<'more-details' | 'specs' | 'others'>('more-details');
    const [additionalDetails, setAdditionalDetails] = useState<VinIntelligence | null>(null);
    const [vinDetailsInformation, setVinDetails] = useState<VinDetails | null>(null);


    useEffect(() => {
        const fetchCarDetails = async () => {
            // Fetch car details from local storage
            const storedData = localStorage.getItem('jsonData');
            if (storedData) {
                const jsonData: Record[] = JSON.parse(storedData);
                const matchedRecord = jsonData.find(item => item.vin === vin);
                if (matchedRecord) {
                    setRecord(matchedRecord);
                }
            }
        };

        fetchCarDetails();

        const fetchVinIntelligentDetails = async () => {
            try {
                const data = await vinIntelligentAnalysis(vin);
                setAdditionalDetails(data);
            } catch (error) {
                console.error('Error fetching additional details:', error);
            }
        };

        fetchVinIntelligentDetails();


        const fetchVinDetails = async () => {
            try {
                const vinData = await vinDetails(vin);
                setVinDetails(vinData);
                console.log('Vin Details:', vinData);
            } catch (error) {
                console.error('Error fetching VIN details:', error);
            }
        };

        fetchVinDetails();
    }, [vin]);


    const handleTabClick = (tab: 'more-details' | 'specs' | 'others') => {
        setActiveTab(tab);
    };


    if (!vinDetailsInformation) {
        return <div>Loading...</div>;
    }
    const handleCopyVin = () => {
        navigator.clipboard.writeText(vinDetailsInformation?.vin); // Copies the VIN to the clipboard
    };


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
                    <h2>{vinDetailsInformation?.year} {vinDetailsInformation?.make} {vinDetailsInformation?.model}</h2>
                    {vinDetailsInformation?.isHot && <span className="hot-label">Hot Listing</span>}
                    {vinDetailsInformation?.recentPriceDrop && <span className="price-drop-label">Price Drop</span>}

                </div>
                <div className="below-title-summay">
                    {/*<p>Price: {record.price} | Mileage: {record.mileage}</p>*/}
                    <div className="detail-item">
                        <p className="detail-label">Price:</p>
                        <p className="detail-value">{vinDetailsInformation?.price}</p> {/* Display the VIN */}
                    </div>
                    <div className="detail-item">
                        <p className="detail-label">Mileage:</p>
                        <p className="detail-value">{vinDetailsInformation?.mileage}</p> {/* Display the VIN */}
                    </div>
                    <div className="detail-item">
                        <p className="detail-label">VIN:</p>
                        <p className="detail-value">{vinDetailsInformation?.vin}</p> {/* Display the VIN */}
                        <Button onClick={handleCopyVin}>
                            <img src={copyIcon} alt="Copy VIN" className="copy-icon"/>
                        </Button>
                    </div>
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
                        {vinDetailsInformation?.photoUrls?.map((url, index) => (
                            <img key={index} src={url} alt={`Car ${index + 1}`} className="carousel-image"/>
                        ))}
                    </Carousel>
                </div>
                <div className="short-details-card">
                    <h2>{vinDetailsInformation?.year} {vinDetailsInformation?.make} {vinDetailsInformation?.model}</h2>

                    <div className="detail-item">
                        <img src={priceIcon} alt="Price Icon" className="detail-icon"/>
                        <p className="detail-label">Price:</p>
                        <p className="detail-value">{vinDetailsInformation?.price}</p>
                    </div>
                    <div className="detail-item">
                        <img src={conditionIcon} alt="Condition Icon" className="detail-icon"/>
                        <p className="detail-label">Condition:</p>
                        <p className="detail-value">{vinDetailsInformation?.condition}</p>
                    </div>
                    <div className="detail-item">
                        <img src={mileageIcon} alt="Mileage Icon" className="detail-icon"/>
                        <p className="detail-label">Mileage:</p>
                        <p className="detail-value">{vinDetailsInformation?.mileage}</p>
                    </div>
                    <div className="detail-item">
                        <img src={LocationIcon} alt="City Icon" className="detail-icon"/>
                        <p className="detail-label">City:</p>
                        <p className="detail-value">{vinDetailsInformation?.city}, {vinDetailsInformation?.state}</p>
                    </div>
                    <div className="detail-item">
                        <img src={priceDropIcon} alt="Price Drop Icon" className="detail-icon"/>
                        <p className="detail-label">Recent Price Drop:</p>
                        <p className="detail-value">{vinDetailsInformation?.recentPriceDrop ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="detail-item">
                        <img src={ShopIcon} alt="Dealer Icon" className="detail-icon"/>
                        <p className="detail-label">Dealer:</p>
                        <p className="detail-value">{vinDetailsInformation?.dealerName}</p>
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
                            <p className="detail-text">Distance From Origin: {record?.distanceFromOrigin}</p>
                        </div>
                        <div className="detail-item">
                            <a href={record?.clickoffUrl}>
                                <img src={clickoffIcon} alt="Icon" className="detail-icon"/>
                            </a>
                            <p>Clickoff URL</p>
                        </div>
                        <div className="detail-item">
                            <p className="detail-text">Display Color: {record?.displayColor || 'Not available'}</p>
                        </div>
                        <div className="detail-item">
                            <img src={bodyStyleIcon} alt="Icon" className="detail-icon"/>
                            <p className="detail-text">Body Style: {record?.bodyStyle}</p>
                        </div>
                        <div className="detail-item">
                            <img src={bodyTypeIcon} alt="Icon" className="detail-icon"/>
                            <p className="detail-text">Body Type: {record?.bodyType}</p>
                        </div>
                        {additionalDetails && (
                            <div className="detail-item">
                                <p className="detail-text">Target Price: {additionalDetails.targetPrice}</p>
                            </div>
                        )}
                        {additionalDetails && (
                            <div className="detail-item">
                                <p className="detail-text">Fair Price High: {additionalDetails.fairPriceHigh}</p>
                            </div>
                        )}
                        {additionalDetails && (
                            <div className="detail-item">
                                <p className="detail-text">Fair Price Low: {additionalDetails.fairPriceLow}</p>
                            </div>
                        )}
                        {additionalDetails && (
                            <div className="detail-item">
                                <p className="detail-text">Price Limit High: {additionalDetails.priceLimitHigh}</p>
                            </div>
                        )}
                        {additionalDetails && (
                            <div className="detail-item">
                                <p className="detail-text">Price Limit Low: {additionalDetails.priceLimitLow}</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CarDetail;
