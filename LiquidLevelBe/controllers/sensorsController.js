const router = require("express").Router();
const sensorsService = require("../services/sensorsService");
router.get("/all", async (req, res) => {
  const sensors = await sensorsService.getAllSensors();
  res.json(sensors);
});

module.exports = router;
