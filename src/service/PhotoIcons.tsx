import React from 'react';
import './PhotoIcon.css';

// Import your icon images
import sunroofIcon from '../assets/icons/tabs/noun-roadster-3059916.svg';
import carfaxIcon from '../assets/icons/tabs/noun-car-service-5870419.svg';
import carfaxoneIcon from '../assets/icons/tabs/noun-one-2675102.svg';
import foldingRearSeatIcon from '../assets/icons/tabs/folding-rear-seat.svg';
import keylessEntryIcon from '../assets/icons/tabs/keyless-entry.svg';
import bluetoothIcon from '../assets/icons/tabs/noun-bluetooth-2577491.svg';
import navigationIcon from '../assets/icons/tabs/noun-navigation-1014287.svg';
import backupCameraIcon from '../assets/icons/tabs/premium-wheels.svg';
import powerSeatsIcon from '../assets/icons/tabs/power-seats.svg';
import premiumWheelsIcon from '../assets/icons/tabs/premium-wheels.svg';
import towingIcon from '../assets/icons/tabs/towing.svg';
import leatherIcon from '../assets/icons/tabs/noun-car-seat-1694481.svg';
import parkingSensorsIcon from '../assets/icons/tabs/noun-parking-sensor-2128822.svg';
import remoteEngineStartIcon from '../assets/icons/tabs/noun-remote-key-4463754.svg';
import satelliteRadioIcon from '../assets/icons/tabs/noun-satellite-6643511.svg';
import securitySystemIcon from '../assets/icons/tabs/noun-car-security-237337.svg';
import warrantyIcon from '../assets/icons/tabs/noun-warranty-64108.svg';
import tintedWindowsIcon from '../assets/icons/tabs/noun-window-tinting-6118045.svg';
import collisionAvoidanceSystemIcon from '../assets/icons/tabs/noun-car-accident-5075624.svg';
import antiBrakeIcon from '../assets/icons/tabs/noun-abs-warning-light-2128820.svg';
import eligibleForFinancingIcon from '../assets/icons/tabs/noun-finance-6637298.svg';

// Import other icon images as needed
interface Specifications {
    [key: string]: any;
}

interface IconMapping {
    [key: string]: any;
}

const iconMapping: IconMapping = {
    'Sunroof': sunroofIcon,
    'Carfax': carfaxIcon,
    'Carfax One Owner': carfaxoneIcon,
    'Folding Rear Seat': foldingRearSeatIcon,
    'Keyless Entry': keylessEntryIcon,
    'Bluetooth': bluetoothIcon,
    'Navigation': navigationIcon,
    'Backup Camera': backupCameraIcon,
    'Power Seats': powerSeatsIcon,
    'Premium Wheels': premiumWheelsIcon,
    'Towing': towingIcon,
    'Leather': leatherIcon,
    'Parking Sensors': parkingSensorsIcon,
    'Remote Engine Start': remoteEngineStartIcon,
    'Satellite Radio': satelliteRadioIcon,
    'Security System': securitySystemIcon,
    'Warranty': warrantyIcon,
    'Tinted Windows': tintedWindowsIcon,
    'Collision Avoidance System:': collisionAvoidanceSystemIcon,
    'Anti Brake': antiBrakeIcon,
    'Eligible For Financing': eligibleForFinancingIcon,
    // Add other specifications and their corresponding icons here
};


const PhotoIcons: React.FC<{ specifications: Specifications }> = ({specifications}) => {
    return (
        <div className="photo-icons">
            {Object.entries(specifications).map(([spec, value]) => {
                console.log(`Key: ${spec}, Value: ${value}`);
                if (iconMapping[spec]) {
                    console.log(`Matching icon found for ${spec}: ${iconMapping[spec]}`);
                } else {
                    console.log(`No matching icon found for ${spec}`);
                }
                return (
                    <div key={spec} className="photo-icon-item">
                        <img src={iconMapping[spec]} alt={`${spec} Icon`} className="photo-icon"/>
                        <p className="photo-icon-label">{spec}</p>
                    </div>
                );
            })}
        </div>
    );
};


export default PhotoIcons;
