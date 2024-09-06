// SAVE
const saveToken = (token, rememberMe) => {
   if (rememberMe) {
      localStorage.setItem('token', token);
      return;
   }
   sessionStorage.setItem('token', token);
};
// CLEAR
const clearToken = (token) => {
   localStorage.removeItem('token', token);
   sessionStorage.removeItem('token', token);
};

export { saveToken, clearToken };