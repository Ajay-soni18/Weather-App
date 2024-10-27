document.addEventListener("DOMContentLoaded", () => {
  const cityName = document.getElementById("cityName");
  const searchBtn = document.getElementById("searchBtn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const tempDisplay = document.getElementById("temperature");
  const discriptionDisplay = document.getElementById("description");
  const errorDisplay = document.getElementById("Error");
  const API_KEY = "30b23093b3ad95686b61a7e684bd512c";

  searchBtn.addEventListener("click", async () => {
    const city = cityName.value.trim();
    if (city === "") return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });
  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City Not Found");
    }
    const data = await response.json();
    return data;
  }
  function displayWeatherData(data) {
    console.log(data);
    const { name, weather, main } = data;
    cityNameDisplay.textContent = name;
    tempDisplay.textContent = `${main.temp}°C`;
    discriptionDisplay.textContent = weather[0].description;
    weatherInfo.classList.remove("hidden");
    errorDisplay.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorDisplay.classList.remove("hidden");
  }
});
