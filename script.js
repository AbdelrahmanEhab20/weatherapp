const apiKey = "96999a2307671c1002bc71c6522a38c4";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

// access the fields that will take data from
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
//  the functionality of getting the data from the api
async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);
  //### ERROR HANDLING
  if (response.status != 200) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".error").style.display = "none";

    var dataFetched = await response.json();
    // city data
    document.querySelector(".city").innerHTML = dataFetched.name;
    // temp data
    document.querySelector(".temp").innerHTML =
      Math.round(dataFetched.main.temp) + "°c";
    // humidity data
    document.querySelector(".humidity").innerHTML =
      dataFetched.main.humidity + "%";
    // wind data
    document.querySelector(".wind").innerHTML =
      dataFetched.wind.speed + " km/h";

    // change the image of weather according to the values
    if (dataFetched.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (dataFetched.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (dataFetched.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (dataFetched.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (dataFetched.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    // display the weather div after enter data
    document.querySelector(".weather").style.display = "block";
  }
}
// listener for the button to get the data of field
searchBtn.addEventListener("click", () => {
  //call the function and the value of city
  checkWeather(searchBox.value);
});
