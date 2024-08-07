//API LINK
//          https://www.weatherapi.com/     // 
// DEMO: https://routeweather.netlify.app/


// Base URL: http://api.weatherapi.com/v1



//  today

let todayName = document.getElementById("today_name");
let todayNumber = document.getElementById("today_number");
let todayMonth = document.getElementById("today_month");
let todayLocation = document.getElementById("today_location");
let todayTemp = document.getElementById("today_temp");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let direction = document.getElementById("direction");
let todayCondition = document.getElementById("today_condition");

//  next

let nextName = document.getElementById("next_name");
let nextMaxTemp = document.getElementById("next_max_temperature");
let nextMinTemp = document.getElementById("next_min_temperature");
let nextCondition = document.getElementById("next_condition");

let thirdName = document.getElementById("third_name");
let thirdMaxTemp = document.getElementById("third_max_temperature");
let thirdMinTemp = document.getElementById("third_min_temperature");
let thirdCondition = document.getElementById("third_condition");

console.log(todayName, todayNumber, todayMonth, todayLocation, todayTemp, humidity, wind, direction, todayCondition, nextName, nextMaxTemp, nextMinTemp, nextCondition, thirdName, thirdMaxTemp, thirdMinTemp, thirdCondition);

//  third
async function getWeatherData(city) {
    let apiKey = '9d6912a91d6e46ad9e7103205241407'; 
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
    let weatherData = await weatherResponse.json();
    return weatherData;
}

// Display today
function displayToday(data) {
    let date = new Date(data.location.localtime);
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c + '°C';
    humidity.innerHTML = data.current.humidity + '%';
    wind.innerHTML = data.current.wind_kph + ' km/h';
    direction.innerHTML = data.current.wind_dir;
    todayCondition.innerHTML = data.current.condition.text;
    todayName.innerHTML = date.toLocaleDateString('en-US', { weekday: 'long' });
    todayNumber.innerHTML = date.getDate();
    todayMonth.innerHTML = date.toLocaleDateString('en-US', { month: 'long' });
}

// Display next day
function displayNext(data) {
    let nextDay = data.forecast.forecastday[1];
    let nextDate = new Date(nextDay.date);
    nextName.innerHTML = nextDate.toLocaleDateString('en-US', { weekday: 'long' });
    nextMaxTemp.innerHTML = nextDay.day.maxtemp_c + '°C';
    nextMinTemp.innerHTML = nextDay.day.mintemp_c + '°C';
    nextCondition.innerHTML = nextDay.day.condition.text;
}

// Display third day
function displayThird(data) {
    let thirdDay = data.forecast.forecastday[2];
    let thirdDate = new Date(thirdDay.date);
    thirdName.innerHTML = thirdDate.toLocaleDateString('en-US', { weekday: 'long' });
    thirdMaxTemp.innerHTML = thirdDay.day.maxtemp_c + '°C';
    thirdMinTemp.innerHTML = thirdDay.day.mintemp_c + '°C';
    thirdCondition.innerHTML = thirdDay.day.condition.text;
}

// Start website
async function startWebsite(city = 'Cairo') {
    let weatherData = await getWeatherData(city);
    displayToday(weatherData);
    displayNext(weatherData);
    displayThird(weatherData);
}

// Event listener for search button
document.getElementById('search-button').addEventListener('click', () => {
    let city = document.getElementById('search-input').value;
    if (city) {
        startWebsite(city);
    }
});

startWebsite();


