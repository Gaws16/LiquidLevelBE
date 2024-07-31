const { createClient } = require("@supabase/supabase-js");
//Взимаме си ключа за връзка с базата данни от .env файла
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
//Проверяваме дали са дефинирани
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL и Supabase Key трябва да са дефинирани в config.env"
  );
}

//Създаваме си клиент за връзка с базата данни
const supabaseConfig = createClient(supabaseUrl, supabaseKey);
//Изнасяме го, за да можем да го ползваме в други файлове
module.exports = supabaseConfig;
