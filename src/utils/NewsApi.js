function getNews(searchString) {

  const currentDate = new Date(); // сегодня
  const dtms = currentDate.valueOf();
  const days = 7;
  const fromDate = new Date(dtms - ((24 * 3600 * 1000) * days)); // от даты

  const url = `https://nomoreparties.co/news/v2/everything?` +
    `language=ru&` +
    `q=${searchString}&` +
    `from=${fromDate.toISOString()}&` +
    `to=${currentDate.toISOString()}&` +
    `pageSize=100&` +
    `apiKey=1da83ecf9e924ecfb22223be6534e5db`;
    // `apiKey=e16dc393d980454899c6c8150c9a1077`;
  const req = new Request(url);

  return fetch(req)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
}

export {
  getNews,
}
