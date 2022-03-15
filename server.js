// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const myPort = 8000;

const Server = app.listen(myPort, function () {
  console.log("my server is now running on localhost: " + myPort);
});

// post route
app.post("/postWeth", function (req, res) {
  projectData.cname = req.body.name;
  projectData.weth = req.body.desc;
  projectData.temperature = req.body.temperature.toFixed(2);
  projectData.feels = req.body.feels;
  projectData.date = req.body.date;
  console.log(projectData);
  res.send(projectData);
});

app.get("/all", function (req, res) {
  res.send(projectData);
});
