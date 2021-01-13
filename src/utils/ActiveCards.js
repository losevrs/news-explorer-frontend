const USER_CARDS = 'activecards';

const activeCardsGet = () => JSON.parse(localStorage.getItem(USER_CARDS));
const activeCardsDelete = () => localStorage.removeItem(USER_CARDS);
const activeCardsSet = (cardsSet) => localStorage.setItem(USER_CARDS, JSON.stringify(cardsSet));

export {
  activeCardsSet,
  activeCardsGet,
  activeCardsDelete,
  USER_CARDS
}