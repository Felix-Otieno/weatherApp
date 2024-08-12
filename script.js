const apiKey = "bf9a1992983cad6a904f8e76d92e3d97";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const locationInput = document.getElementById("locationInput");
const  searchButton =  document.getElementById("searchButton");
const locationElement = document.getElementById("locationElement");
const temperatureElement = document.getElementById("temperatureElement");
const descriptionElement = document.getElementById("descriptionElement");

searchButton.addEventListener("click", () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}$units=metrics`;
    fetch(url)
    .then((response) => {
        if(!response.ok) {
            throw new Error("Weather data is not available for the entered location");
        }
        return response.json();
    })
    .then((data) => {
        locationElement.textContent = data.name;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent = data.weather [0].description;
    })
    .catch((error) => {
        console.error("Error fetching weather data:", error);
        locationElement.textContent = "Error fetching data";
        temperatureElement.textContent = "";
        descriptionElement.textContent = "";
    });
}