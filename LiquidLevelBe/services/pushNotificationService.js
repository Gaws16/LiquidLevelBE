//Взимаме си клиента за връзка с базата данни
const supabase = require("../configs/supabaseConfig");
//Взимаме иснтанцията на Expo
const { expo } = require("../configs/expoConfig");

const savePushToken = async (userId, pushToken) => {
  const response = await supabase.from("UsersExpoTokens").upsert({
    userId: userId,
    pushToken: pushToken,
  });
  if (response.error) {
    throw new Error(response.error.message);
  }
  console.log(response);
  return response;
};
const sendPushNotification = async (userId) => {
  const { data: tokens, error } = await supabase
    .from("UsersExpoTokens")
    .select("pushToken")
    .eq("userId", userId);
  if (error) {
    throw new Error(error.message);
  }
  if (tokens.length === 0) {
    throw new Error("No push token found for this user!");
  }
  const pushToken = tokens[0].pushToken;
  const message = {
    to: pushToken,
    sound: "default",
    title: "Title",
    body: "Water level low!",
  };
  // В момента имаме само по един токен за юзър, ако променим логикатаи има повече токени за юзър, ще ползваме закоментирания код
  // const chunks = expo.chunkPushNotifications(message);
  // const tickets = [];
  // for (let i = 0; i < chunks.length; i++) {
  //   const ticketChunk = await expo.sendPushNotificationsAsync(chunks[i]);
  //   console.log(ticketChunk);
  //   tickets.push(...ticketChunk);
  // }
  const tickets = await expo.sendPushNotificationsAsync([message]);
  return tickets;
};
module.exports = { savePushToken, sendPushNotification };
