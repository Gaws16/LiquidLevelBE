const { Expo } = require("expo-server-sdk");
const expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
  useFcmV1: false,
});
module.exports = { expo };
