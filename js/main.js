//* DOM Elements *//
// form
const form = document.getElementById("form");
// input
const input = document.getElementById("input");
// city
const city = document.getElementById("city");
// Temp
const temp = document.getElementById("temp");
// cloud
const cloud = document.getElementById("cloudInfo");
// wind
const wind = document.getElementById("windInfo");
// rain
const rain = document.getElementById("rainInfo");
// body
const body = document.getElementById("body");
// main
const main = document.getElementById("main");

// - - - - - - - - - - - - //

//* FUNTIONS *//
// submitfuntion
function submitFuntion(e) {
  event.preventDefault();
  search(input.value);
}
// Convert temp
function toCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}
// Save input value in local storage
const storage = new Array();
function saveLocalstorage() {
  storage.push(input.value);
  const local = localStorage.setItem("city", JSON.stringify(storage));
}

// * API *//
// API information
const api = {
  key: "4a0a8bd3ea239296a9ca3cb52d05a0d4",
  url: "https://api.openweathermap.org/data/2.5/weather",
};
// Get api information
async function search(query) {
  try {
    const response = await fetch(
      `${api.url}?q=${query}&appid=${api.key}&lang=en`
    );

    const data = await response.json();
    // City info
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    // Temp info
    const tempValue = toCelsius(data.main.temp);
    temp.innerHTML = `${tempValue}${"°"}`;
    // Cloud info
    cloud.innerHTML = `${data.clouds.all}${"%"}`;
    // Wind info
    wind.innerHTML = `${data.wind.speed}${"m/s"}`;
    // Rain info
    rain.innerHTML = `${data.main.humidity}${"%"}`;
    // - - - //
    // Local Storage
    saveLocalstorage();
    // Console log
    console.log(data);
    // Body Style Change
    if (tempValue <= 10) {
      // Body
      body.classList.remove("body-2", "body-3");
      body.classList.add("body-1");
      // Main
      main.classList.remove("main-2", "main-3");
      main.classList.add("main");
      // Emoji
      Toastify({
        text: "\u2744\ufe0f",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: {
          background: "transparent",
        },
      }).showToast();
    } else if (tempValue <= 25) {
      // Body
      body.classList.remove("body-1", "body-3");
      body.classList.add("body-2");
      // Main
      main.classList.remove("main", "main-3");
      main.classList.add("main-2");
      // Emoji
      Toastify({
        text: "\ud83c\udf08",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: {
          background: "transparent",
        },
      }).showToast();
    } else {
      // Body
      body.classList.remove("body-1", "body-2");
      body.classList.add("body-3");
      // Main
      main.classList.remove("main", "main-2");
      main.classList.add("main-3");
      // Emoji
      Toastify({
        text: "\ud83d\udd25",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: {
          background: "transparent",
        },
      }).showToast();
    }
  } catch (error) {
    console.log(error);
  }
}

// - - - - - - - - - - - - //

//* EVENTS *//
//
const submitEvent = form.addEventListener("submit", submitFuntion, true);
