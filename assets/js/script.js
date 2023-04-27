// API key along with all the variables
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

// Unix time converter function to convert dates pulled from the API
// the time conversion methods were taught to me from a fellow bootcamp student/colleague, Myro Joy Lee
function convertUnixTime(unixDate) {
  dateConverted = new Date(unixDate*1000);
  monthNow = dateConverted.getMonth() + 1;
  dayNow = dateConverted.getDate();
  yearNow = dateConverted.getFullYear();
  dateNow = `${monthNow}/${dayNow}/${yearNow}`
  return dateNow;
};

// this init function causes the page to be set to a default city, "Philadelphia"
// and pulls from local storage to change that default after user input
// on refresh, the city weather information inputted by the guest will persist on the page
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

// Calling the init function
init();

// This function fetches the current weather data from the API, linking some to variables for further use
// and also pastes some of that information onto the html page.
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
    currentCity.text(data.name);
    $(".city-and-date").children(".icon").attr("src", `https://openweathermap.org/img/wn/${weatherIcon}.png`);
    currentDate.text(convertUnixTime(unixDate));
    currentTemp.text(data.main.temp);
    currentWind.text(data.wind.speed);
    currentHumidity.text(data.main.humidity);
    // Calls the function to fetch the five day forecast with inputs of longitude and latitude
    fiveDayForecast(latitude, longitude);
    });
};

// Click event listener
// It calls on the getCurrentWeather function to pull data from the API and put on page
// It also grabs user input from the page, setting it to local storage for later use
searchButton.on("click", function(){
    let userCity = $("#enter-city");
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity.val() + "&appid=" + weatherAPIKey + "&units=imperial";
    cityToSearch = userCity.value;
    if (userCity.val() !== ""){
      getCurrentWeather(queryURL);
    }
    let citySearched = userCity.val()
    let siblingClass = $(this).parent().siblings().attr("id");
    localStorage.setItem(siblingClass, citySearched);

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

// this function fetches information from the API to use for the five day forecast portion of the page
function fiveDayForecast(lat, lon){
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat +"&lon=" + lon + "&appid=" + weatherAPIKey + "&units=imperial";
fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      forecastCount = 0;
      for (var i = 0; i < 5; i++) {
        let fivedays = $(`#day${i}`);
        weatherIcon = data.list[forecastCount].weather[0].icon;
        unixDate = data.list[forecastCount].dt;
        fivedays.children(".date").text(convertUnixTime(unixDate));
        fivedays.children().attr("src", `https://openweathermap.org/img/wn/${weatherIcon}.png`)
        fivedays.children().children(".temp").text(data.list[forecastCount].main.temp);
        fivedays.children().children(".wind").text(data.list[forecastCount].wind.speed);
        fivedays.children().children(".humidity").text(data.list[forecastCount].main.humidity);
        forecastCount = forecastCount + 8;
      }
    })
}
