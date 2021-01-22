const AUTH_TYPE = 'jwt';

const getToken = () => localStorage.getItem(AUTH_TYPE);
const deleteToken = () => localStorage.removeItem(AUTH_TYPE);
const setToken = (token) => localStorage.setItem(AUTH_TYPE, token);

export {
  setToken,
  getToken,
  deleteToken,
  AUTH_TYPE
}