// Четем енв-тата като преименувах фаилa от .env -> config.env - сега във всяки друг файл ще може да се достъпват променливи със process.env.<name> без да се налага да импортираш - require("dotenv").config();
const dotenv = require("dotenv"); // първо добавям модул npm i dotenv
dotenv.config({ path: "./config.env" });

// Вземаме апп-а от app.js
const app = require("./app");



//Взимаме порта от .env файла
const PORT = process.env.PORT || process.env.API_URL || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Hello from LiquidLevelBe");
});
