interface Filters {
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

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface LeftFilterNavbarProps {
    onApplyFilters: (filters: Filters) => void;
}

interface APIResponse {
    hitsCount: number;
    records: [];
    totalCount: number;
    totalCountFormatted: string;
}

interface CardData {
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

interface CustomCardProps {
    data: CardData;
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


interface CarListingKeyFeatures {
    listingId: number;
    modelId: number;
    createdAt: string;
}