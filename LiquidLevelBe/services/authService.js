const supabase = require("../configs/supabaseConfig");

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

  return user;
};

//Тук изнасяме функцията, за да можем да я ползваме в други файлове
module.exports = { loginAsync, registerAsync };
