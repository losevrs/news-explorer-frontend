import { getToken } from '../utils/token';

class Api {
  constructor(options) {
    this._options = options;
  }

  // Запрос к серверу - по умолчанию GET
  _serverRequest(urlSuffix, method = 'GET', body = undefined, authorization = undefined) {

    const token = getToken();
    if (token) {
      this._options.headers.authorization = `Bearer ${token}`;
    } else {
      this._options.headers.authorization = undefined
    }

    return fetch(this._options.baseUrl + urlSuffix, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this._options.headers.authorization,
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        return response.json();
      });
  }

  // Работа с карточками пользователя
  getSavedCards() {
    return this._serverRequest('articles');
  }

  saveCard(card) {
    return this._serverRequest('articles', 'POST', card);
  }

  deleteCard(cardId) {
    return this._serverRequest('articles/' + cardId, 'DELETE');
  }

  //Апи авторизации и аутентификации
  signUp(email, password, name) {
    return this._serverRequest('signup', 'POST', { email, password, name });
  }

  signIn(email, password) {
    return this._serverRequest('signin', 'POST', { email, password });
  }

  getUser(token) {
    return this._serverRequest('users/me', 'GET', undefined, `Bearer ${token}`);
  }
}

const api = new Api({
  baseUrl: 'https://api.losevrs.shebekino.life/',
  // baseUrl: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export { api }
