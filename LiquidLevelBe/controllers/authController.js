const router = require("express").Router();
const authService = require("../services/authService");

//URL: http://localhost:5000/auth/login
router.post("/login", async (req, res) => {
  //Тук взимаме имейла и паролата от тялото на заявката
  const { email, password } = req.body;
  //Ако някое от двете липсва, връщame грешка
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required!" });
    return;
  }
  try {
    //Тук извикваме функцията за логин от auth сервиза
    const user = await authService.loginAsync(email, password);
    //Тук връщаме подготвения респонс като отговор на заявката
    res.json(user);
  } catch (err) {
    //Ако има грешка, я хващаме и я връщаме като отговор на заявката
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
