const supabase = require("../configs/supabaseConfig");

// Функция за добавяне на тоукените която ще е в login и register функциите, но за userID вземам това \"29bf9ad2-ed8f-46f1-9bc7-c0e05a5bcb3a\"" а в таблицата съм отбелязал таи колно като INT и в момента има грешка , исках да се мачва с userId от таблицата UserSensors , тези трите колони сигурно ще ни трябват в Users_tokens {acces_token_expires_in,... acces_token_expires_at efresh_token }

const addPushToken = async (userId, pushToken) => {
  console.log(userId, pushToken);
  const { data, error } = await supabase
    .from("User_tokens")
    .insert([{ user_id: userId, push_token: pushToken }]);

  if (error) {
    console.log("From the function");
    throw error;
  }
  return data;
};

// Login function
const loginAsync = async (email, password) => {
  //Тук ползваме функцията от supabase, която ни логва потребителя по имейл и парола
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  //Ако има грешка, я хващаме и я връщаме като отговор на заявката
  if (error) {
    throw error;
  }
  //Тук отделяме само нужните данни от отговора и ги връщаме
  const user = {
    id: data?.user?.id,
    email: data?.user?.email,
    access_token: data?.session?.access_token,
    acces_token_expires_in: data?.session.expires_in,
    acces_token_expires_at: data?.session.expires_at,
    refresh_token: data?.session?.refresh_token,
  };

  // dobawqne na аццесс_токен kъм таблицата User_tokens
  // await addPushToken(user.id, user.access_token);

  return user;
};

//Register function
const registerAsync = async (email, password) => {
  //Тук ползваме функцията от supabase, която ни регистрира потребителя по имейл и парола
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    throw error;
  }
  //  Тук отделяме само нужните данни от отговора и ги връщаме
  const user = {
    id: data?.user?.id,
    email: data?.user?.email,
    access_token: data?.session?.access_token,
    acces_token_expires_in: data?.session?.expires_in,
    acces_token_expires_at: data?.session?.expires_at,
    refresh_token: data?.session?.refresh_token,
  };

  // dobawqne na аццесс_токен kъм таблицата User_tokens
  await addPushToken(user.id, user.access_token);

  return user;
};

//Тук изнасяме функцията, за да можем да я ползваме в други файлове
module.exports = { loginAsync, registerAsync };
