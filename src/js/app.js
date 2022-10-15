console.log("KIII");
const weather = document.querySelector("form");
const input = document.querySelector("input");
const mes1 = document.querySelector("#m1");
const mes2 = document.querySelector("#m2");
const state = document.querySelector("#state");
const lan = document.querySelector("#lan");
const lon = document.querySelector("#lon");
const temp = document.querySelector("#temp");
const Weather_Description = document.querySelector("#Weather_Description");
const Humidity = document.querySelector("#Humidity");
const cloud = document.querySelector("#cloud");
weather.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();
  const location = input.value;

  mes1.textContent = "Loading.....";
  fetch("http://localhost:3030/weather?location=" + location).then(
    (response) => {
      response.json().then((data) => {
        console.log(data);
        if (data.Result) {
          mes1.textContent = data.Result;
          document.querySelector("section").style.background = "red";
          console.log("/////");
        } else {
          document.querySelector("section").style.background = "#98fb98";
          mes2.textContent = "Country: " + data.Country;
          state.textContent = "State: " + data.State;
          lan.textContent = "Latitute: " + data.lat;
          lon.textContent = "Longitude: " + data.lon;
          temp.textContent = "Temperature: " + data.Temperature;
          Weather_Description.textContent =
            "Weather_Description: " + data.Weather_Description;
          Humidity.textContent = "Humidity: " + data.Humidity;
          cloud.textContent = "CloudCover: " + data.CloudCover;
          console.log(data);
        }
      });
    }
  );
});
