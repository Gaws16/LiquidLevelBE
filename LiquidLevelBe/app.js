//Използваме express
const express = require("express");
//Използваме конфигурацията на express
const expressConfig = require("./configs/expressConfig");
//Изплзваме конфигурацията на експоузнатите ендпойнти
const routes = require("./routes");

//Взимаме порта от .env файла
const PORT = process.env.PORT || 3000;


//Създаваме express приложение
const app = express();
//Използваме конфигурацията на express
expressConfig(app);

//Използваме конфигурацията на експоузнатите ендпойнти
app.use(routes);

// Изнасям пускането на сървъра в server.js файл като от там ще четат вички ENV-та за целия аpp и няма да се налга да ги инпортираме във всички други файлове, също така променям скриптовете да стартират server.js

module.exports = app;
