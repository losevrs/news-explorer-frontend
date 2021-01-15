const USER_SEARCH = 'searcedcards';
const USER_DATA = 'userdata';
const SEARCH_PARAM = 'searchparam';

const userDataGet = () => JSON.parse(localStorage.getItem(USER_DATA));
const userDataDelete = () => localStorage.removeItem(USER_DATA);
const userDataSet = (userSet) => localStorage.setItem(USER_DATA, JSON.stringify(userSet));

const searchedCardsGet = () => JSON.parse(localStorage.getItem(USER_SEARCH));
const searchedCardsDelete = () => localStorage.removeItem(USER_SEARCH);
const searchedCardsSet = (cardsSet) => localStorage.setItem(USER_SEARCH, JSON.stringify(cardsSet));

const searchParamGet = () => JSON.parse(localStorage.getItem(SEARCH_PARAM));
const searchParamDelete = () => localStorage.removeItem(SEARCH_PARAM);
const searchParamSet = (searchParam) => localStorage.setItem(SEARCH_PARAM, JSON.stringify(searchParam));

export {
  userDataGet,
  userDataDelete,
  userDataSet,
  USER_DATA,
  searchedCardsGet,
  searchedCardsDelete,
  searchedCardsSet,
  USER_SEARCH,
  searchParamGet,
  searchParamDelete,
  searchParamSet,
  SEARCH_PARAM,
}