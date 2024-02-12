function refreshWeatherData(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#current-icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

  getForecast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "t45f96b34088a1ob056e37a2a463d49d";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiURL).then(displayForecast);
}

function displayForecast(response) {
  // let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      let date = day.date;
      forecastHTML =
        forecastHTML +
        `<div class="weather-forecast-days" id="forecast">
      <div class="temperature-day">${formatDay(day.time)}</div><br />
      <img src="${day.condition.icon_url}" class="icon" /><br />
      <div class="weather-forecast-temperatures"><br />      
      <div class="weather-forecast-temperature">         
          <strong>${Math.round(
            day.temperature.maximum
          )}º</strong></div><div class="weather-forecast-temperature">${Math.round(
          day.temperature.minimum
        )}º</div>  
             
       </div>          
      </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form"); // corrected selector
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Paris");
