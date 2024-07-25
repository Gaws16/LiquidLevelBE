const router = require("express").Router();
const sensorsService = require("../services/sensorsService");
router.get("/", async (req, res) => {
  try {
    const sensors = await sensorsService.getAllSensors();
    res.json(sensors);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
