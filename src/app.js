const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const Req = require("request");
const publicDirectoryPath = path.join(__dirname, "../public");
const viewDirectoryPath = path.join(__dirname, "../src/templates/views");
const partialsDirectoryPath = path.join(__dirname, "../src/templates/partials");
app.set("view engine", "hbs");
app.set("views", viewDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);
app.use(express.static(publicDirectoryPath));

app.get("/index", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Harshitha Palvai",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Harshitha Palvai",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "This is some helpful text.",
    name: "Harshitha Palvai",
  });
});



app.get("/weather", (req, res) => {
  const location = req.query.location;
  if (!location ) {
    return res.send( {
      Result: "Please enter location ",
    });
  
  } else {
    const url = `http://api.weatherstack.com/current?access_key=ade2d45089e02180fc400e48b7a8d34d&query=${location}`;
    Req({ url: url, json: true }, (error, response) => {
      if (error) {
        return res.send( {
          Result: "Check Internet Connection",
        });
      } else if (response.body.error) {
        console.log(response.body);
        return res.send( {
          Result: "Enter City Correctly",
        });
      } else {
        //console.log(response.body);
        return res.send( {
          Country: response.body.location.country,
          State: response.body.location.region,
          Time_Zone: response.body.location.timezone_id,
          lat: response.body.location.lat,
          lon: response.body.location.lon,
          Temperature: response.body.current.temperature,
          Weather_Description: response.body.current.weather_descriptions,
          Humidity: response.body.current.humidity,
          CloudCover: response.body.current.cloudcover,
        });
      }
    });
  }
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Navigate to help page",
  });
});
// app.get("*", (req, res) => {
//   res.render("error", {
//     title: "My 404 error",
//   });
// });
app.listen(3030, () => {
  console.log("Server is up on port 3030.");
});
