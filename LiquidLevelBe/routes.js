const router = require("express").Router();

//Тук взимаме контролерите за автентикация и сензорите
const authController = require("./controllers/authController");
const sensorsController = require("./controllers/sensorsController");

//Тук казваме на рутера да използва контролера за сензорите като път за достъп до данните за сензорите в базата данни
router.use("/sensors", sensorsController);
//Тук казваме на рутера да използва контролера за автентикация като път за достъп до данните за автентикацията в базата данни
router.use("/auth", authController);

module.exports = router;
