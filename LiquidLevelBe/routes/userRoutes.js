const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// каквато и фунционалност да ти трябва правиш я в контролера и я слагаш като аргумент в HTTP методите като подредбата на аргументите се приоритизира и така първия се изпълнява и след това следващия ...., Важно е в контрлолерите да викаш винаги next() накрая

router.route("/login").post(authController.login);

router.route("/register").post(authController.register);

module.exports = router;
