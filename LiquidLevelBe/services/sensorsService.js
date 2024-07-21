const supabase = require("../configs/supabaseConfig");
//Взимаме си клиента за връзка с базата данни

//Тук си правим функция, която ще връща всички сензори от базата данни
const getAllSensors = async () => {
  //Тук правим заявка към базата данни за всички сензори
  const result = await supabase.from("sensors").select("*");
  console.log(result);
  //Връщаме данните от базата данни
  return result;
};
//Тук изнасяме функцията, за да можем да я ползваме в други файлове
module.exports = { getAllSensors };
