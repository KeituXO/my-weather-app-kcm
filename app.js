function refreshWeatherData(response) {}

function searchCity(city) {
  // make the api call and update the interface
  // separation of concerns, functions to do one thing and do it well
  let apiKey = "t45f96b34088a1ob056e37a2a463d49d";
  let apiURL =
    "https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units${metric}";
  axios.get(apiURL).then(updateWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-Form");
searchFormElement.addEventListener("submit", handleSearch);
