export async function fetchCarListingData(queryString?: string): Promise<APIResponse | null> {
    try {
        const apiUrl: string = `https://auto.dev/api/listings?${queryString}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        localStorage.setItem('jsonData', JSON.stringify(data.records));
        console.log('Fetched JSON Data:', data);
        return data

    }
    catch (error) {
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

        const { targetPrice, fairPriceHigh, fairPriceLow, priceLimitHigh, priceLimitLow } = listimate;
        return { targetPrice, fairPriceHigh, fairPriceLow, priceLimitHigh, priceLimitLow };
    } catch (error) {
        console.error('Error fetching VIN intelligent analysis:', error);
        return null;
    }
}

export async function vinDetails(vin?: string): Promise<VinIntelligence | null> {
    try {
        const apiUrl: string = `https://auto.dev/api/listings/${vin}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('Fetched vin detailsJSON Data:', data);
        return data
    } catch (error) {
        console.error('Error fetching VIN intelligent analysis:', error);
        return null;
    }
}