const supabase = require("../configs/supabaseConfig");
//Взимаме си клиента за връзка с базата данни

//Тук си правим функция, която ще връща всички сензори от базата данни
const getAllSensors = async () => {
  //Тук правим заявка към базата данни за всички сензори
  const { data, error } = await supabase.from("Sensors").select("*");
  console.log(data);
  if (error) {
    //Ако има грешка, я хвърляме
    throw error;
  }
  //Връщаме данните от базата данни
  return data;
};
//Тук си правим функция, която ще връща всички сензори от базата данни за даден потребител
const getAllSensorsForUserAsync = async (userId) => {
  //
  const { data, error } = await supabase
    .from("UsersSensors")
    .select(`Sensors(*)`) //Тук взимаме всички id-та на сензори и джойнваме с таблицата Sensors от която взимаме цялата информация
    .eq("userId", userId);

  if (error) {
    throw error;
  }
  //Връщаме само данните от сензорите, понеже заявката на Supabase ги връща по кофти начин
  return data.map((data) => data.Sensors); //Връщаме масив с всички сензори асоциирани към потребителя
};
//Тук си правим функция, която ще връща id на user-a асоциаран с даден сензор
const getUserIdBySensorAddres = async (macAddress) => {
  const { data, error } = await supabase
    .from("Sensors")
    .select("UsersSensors(userId)")
    .eq("mac_address", macAddress)
    .single();
  if (error) {
    throw new Error(error.details || error.message);
  }
  const userId = data?.UsersSensors?.userId;
  if (!userId) {
    throw new Error("User not found!");
  }
  return userId;
};
//Тук изнасяме функцията, за да можем да я ползваме в други файлове
module.exports = {
  getAllSensors,
  getAllSensorsForUserAsync,
  getUserIdBySensorAddres,
};
