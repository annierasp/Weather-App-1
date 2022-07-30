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
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

search("Kyiv");
