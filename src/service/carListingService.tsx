export async function fetchCarListingData(queryString?: string): Promise<APIResponse | null> {
    try {
        const apiUrl: string = `https://auto.dev/api/listings?${queryString}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        localStorage.setItem('jsonData', JSON.stringify(data.records));
        console.log('Fetched JSON Data:', data);
        return data

    } catch (error) {
        console.error('Error fetching zip code coordinates:', error);
        return null;
    }
};

export async function vinIntelligentAnalysis(vin?: string): Promise<VinIntelligence | null> {
    try {
        const apiUrl: string = `https://auto.dev/api/vin/${vin}/intelligence`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        const listimate = data.listimate;
        if (!listimate) {
            return null;
        }

        const {targetPrice, fairPriceHigh, fairPriceLow, priceLimitHigh, priceLimitLow} = listimate;
        return {targetPrice, fairPriceHigh, fairPriceLow, priceLimitHigh, priceLimitLow};
    } catch (error) {
        console.error('Error fetching VIN intelligent analysis:', error);
        return null;
    }
}

export async function vinDetails(vin?: string): Promise<VinDetails | null> {
    try {
        const apiUrl: string = `https://auto.dev/api/listings/${vin}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('Fetched vin detailsJSON Data:', data);
        return data
    } catch (error) {
        console.error('Error fetching VIN Details :', error);
        return null;
    }
}

export async function carKeyFeatures(vin?: string): Promise<{ originalData: CarListingKeyFeatures | null, filteredData: CarListingKeyFeatures | null }> {
    try {
        const apiUrl: string = `https://auto.dev/api/vin/${vin}/listing`;
        const response = await fetch(apiUrl);
        const originalData = await response.json();
        console.log('Fetched Car listing Key Features Data:', originalData);

        // Filter out fields with boolean values set to false or other values set to null
        const filteredData: Partial<CarListingKeyFeatures> = {};

        for (const key in originalData) {
            if (originalData.hasOwnProperty(key)) {
                const value = originalData[key];
                if (typeof value !== 'boolean' || value) {
                    // Convert field name to sentence case and remove colon
                    const fieldName = key.replace(/([A-Z])/g, ' $1').trim(); // Add space before capital letters
                    const sentenceCaseFieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1); // Capitalize first letter
                    const fieldNameWithoutColon = sentenceCaseFieldName.replace(':', ''); // Remove colon
                    // Remove undesired fields
                    if (fieldNameWithoutColon !== 'Primary Photo Url' && fieldNameWithoutColon !== 'Recent Price Drop') {
                        filteredData[fieldNameWithoutColon as keyof CarListingKeyFeatures] = value;
                    }
                }
            }
        }

        return { originalData, filteredData } as { originalData: CarListingKeyFeatures | null, filteredData: CarListingKeyFeatures | null };
    } catch (error) {
        console.error('Error fetching VIN Details :', error);
        return { originalData: null, filteredData: null };
    }
}
