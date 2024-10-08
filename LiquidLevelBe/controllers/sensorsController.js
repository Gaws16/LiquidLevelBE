const sensorsService = require("../services/sensorsService");
//URL: http://localhost:5000/sensors
exports.getInformation = async (req, res) => {
  try {
    //Тук извикваме функцията от сензорите, която връща всички сензори
    const sensors = await sensorsService.getAllSensors();
    //Тук връщаме всички сензори като отговор на заявката
    res.json(sensors);
  } catch (err) {
    //Ако има грешка, я хващаме и я връщаме като отговор на заявката, тук е по правилно дасе върне къстъм грешка не директно върнатата от базата данни
    res.status(400).json({ message: err.message });
  }
};
exports.getSensorByUserId = async (req, res) => {
  try {
    //Тук взимаме id-то на потребитекя от URL-а
    const userId = req.params.id;
    //Тук извикваме функцията, която връща всички сензори за даден потребител
    const sensors = await sensorsService.getAllSensorsForUserAsync(userId);
    //Тук връщаме всички сензори за дадения потребител
    res.status(200).json(sensors);
  } catch (err) {
    //Ако има грешка, я хващаме и я връщаме като отговор на заявката
    res.status(400).json({ message: err.message });
  }
};
