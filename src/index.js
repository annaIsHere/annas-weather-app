let now = new Date();
let h3 = document.querySelector("h3");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
const apiKey = "bf1a00186364b8a343b2844041168262";
const units = "imperial";

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

h3.innerHTML = `${day}, ${date}, ${hours
  .toString()
  .padStart(2, "0")} : ${minutes.toString().padStart(2, "0")}`;
//

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let city = apiCity();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  apiCity();
  axios.get(apiUrl).then(showTemperature);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}

function apiCity() {
  return document.querySelector("#city-search").value;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  let city = response.data.name;
  let message = `${city}`;
  let weather = response.data.weather[0].description;
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let h1 = document.querySelector("h1");
  h1.innerHTML = message;
  let farenheight = document.querySelector("#farenheight");
  farenheight.innerHTML = `${temperature}`;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${weather}`;
  let maxTemp = document.querySelector("#dayTemp");
  maxTemp.innerHTML = `Day Temp <strong>${tempMax}Fº</strong>`;
  let minTemp = document.querySelector("#nightTemp");
  minTemp.innerHTML = `Night Temp <strong>${tempMin}Fº</strong>`;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `Humidity is at <strong>${humidity}%</strong>`;
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = `Wind Speed <strong>${wind} mph</strong>`;
}
//
function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}
let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);
function getCurrentPosition() {
  return navigator.geolocation.getCurrentPosition(retrievePosition);
}
