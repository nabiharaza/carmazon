export async function fetchCarListingData(queryString?: string): Promise<APIResponse | null> {
    try {
        const apiUrl: string = `https://auto.dev/api/listings?${queryString}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Write fetched JSON data to local temporary file
        localStorage.setItem('jsonData', JSON.stringify(data.records));
        console.log('Fetched JSON Data:', data);
        return data

    }
    catch (error) {
        console.error('Error fetching zip code coordinates:', error);
        return null;
    }
};