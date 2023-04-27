const weatherAPIKey = "d4ed3cef19cf11d3ba421c419e0afec8";
let forecastCount;
const searchButton = $(".btn");
let searchHistory = $("#search-history");
let currentCity = $(".current-city");
let currentDate = $(".current-date");
let currentTemp = $(".current-temp");
let currentWind = $(".current-wind");
let currentHumidity = $(".current-humidity");

function init() {

};

searchButton.on("click", function(){
    let userCity = $("#enter-city");
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userCity.val() + "&appid=" + weatherAPIKey + "&units=imperial";
    console.log(userCity.val());
    if (userCity.val() !== ""){
        fetch(queryURL)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
            let latitude = data.coord.lat;
            let longitude = data.coord.lon;
            console.log(latitude);
            console.log(data)
            currentCity.text(data.name);
            currentTemp.text(data.main.temp);
            currentWind.text(data.wind.speed);
            currentHumidity.text(data.main.humidity);
            fiveDayForecast(latitude, longitude);
            displayCurrentDate();
            })
    }
    let citySearched = userCity.val()

    localStorage.setItem(item, citySearched);

});

function displayCurrentDate() {
    var currentDay = dayjs();
    currentDate.text(currentDay.format('MM/DD/YYYY'))
    }

function fiveDayForecast(lat, lon){
    let queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat +"&lon=" + lon + "&appid=" + weatherAPIKey + "&units=imperial";
fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.list[9].main.humidity);
      for (var i = 0; i < 5; i++) {
        let fivedays = $(`#day${i}`);
        forecastCount = 0;
        fivedays.children().children(".date").text(data.list[forecastCount].dt_txt);
        fivedays.children().children(".temp").text(data.list[forecastCount].main.temp);
        fivedays.children().children(".wind").text(data.list[forecastCount].wind.speed);
        fivedays.children().children(".humidity").text(data.list[forecastCount].main.humidity);
        forecastCount = forecastCount + 9;
        console.log(forecastCount);
      }
    // $("#day0").children().children(".humidity").text(data.list[0].main.humidity);
    // $("#day2").children().children(".humidity").text(data.list[9].main.humidity);
    // $("#day3").children().children(".humidity").text(data.list[18].main.humidity);
    // $("#day4").children().children(".humidity").text(data.list[27].main.humidity);
    // $("#day5").children().children(".humidity").text(data.list[36].main.humidity);
    })
}
