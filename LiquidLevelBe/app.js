const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/liquid-level", (req, res) => {
  res.send("Liquid Level");
});
