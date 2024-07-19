const router = require("express").Router();

const sensorsController = require("./controllers/sensorsController");

router.use("/sensors", sensorsController);

module.exports = router;
