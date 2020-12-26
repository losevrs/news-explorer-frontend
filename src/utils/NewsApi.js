function getNews(searchString) {
  const url = `https://nomoreparties.co/news/v2/everything?language=ru&q=${searchString}&apiKey=1da83ecf9e924ecfb22223be6534e5db`;

  const req = new Request(url);

  console.log('Req: -> ',req);

  return fetch(req)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
}

export { getNews }
