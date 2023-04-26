const weatherAPIKey = "d4ed3cef19cf11d3ba421c419e0afec8";
let userCity = $("#enter-city");
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userCity.value + "&appid=" + weatherAPIKey + "&units=imperial";
const searchButton = $(".btn");
let searchHistory = $("#search-history");

let buttonCount = 0;
let buttonList = [];
let searchHistoryList = [];
let newSearch = false;

function getCurrentWeatherData(weather) {
    if (newSearch === true) {
        
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
            .then()
    }

});