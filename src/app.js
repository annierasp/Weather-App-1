function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
            <div class="date">${formatDay(forecastDay.dt)}</div>
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" class="forecast-icon" id="forecast-icon" />
            <div class="forecast-temperature">${Math.round(
              forecastDay.temp.day
            )}°</div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "080cbfa2309f6d5006d04e646210a21b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function searchCityValue(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-name").value;
  search(city);
}

function search(city) {
  let apiKey = "080cbfa2309f6d5006d04e646210a21b";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showTemperature);
}

function showTemperature(response) {
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#current-weather-image");
  let backgroundGradient = document.querySelector("#current-weather");
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  if (response.data.weather[0].main === "Clear") {
    backgroundGradient.style.background =
      "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 235, 170, 1) 100%)";
  } else if (
    response.data.weather[0].main === "Clouds" ||
    response.data.weather[0].main === "Snow" ||
    response.data.weather[0].main === "Drizzle" ||
    response.data.weather[0].main === "Rain"
  ) {
    backgroundGradient.style.background =
      "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(116,178,247,1) 100%)";
  } else if (response.data.weather[0].main === "Thunderstorm") {
    backgroundGradient.style.background =
      "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(3,41,83,1) 100%)";
  }

  getForecast(response.data.coord);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperature = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

celsiusTemperature = null;

let citySearch = document.querySelector("#search-city");
citySearch.addEventListener("submit", searchCityValue);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("Kyiv");
