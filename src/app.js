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

function searchCityValue(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-name").value;
  search(city);
}

let citySearch = document.querySelector("#search-city");
citySearch.addEventListener("submit", searchCityValue);

function search(city) {
  let apiKey = "080cbfa2309f6d5006d04e646210a21b";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showTemperature);
}

function showTemperature(response) {
  let dateElement = document.querySelector("#date");
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

search("Kyiv");
