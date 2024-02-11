function refreshWeatherData(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "t45f96b34088a1ob056e37a2a463d49d";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiURL).then(refreshWeatherData); // corrected function name
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form"); // corrected selector
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Paris");
+displayForecast();

function displayForecast() {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="weather-forecast-days" id="forecast">
      <div class="temperature-day">Fri</div><br />
      <div class="icon">🌤️</div><br />      
      <div class="weather-forecast-temperatures">      
      <div class="weather-forecast-temperature">      
          <strong>24 &degC</strong></div>  
      <div class="weather-forecast-temperature">15 &degC</div>        
       </div>          
      </div>`;
  });

  let forecast = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}
