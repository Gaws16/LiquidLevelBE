const router = require("express").Router();

const sensorsController = require("./controllers/sensorsController");
//Тук казваме на рутера да използва контролера за сензорите като път за достъп до данните за сензорите в базата данни
router.use("/sensors", sensorsController);

module.exports = router;
