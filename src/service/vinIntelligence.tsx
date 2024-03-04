interface VinIntelligence {
    targetPrice: number;
    fairPriceHigh: number;
    fairPriceLow: number;
    priceLimitHigh: number;
    priceLimitLow: number;
}
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
