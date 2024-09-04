//Използваме express
const express = require("express");
//Използваме конфигурацията на express
const expressConfig = require("./configs/expressConfig");
//Изплзваме конфигурацията на експоузнатите ендпойнти
const userRouter = require("./routes/userRoutes");
const sensorRauter = require("./routes/sensorRoutes");
const pushNotificationController = require("./routes/pushNotificationRoutes");
//Създаваме express приложение
const app = express();
//Използваме конфигурацията на express
expressConfig(app);

//Използваме конфигурацията на експоузнатите ендпойнти(в папка routes са разделени ендпойнтите като там ще се прилагат HTTP методите към тях и ще се слагат функциите от контролера , там ще използваме логиката на middleware)
app.use("/auth", userRouter);
app.use("/sensors", sensorRauter);
app.use("/push", pushNotificationController);

// Изнасям пускането на сървъра в server.js файл като от там ще четат вички ENV-та за целия аpp и няма да се налга да ги инпортираме във всички други файлове, също така променям скриптовете да стартират server.js

module.exports = app;
