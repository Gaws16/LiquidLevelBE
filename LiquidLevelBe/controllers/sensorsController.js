const router = require("express").Router();

router.get("/all", (req, res) => {
  res.send("Hello from sensors controller");
});

module.exports = router;
