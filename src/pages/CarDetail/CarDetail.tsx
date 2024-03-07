import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import './CarDetail.css';
import Carousel from 'react-material-ui-carousel';
import {Button} from '@mui/material';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import the styles
import {vinIntelligentAnalysis, vinDetails, carKeyFeatures} from '../../service/carListingService';
import PhotoIcons from '../../service/PhotoIcons';
import distanceIcon from '../../assets/icons/noun-distance-1514833.svg';
import colorIcon from '../images/display_colour.png';
import bodyStyleIcon from '../../assets/icons/car.svg';
import bodyTypeIcon from '../../assets/icons/noun-car-95549.svg';
import backarrow from '../../assets/icons/back-arrow-icon.png';
import hotlisting from '../../assets/icons/hot-listing.png';
import priceIcon from '../../assets/icons/noun-price-tag-5016978.svg';
import conditionIcon from '../../assets/icons/noun-sale-offer-4316748.svg';
import mileageIcon from '../../assets/icons/noun-speedometer-3955246.svg';
import priceDropIcon from '../../assets/icons/noun-price-drop-5974867.svg';
import ShopIcon from '../../assets/icons/noun-link-2091732.svg';
import LocationIcon from '../../assets/icons/noun-location-6646256.svg';
import copyIcon from '../../assets/icons/noun-copy-6644209.svg';
import nextIcon from '../../assets/icons/noun-next-button-5611387.svg';
import previousIcon from '../../assets/icons/noun-back-button-251451.svg';
import sunroofIcon from '../../assets/icons/tabs/noun-car-4372165.svg';
import heatedSeatIcon from '../../assets/icons/tabs/noun-seat-3355762.svg';
import {CarListingKeyFeatures, VinDetails, VinIntelligence} from "../../constants/constants";

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
    const [activeTab, setActiveTab] = useState<number>(0);
    const [additionalDetails, setAdditionalDetails] = useState<VinIntelligence | null>(null);
    const [vinDetailsInformation, setVinDetails] = useState<VinDetails | null>(null);
    const [carKeyFeaturesInformation, setCarKeyInfomation] = useState<CarListingKeyFeatures | null>(null);
    const [impFilteredSpecification, setImpFilteredSpecifications] = useState<any>(null);


    const specificationsList = [
        'Carfax',
        'Carfax One Owner',
        'Folding Rear Seat',
        'Keyless Entry',
        'Sunroof',
        'Bluetooth',
        'Navigation',
        'Backup Camera',
        'Power Seats',
        'Premium Wheels',
        'Towing',
        'Leather',
        'Parking Sensors',
        'Remote Engine Start',
        'Satellite Radio',
        'Security System',
        'Warranty',
        'Tinted Windows',
        'Collision Avoidance System:',
        'Anti Brake',
        'Eligible For Financing'

    ];
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


        // const {originalData, filteredData} = await carKeyFeatures(vin);
        const fetchCarKeyFeatures = async () => {
            try {
                const {originalData, filteredData} = await carKeyFeatures(vin);
                setCarKeyInfomation(filteredData);
                console.log('Car Features Details:', filteredData);
                console.log('Original All RAW DATA: ', originalData);

                // Ensure filteredData is an object
                if (typeof filteredData === 'object' && filteredData !== null) {
                    const impFilteredData = Object.fromEntries(
                        Object.entries(filteredData)
                            .filter(([key, value]) => specificationsList.includes(key))
                    );
                    setImpFilteredSpecifications(impFilteredData);
                    console.log('imp>>>', impFilteredData);
                } else {
                    console.error('Filtered data is not an object.');
                }
            } catch (error) {
                console.error('Error fetching VIN details:', error);
            }
        };

        fetchCarKeyFeatures();
    }, [vin]);


    if (!vinDetailsInformation) {
        return <div>Loading...</div>;
    }
    const handleCopyVin = () => {
        navigator.clipboard.writeText(vinDetailsInformation?.vin); // Copies the VIN to the clipboard
    };

    const commonKeys = carKeyFeaturesInformation
        ? Object.keys(carKeyFeaturesInformation).filter(key => specificationsList.includes(key))
        : [];

    // Calculate the number of features per column
    const featuresPerColumn = Math.ceil(commonKeys.length / 4);

    // Distribute features evenly across three columns
    const columns = Array.from({length: 4}, (_, i) =>
        commonKeys.slice(i * featuresPerColumn, (i + 1) * featuresPerColumn)
    );

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
                        NextIcon={<img src={nextIcon} alt="Next Icon" className="carousel-buttons"/>}
                        PrevIcon={<img src={previousIcon} alt="Previous Icon" className="carousel-buttons"/>}
                        navButtonsProps={{
                            style: {
                                backgroundColor: 'rgba(255,255,255,0)',
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
                        <p className="detail-value">{vinDetailsInformation?.mileage} miles</p>
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
                        <p className="detail-label">Dealer Link:</p>
                        <a href={record?.clickoffUrl}
                           className="dealer-link">{vinDetailsInformation?.dealerName}</a>
                    </div>
                    <div className="detail-item">
                        <img src={distanceIcon} alt="Dealer Distance Icon" className="detail-icon"/>
                        <p className="detail-label">Dealer Distance:</p>
                        <p className="detail-value">{record?.distanceFromOrigin} miles</p>
                    </div>
                </div>
                <div className="tabs-container">
                    <Tabs selectedIndex={activeTab} onSelect={(index: number) => setActiveTab(index)}>
                        <TabList>
                            <Tab>More Details</Tab>
                            <Tab>Specs</Tab>
                            <Tab>Others</Tab>
                        </TabList>
                        {/*</div>*/}
                        <TabPanel>
                            <div className="tabs">
                                <div className="specifications">
                                    <div className="detail-item">
                                        <p className="detail-text">Display
                                            Color: {record?.displayColor || 'Not available'}</p>
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
                                            <p className="detail-text">Fair Price
                                                High: {additionalDetails.fairPriceHigh}</p>
                                        </div>
                                    )}
                                    {additionalDetails && (
                                        <div className="detail-item">
                                            <p className="detail-text">Fair Price
                                                Low: {additionalDetails.fairPriceLow}</p>
                                        </div>
                                    )}
                                    {additionalDetails && (
                                        <div className="detail-item">
                                            <p className="detail-text">Price Limit
                                                High: {additionalDetails.priceLimitHigh}</p>
                                        </div>
                                    )}
                                    {additionalDetails && (
                                        <div className="detail-item">
                                            <p className="detail-text">Price Limit
                                                Low: {additionalDetails.priceLimitLow}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="tabs">
                                <div className="specifications">
                                    {columns.map((column, columnIndex) => (
                                        <div key={columnIndex} className="spec-column">
                                            {column.map((spec, index) => (
                                                <div key={index} className="spec-item">
                                                    <PhotoIcons
                                                        specifications={{
                                                            [spec]: carKeyFeaturesInformation
                                                                ? carKeyFeaturesInformation[spec as keyof CarListingKeyFeatures]
                                                                : null
                                                        }}
                                                    />
                                                    {carKeyFeaturesInformation && carKeyFeaturesInformation[spec as keyof CarListingKeyFeatures] && (
                                                        <p className="spec-value">
                                                            {carKeyFeaturesInformation[spec as keyof CarListingKeyFeatures]}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                    {/*</div>*/}
                </div>

            </div>
        </div>
    );
}
export default CarDetail;
