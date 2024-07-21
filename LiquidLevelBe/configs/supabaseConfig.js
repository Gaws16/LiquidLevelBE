const { createClient } = require("@supabase/supabase-js");
//Взимаме си dotenv за да можем да използваме променливи от .env файла
require("dotenv").config();
//Взимаме си ключа за връзка с базата данни от .env файла
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
//Създаваме си клиент за връзка с базата данни
const supabaseConfig = createClient(supabaseUrl, supabaseKey);
//Изнасяме го, за да можем да го ползваме в други файлове
module.exports = supabaseConfig;
