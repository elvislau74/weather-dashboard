const weatherAPIKey = "d4ed3cef19cf11d3ba421c419e0afec8";
// let citySearched, cityToFind, citySelected;
const searchButton = $(".btn");
let searchHistory = $("#search-history");
let currentCity = $(".current-city");
let currentDate = $(".current-date");
let currentTemp = $(".current-temp");
let currentWind = $(".current-wind");
let currentHumidity = $(".current-humidity");

// let buttonCount = 0;
// let buttonList = [];
// let searchHistoryList = [];
// let newSearch = false;
// let buttonClicked = false;
// let refreshed = false;

// function getCurrentWeatherData(weather) {
//     if (newSearch === true) {
//         citySearched = userCity.value;
//         cityToFind = userCity.value;
//         currentCity.text(citySearched);
//     }
//     else {
//         if (buttonClicked){
//             cityToFind = citySelected;
//             buttonClicked = false;
//         }
//         else {
//             if (refreshed = true) {
//                 currentCity.text("Philadelphia");
//                 cityToFind = "Philadelphia";
//             }
//             else {
//                 cityToFind = userCity.value;
//                 currentCity.text(cityToFind);
//             }
//         }
//     }
    
// }

// function userDataProcessing() {
//     if (userCity.val() !== ""){
//         if (searchHistoryList !== null) {
//             if (searchHistoryList.includes(userCity.value) === false){
//                 if (buttonCount > 7){
//                     searchHistoryList.shift();
//                     searchHistoryList.push(userCity.value);
//                     $("buttonList[0]").removeAttr("id");
//                     buttonList.shift();
//                 }
//                 else {
//                     searchHistoryList.push(userCity.value);
//                     buttonCount++;
//                 }
//                 newSearch = true;
//             }
//             else {
//                 newSearch = false;
//             }
//         }
//         else {
//             searchHistoryList = [];
//             searchHistoryList.push(userCity.value);
//             newSearch = true;
//             buttonCount++;
//         }
//     }
//     else {
//         newSearch = false;
//     }
// }

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
    //   console.log(data.main.temp)
    })
}
