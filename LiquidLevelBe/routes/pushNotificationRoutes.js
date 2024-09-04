const express = require("express");
const pushNotificationController = require("../controllers/pushNotificationController");
const router = express.Router();

// каквато и фунционалност да ти трябва правиш я в контролера и я  слагаш като аргумент в HTTP методите като подредбата на аргументите се приоритизира и така първия се изпълнява и след това следващия ...., Важно е в контрлолерите да викаш винаги next() накрая
router.route("/save-token").post(pushNotificationController.saveToken);
router
  .route("/send-notification")
  .post(pushNotificationController.sendNotification);
module.exports = router;
