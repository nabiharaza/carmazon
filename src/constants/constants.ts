// constants.ts

export interface Filters {
    make: string[];
    model: string;
    mileage: string;
    condition: string;
    state: string;
    city: string;
    zipCode: string;
    latitude: number;
    longitude: number;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface LeftFilterNavbarProps {
    onApplyFilters: (filters: Filters) => void;
}

export interface APIResponse {
    hitsCount: number;
    records: [];
    totalCount: number;
    totalCountFormatted: string;
}

export interface CardData {
    make: string;
    model: string;
    vin: string;
    year: number;
    trim: string;
    price: number;
    state: string;
    city: string;
    mileage: number;
    dealerName: string;
    overlay: string;
    photoUrls: string[];
    primaryPhotoUrl: string;
}

export interface CustomCardProps {
    data: CardData;
}

export interface VinIntelligence {
    targetPrice: number;
    fairPriceHigh: number;
    fairPriceLow: number;
    priceLimitHigh: number;
    priceLimitLow: number;
}

export interface VinDetails {
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

export interface CarListingKeyFeatures {
    listingId: number;
    modelId: number;
    createdAt: string;
}

// Add any other interfaces or constants as needed
