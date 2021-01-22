const USER_SEARCH = 'searcedcards';
const USER_DATA = 'userdata';
const SEARCH_PARAM = 'searchparam';

const LOG_IN = 'LOG_IN';
const getLogInLS = () => localStorage.getItem(LOG_IN);
const setLogInLS = () => localStorage.setItem(LOG_IN, 'YES');
const deleteLogInLS = () => localStorage.removeItem(LOG_IN);

const getUserDataLS = () => JSON.parse(localStorage.getItem(USER_DATA));
const deleteUserDataLS = () => localStorage.removeItem(USER_DATA);
const setUserDataLS = (userSet) => localStorage.setItem(USER_DATA, JSON.stringify(userSet));

const getSearchedCardsLS = () => JSON.parse(localStorage.getItem(USER_SEARCH));
const deleteSearchedCardsLS = () => localStorage.removeItem(USER_SEARCH);
const setSearchedCardsLS = (cardsSet) => localStorage.setItem(USER_SEARCH, JSON.stringify(cardsSet));

const getSearchParamsLS = () => JSON.parse(localStorage.getItem(SEARCH_PARAM));
const deleteSearchParamsLS = () => localStorage.removeItem(SEARCH_PARAM);
const setSearchParamsLS = (searchParam) => localStorage.setItem(SEARCH_PARAM, JSON.stringify(searchParam));

export {
  getLogInLS,
  setLogInLS,
  deleteLogInLS,
  LOG_IN,
  getUserDataLS,
  deleteUserDataLS,
  setUserDataLS,
  USER_DATA,
  getSearchedCardsLS,
  deleteSearchedCardsLS,
  setSearchedCardsLS,
  USER_SEARCH,
  getSearchParamsLS,
  deleteSearchParamsLS,
  setSearchParamsLS,
  SEARCH_PARAM,
}
