function getCardDate(date) {

  if (!date) {
    return '';
  }

  const monthes = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'];

  const cardDate = new Date(date);
  const day = cardDate.getDate();
  const mounth = monthes[cardDate.getMonth()];
  const year = cardDate.getFullYear();

  return `${day} ${mounth}, ${year}`;
}

export {
  getCardDate,
}
