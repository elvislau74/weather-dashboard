const weatherAPIKey = "d4ed3cef19cf11d3ba421c419e0afec8";
let userCity = $("#enter-city");
let citySearched, cityToFind, citySelected;
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userCity.value + "&appid=" + weatherAPIKey + "&units=imperial";
const searchButton = $(".btn");
let searchHistory = $("#search-history");
let currentCity = $(".current-city");
let currentDate = $(".current-date");
let currentTemp = $(".current-temp");
let currentWind = $(".current-wind");
let currentHumidity = $(".current-humidity");

let buttonCount = 0;
let buttonList = [];
let searchHistoryList = [];
let newSearch = false;
let buttonClicked = false;
let refreshed = false;

function getCurrentWeatherData(weather) {
    if (newSearch === true) {
        citySearched = userCity.value;
        cityToFind = userCity.value;
        currentCity.text(citySearched);
    }
    else {
        if (buttonClicked){
            cityToFind = citySelected;
            buttonClicked = false;
        }
        else {
            if (refreshed = true) {
                currentCity.text("Philadelphia");
                cityToFind = "Philadelphia";
            }
            else {
                cityToFind = userCity.value;
                currentCity.text(cityToFind);
            }
        }
    }
    
}

function userDataProcessing() {
    if (userCity.value !== ""){
        if (searchHistoryList !== null) {
            if (searchHistoryList.includes(userCity.value) === false){
                if (buttonCount > 7){
                    searchHistoryList.shift();
                    searchHistoryList.push(userCity.value);
                    $("buttonList[0]").removeAttr("id");
                    buttonList.shift();
                }
                else {
                    searchHistoryList.push(userCity.value);
                    buttonCount++;
                }
                newSearch = true;
            }
            else {
                newSearch = false;
            }
        }
        else {
            searchHistoryList = [];
            searchHistoryList.push(userCity.value);
            newSearch = true;
            buttonCount++;
        }
    }
    else {
        newSearch = false;
    }
}

searchButton.on("click", function(){
    console.log("hello");
    if (userCity.value !== ""){
        fetch(queryURL)
            .then((response => response.json())
            .then(userDataProcessing))
            .then(getCurrentWeatherData)
    }

});