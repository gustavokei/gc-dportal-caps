const express = require("express");
const app = express();
const indexRouter = require("./routes/router");

app.use("/api", indexRouter);

//Listen on port for Heroku OR 4000
app.listen(process.env.PORT || 4000, function () {
  console.log("Your node js server is running");
});
