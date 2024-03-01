export async function fetchZipCodeCoordinates(zipCode) {
  try {
    // Fetch data from the API
    const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
    const data = await response.json();

    // Extract latitude and longitude coordinates
    const latitude = parseFloat(data.places[0].latitude);
    const longitude = parseFloat(data.places[0].longitude);

    return { latitude, longitude };
  } catch (error) {
    console.error('Error fetching zip code coordinates:', error);
    return null;
  }
}