const supabase = require("../configs/supabaseConfig");

const loginAsync = async (email, password) => {
  //Тук ползваме функцията от supabase, която ни логва потребителя по имейл и парола
  const response = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (response?.error) {
    throw error;
  }
  //Тук отделяме само нужните данни от отговора и ги връщаме
  const user = {
    id: response.data.user.id,
    email: response.data.user.email,
    access_token: response.data?.session.access_token,
    acces_token_expires_in: response.data?.session.expires_in,
    acces_token_expires_at: response.data?.session.expires_at,
    refresh_token: response.data?.session.refresh_token,
  };

  return user;
};
//Тук изнасяме функцията, за да можем да я ползваме в други файлове
module.exports = { loginAsync };
