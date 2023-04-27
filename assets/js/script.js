const weatherAPIKey = "d4ed3cef19cf11d3ba421c419e0afec8";
let forecastCount;
let weatherIcon;
let longitude, latitude;
const searchButton = $(".btn");
let searchHistory = $("#search-history");
let currentCity = $(".current-city");
let currentDate = $(".current-date");
let currentTemp = $(".current-temp");
let currentWind = $(".current-wind");
let currentHumidity = $(".current-humidity");
let monthNow, dayNow, yearNow, dateNow, unixDate, dateConverted;

function convertUnixTime(unixDate) {
  dateConverted = new Date(unixDate*1000);
  monthNow = dateConverted.getMonth() + 1;
  dayNow = dateConverted.getDate();
  yearNow = dateConverted.getFullYear();
  dateNow = `${monthNow}/${dayNow}/${yearNow}`
  return dateNow;
};

function init() {
  userCity = $("#enter-city");
  let cityToSearch = localStorage.getItem("search-input");
  queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityToSearch + "&appid=" + weatherAPIKey + "&units=imperial";
  $("#search-input").children("#enter-city").val(localStorage.getItem("search-input"));

  if (userCity.val() == "") {
    cityToSearch = "Philadelphia";
    userCity.val(cityToSearch);
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityToSearch + "&appid=" + weatherAPIKey + "&units=imperial";
    getCurrentWeather(queryURL);
  }
  else {
    cityToSearch = localStorage.getItem("search-input");
    userCity.val(cityToSearch);
    getCurrentWeather(queryURL);
  }

};

init();

function getCurrentWeather(queryURL) {
  fetch(queryURL)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    latitude = data.coord.lat;
    longitude = data.coord.lon;
    weatherIcon = data.weather[0].icon;
    unixDate = data.dt;
    console.log(unixDate);
    console.log(latitude);
    console.log(data);
    console.log(weatherIcon);
    currentCity.text(data.name);
    $(".city-and-date").children(".icon").attr("src", `https://openweathermap.org/img/wn/${weatherIcon}.png`);
    currentDate.text(convertUnixTime(unixDate));
    currentTemp.text(data.main.temp);
    currentWind.text(data.wind.speed);
    currentHumidity.text(data.main.humidity);
    fiveDayForecast(latitude, longitude);
    });
};

searchButton.on("click", function(){
    let userCity = $("#enter-city");
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity.val() + "&appid=" + weatherAPIKey + "&units=imperial";
    console.log(userCity.val());
    cityToSearch = userCity.value;
    if (userCity.val() !== ""){
      getCurrentWeather(queryURL);
    }
    let citySearched = userCity.val()
    let siblingClass = $(this).parent().siblings().attr("id");
    localStorage.setItem(siblingClass, citySearched);
    console.log(siblingClass);

    // createHistoryButtons(cityToSearch);

});

// function createHistoryButtons(cityToSearch) {
//   let historyButton = $("<button>");
//   historyButton.text(cityToSearch);
//   historyButton.attr("class", "history-btn");
//   searchHistory.append(historyButton);
//   searchHistory.css("display", "flex")
//   // historyButton.attr("")
// }

function fiveDayForecast(lat, lon){
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat +"&lon=" + lon + "&appid=" + weatherAPIKey + "&units=imperial";
fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.list[9].main.humidity);
      forecastCount = 0;
      for (var i = 0; i < 5; i++) {
        let fivedays = $(`#day${i}`);
        weatherIcon = data.list[forecastCount].weather[0].icon;
        unixDate = data.list[forecastCount].dt;
        fivedays.children(".date").text(convertUnixTime(unixDate));
        console.log(data.list[forecastCount].dt_txt);
        fivedays.children().attr("src", `https://openweathermap.org/img/wn/${weatherIcon}.png`)
        fivedays.children().children(".temp").text(data.list[forecastCount].main.temp);
        fivedays.children().children(".wind").text(data.list[forecastCount].wind.speed);
        fivedays.children().children(".humidity").text(data.list[forecastCount].main.humidity);
        forecastCount = forecastCount + 8;
        console.log(forecastCount);
      }
    })
}
