let currCity = "Pune";
let units = "metric";

let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector(".weather__forecast");
let weather__icons = document.querySelector(".weather__icons")
let weather__temperature = document.querySelector(".weather__temperature");
let weather__minmax = document.querySelector(".weather__minmax");
let weather__realfeel = document.querySelector(".weather__realfeel");
let weather__humidity = document.querySelector(".weather__humidity");
let weather__wind = document.querySelector(".weather__wind");
let weather__preassure = document.querySelector(".weather__preassure");

document.querySelector(".Weather_search").addEventListener('submit', e => {
    let search = document.querySelector(".searchform");
    e.preventDefault();
    currCity = search.value;
    search.value = "";
    getWeather();
})
document.querySelector(".weather_units_celsius").addEventListener('click', () => {
    if (units !== "metric") {
        units = "metric";
        getWeather();
    }
});

document.querySelector(".weather_units_farenheit").addEventListener('click', () => {
    if (units !== "imperial") {
        units = "imperial";
        getWeather();
    }
});

function convertTimeStamp(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { timeZone: 'Asia/Kolkata' };
    const formattedDate = date.toLocaleString('en-US', options);
    console.log(formattedDate);

    return date.toLocaleString("en-US", options);
}



function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(country)
};

function getWeather() {
    const API_KEY = 'c41e333854245e4e0026263dc1f2f27a';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data => {
        console.log(data)
        city.innerHTML = `${data.name},${convertCountryCode(data.sys.country)}`;
        datetime.innerHTML = `${convertTimeStamp(data.dt)}`;
        weather__forecast.innerHTML = `${data.weather[0].main}`;
        weather__temperature.innerHTML = `${data.main.temp.toFixed()} ${units === "imperial" ? "&#176 F" : "&#176"}`;
        weather__icons.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`;
        weather__minmax.innerHTML = `<p>Min:${data.main.temp_min}${units === "imperial" ? "&#176 F" : "&#176"}</p><p>Miax:${data.main.temp_max}${units === "imperial" ? "&#176 F" : "&#176"}</p>`;
        weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}${units==="imperial" ? "&#176 F":"&#176"}`;
        weather__humidity.innerHTML = `${data.main.humidity}%`;
        weather__wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph" : "m/s"}`
        weather__preassure.innerHTML = `${data.main.pressure}hpa`

    })
}
getWeather();