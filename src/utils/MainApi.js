import { tokenGet } from '../utils/token';

class Api {
  constructor(options) {
    this._options = options;
  }

  // Запрос к серверу - по умолчанию GET
  _serverRequest(urlSuffix, method = 'GET', body = undefined, authorization = undefined) {

    const token = tokenGet();
    if (token) {
      this._options.headers.authorization = `Bearer ${token}`;
    } else {
      this._options.headers.authorization = undefined
    }

    return fetch(this._options.baseUrl + urlSuffix, {
      method: method,
      headers: {
        'authorization': this._options.headers.authorization,
        'Content-Type': this._options.headers['Content-Type']
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        return response.json();
      });
  }

  // Инициализация карточек
  // getInitialCards() {
  //   return this._serverRequest('cards');
  // }

  // saveCard(card) {
  //   return this._serverRequest('cards', 'POST', card);
  // }

  // deleteCard(cardId) {
  //   return this._serverRequest('cards/' + cardId, 'DELETE');
  // }

  // Лайки
  // like(cardId, likeOn = true) {
  //   const metod = likeOn ? 'PUT' : 'DELETE';
  //   return this._serverRequest('cards/' + cardId + '/likes', metod);
  // }

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
  baseUrl: 'http://api.losevrs.shebekino.life/',
  //baseUrl: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export { api }
