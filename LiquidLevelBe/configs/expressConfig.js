//Добавяме cors, за да можем да правим заявки към нашия сървър от други домейни
const cors = require("cors");
//Добавяме bodyParser, за да можем да четем данни от request-а
const bodyParser = require("body-parser");

//Този файл е конфигурация на express и се използва в app.js
function expressConfig(app) {
  app.use(cors());
  app.use(bodyParser.json());
}
//Изнасяме го, за да можем да го ползваме в други файлове
module.exports = expressConfig;
