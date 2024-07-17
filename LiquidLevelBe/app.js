//Четем променливите от .env файла
require("dotenv").config();
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

//Пускаме сървъра на определения порт
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
