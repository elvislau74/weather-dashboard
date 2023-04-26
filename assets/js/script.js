const weatherAPIKey = "d4ed3cef19cf11d3ba421c419e0afec8";
let userCity = $("#enter-city");
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userCity.value + "&appid=" + weatherAPIKey;
const searchButton = $(".btn");

searchButton.on("click", function(){
    console.log("hello");
});