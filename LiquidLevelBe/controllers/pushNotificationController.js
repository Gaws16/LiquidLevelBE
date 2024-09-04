const pushNotificationService = require("../services/pushNotificationService");
const sensorsService = require("../services/sensorsService");
exports.saveToken = async (req, res, next) => {
  const { userId, pushToken } = req.body;
  if (!userId || !pushToken) {
    res.status(400).json({ message: "User ID and push token are required!" });
    return;
  }
  try {
    await pushNotificationService.savePushToken(userId, pushToken);
    res.status(201).json({ message: "Push token saved successfully!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
  next();
};

exports.sendNotification = async (req, res, next) => {
  const { macAddress } = req.body;

  const userId = await sensorsService.getUserIdBySensorAddres(macAddress);

  if (!userId) {
    res.status(400).json({ message: "User ID is required!" });
    return;
  }
  try {
    const tickets = await pushNotificationService.sendPushNotification(userId);
    res
      .status(201)
      .json({ message: "Notification sent successfully!", tickets: tickets });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
  next();
};

exports.getUserId = async (req, res, next) => {
  const { macAddress } = req.body;
  if (!macAddress) {
    res.status(400).json({ message: "Mac address is required!" });
    return;
  }
  try {
    const userId = await sensorsService.getUserIdBySensorAddres(macAddress);
    res.status(200).json({ userId: userId });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
  next();
};
