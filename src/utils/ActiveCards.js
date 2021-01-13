const USER_CARDS = 'activecards';
const USER_SEARCH = 'searcedcards'

const activeCardsGet = () => JSON.parse(localStorage.getItem(USER_CARDS));
const activeCardsDelete = () => localStorage.removeItem(USER_CARDS);
const activeCardsSet = (cardsSet) => localStorage.setItem(USER_CARDS, JSON.stringify(cardsSet));

const searchedCardsGet = () => JSON.parse(localStorage.getItem(USER_SEARCH));
const searchedCardsDelete = () => localStorage.removeItem(USER_SEARCH);
const searchedCardsSet = (cardsSet) => localStorage.setItem(USER_SEARCH, JSON.stringify(cardsSet));

export {
  activeCardsSet,
  activeCardsGet,
  activeCardsDelete,
  USER_CARDS,
  searchedCardsGet,
  searchedCardsDelete,
  searchedCardsSet,
  USER_SEARCH,
}