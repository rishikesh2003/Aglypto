// IMPORTs

require("dotenv").config();
const express = require("express");
const cors = require("cors");

//init express
const app = express();
// body parser
app.use(express.json());
// cors
app.use(
  cors({
    origin: "*",
  })
);

// express static files
app.use(express.static("public"));
// setting view engine
app.set("views", "./views");
app.set("view engine", "ejs");

// serving ejs file

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/accumulation", (req, res) => {
  res.render(__dirname + "/views/accumulation.ejs");
});

app.get("/charts/:symbol", (req, res) => {
  res.render(__dirname + "/views/charts.ejs", { symbol: req.params.symbol });
});

// listen on process.env.PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.info(`Server running on PORT : ${PORT}`);
});
