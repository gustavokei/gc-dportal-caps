require("dotenv").config();
const express = require("express");
const app = express();
const indexRouter = require("./routes/router");
const bodyParser = require('body-parser');


// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(express.json())

app.use("/api", indexRouter);

app.use(bodyParser.json());


//Listen on port for Heroku OR 4000
app.listen(process.env.PORT || 4000, function () {
  console.log("Your node js server is running");
});
