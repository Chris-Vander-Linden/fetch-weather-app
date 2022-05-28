import FetchWrapper from "./modules/fetch-wrapper.js";

const resultArea = document.querySelector("#folder #result-area");
const textField = document.querySelector("#filter");
const mercury = document.querySelector("#mercury")
const ball = document.querySelector(".ball")
const key = "e2ab0cf423d3fd3dde9b75239925987e";

// check out diff scope between arrow and normal function
textField.addEventListener("keyup", function (event) {

  // exit function if zipcode length doesn't equal 5
  // use https://lodash.com/docs/4.17.11#debounce to prevent multi calls
  if (this.value.length != 5) return;

  // catch error if no results

  // set zipcode value
  let zip = this.value;

  // create final endpoint by combining zip value with key
  let endpoint = zip + ",us&appid=e2ab0cf423d3fd3dde9b75239925987e&units=imperial";
  const API = new FetchWrapper(`https://api.openweathermap.org/data/2.5/weather?zip=`);

  // call instance get method for API
  API.get(endpoint).then(data => {
    // inspect data object
    console.log(data);
    const temp = Math.round(data.main.temp);

    let timeOfDay = "";
    // day or night
    if (data.dt > data.sys.sunrise && data.dt < data.sys.sunset) {
      timeOfDay = "day";
    } else {
      timeOfDay = "night";
    }

    resultArea.innerHTML = "";
    // insert data in results area
    resultArea.insertAdjacentHTML("beforeend",
      `<div>
        <h2>
        Weather
        </h2>
        <p>
          To${timeOfDay}, in ${data.name}... ${data.weather[0].description} and the temperature is ${temp}&#176;.${data.weather[0].description}<br>
          Temperature: ${temp}&#176;<br>
          Cloud cover: ${data.clouds.all}%<br>
          Wind Speed: ${data.wind.speed} mph<br>
          Base Weather Cond: ${data.weather[0].main}<br>
          Time of day: ${data.dt}<br>
          Sunrise: ${data.sys.sunrise}<br>
          Sunset: ${data.sys.sunset}<br>
          Day or Night: ${timeOfDay}<br>
        </p>
      </div>`
    )
    mercury.setAttribute("style", `height:${temp / 1.3}%`);

    ball.innerHTML = temp + "&#176";

    // should maybe declare these outside scope since they will be updated by other widget.
    const weather = data.weather[0].main.toLowerCase() + '-weather';
    const cloudCover = 'cloud-cover-percent-' + data.clouds.all;
    const windSpeed = 'wind-mph-' + Math.round(data.wind.speed);



    // add weather classes to body
    let classes = [timeOfDay, weather, cloudCover, windSpeed];
    document.querySelector("body").classList.add(...classes);
  });
});



/*
Cloudiness, % 
data.clouds.all: 46
data.wind.speed: 4

data.dt: 1649982538
data.sys.sunrise: 1649935656
data.sys.sunset: 1649983511

data.weather.icon: 10n

How to get icon URL
For code 500 - light rain icon = "10d". See below a full list of codes
URL is http://openweathermap.org/img/wn/10d@2x.png


data.weather[0].main: 

Clouds
Clear
Snow
Rain
Drizzle
Thunderstorm

... are others but not worth it.  Use this for classes.
*/

const resultAreaTabs = document.querySelectorAll("#result-area-container li");

resultAreaTabs.forEach(tab => {
  console.log(tab);
  tab.addEventListener("click", event => {
    // clear active class from tabs
    resultAreaTabs.forEach(tab => {
      tab.className = "";
    })
    // add active class to tab
    tab.className = "active";
  });
});

