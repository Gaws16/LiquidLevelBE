const authService = require("../services/authService");

//URL: http://localhost:5000/auth/login
exports.login = async (req, res, next) => {
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
  next();
};
//TODO: Тук трябва да добавим някаква валидация за входните данни имейл и парола, дали е имейл паролата дали съдържа главни букви символи и др.
//URL: http://localhost:5000/auth/register
exports.register = async (req, res, next) => {
  //Тук взимаме имейла и паролата от тялото на заявката
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required!" });
    return;
  }
  try {
    //Тук извикваме функцията за регистрация от auth сервиза
    const user = await authService.registerAsync(email, password);
    //Тук връщаме подготвения респонс като отговор на заявката
    res.status(201).json(user);
  } catch (err) {
    //Ако има грешка, я хващаме и я връщаме като отговор на заявката
    res.status(400).json({ message: err.message });
  }
  next();
};
