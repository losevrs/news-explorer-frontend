import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { UserContextProvider } from '../../contexts/UserContext';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { getNews } from '../../utils/NewsApi';

import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';

import Login from '../Popups/Login/Login';
import Registration from '../Popups/Registration/Registration';
import Success from '../Popups/Success/Success';

import {
  deleteUserDataLS,
  setUserDataLS,
  getSearchedCardsLS,
  deleteSearchedCardsLS,
  setSearchedCardsLS,
  getSearchParamsLS,
  setSearchParamsLS,
  deleteSearchParamsLS,
  setLogInLS,
  deleteLogInLS,
  getLogInLS,
} from '../../utils/ActiveCards';

import {
  NotFoundErrorMessage,
  NotFoundMessage,
  NotKeyword,
  AddCardsOnStep,
} from '../../utils/Constants';

import { api } from '../../utils/MainApi';
import { getToken, setToken, deleteToken } from '../../utils/token';

export default function App() {
  const [currentUser, setCurrentUser] = useState({ _id: '', email: '', password: '', name: '' });
  const [searchResult, setSearchResult] = useState([]);
  const [searchParams, setSearchParams] = useState({ currentPosition: 0, lastCategory: '' });

  const [savedUserCards, setSavedUserCards] = useState([]);

  let initLoginState = false;

  const logInLS = getLogInLS();
  if (logInLS) {
    initLoginState = true;
  }

  const [loggedIn, setLoggedIn] = useState(initLoginState);

  const history = useHistory();

  // Проверка токена
  const handleTokenCheck = () => {
    const token = getToken();
    if (!token) {
      setLoggedIn(false);
      deleteLogInLS();
      return null;
    }

    api.getUser(token)
      .then((res) => {
        if (res) {
          const authData = {
            _id: res._id,
            email: res.email,
            password: '',
            name: res.name
          }
          setLoggedIn(true);
          setLogInLS();
          setCurrentUser(authData);
          setUserDataLS(authData);
        }
      })
      .catch((error) => {
        setLoggedIn(false);
        deleteLogInLS();
        console.error(error);
      });
  }

  // Блоки показа результатов в Main
  const [showPreloader, setShowPreloader] = useState(false);
  const [showNewsResult, setShowNewsResult] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState(NotFoundMessage);

  // Попапы
  const [popupLoginOpened, setPopupLoginOpened] = useState(false);
  const [loginError, setLoginError] = useState('');
  const openLogin = () => {
    setLoginError('');
    setPopupLoginOpened(true);
  }

  const [popupRegestrationOpened, setPopupRegestrationOpened] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const openRegestration = () => {
    setRegistrationError('');
    setPopupRegestrationOpened(true);
  }

  const [popupSuccessOpened, setPopupSuccessOpened] = useState(false);
  const openSuccess = () => {
    setPopupSuccessOpened(true);
  }

  const onLoginLinkClick = () => {
    setPopupLoginOpened(false);
    openRegestration();
  }

  const onRegistrationLinkClick = () => {
    setPopupRegestrationOpened(false);
    openLogin();
  }

  const onSuccessLinkClick = () => {
    setPopupSuccessOpened(false);
    openLogin();
  }

  const logout = () => {
    deleteToken();
    setLoggedIn(false);
    deleteLogInLS();
    setCurrentUser({ _id: '', email: '', password: '', name: '' });
    deleteUserDataLS();
    deleteSearchedCardsLS();
    deleteSearchParamsLS();
  }

  const closeAllPopups = () => {
    setPopupLoginOpened(false);
    setPopupRegestrationOpened(false);
    setPopupSuccessOpened(false);
  }

  // ↑↑↑ Попапы 

  // Блоки Main - показ результатов

  // закрыть блоки
  const closeAllResalts = () => {
    setShowNewsResult(false);
    setShowNotFound(false);
    setShowPreloader(false);
    setNotFoundMessage(NotFoundMessage);
  }

  // на нажатие 'показать еще'
  const onNext = () => {
    const newParams = { ...searchParams };
    newParams.currentPosition += AddCardsOnStep;

    if (newParams.currentPosition > searchResult.length) {
      newParams.currentPosition = searchResult.length;
    }

    setSearchParams(newParams);
    setSearchParamsLS(newParams);
  }

  // ↑↑↑ Блоки Main - показ результатов

  // Сабмиты
  const searchSubmitHandler = (searchValue) => {
    if (!searchValue || searchValue.trim().length === 0) {
      setNotFoundMessage(NotKeyword);
      setShowNotFound(true);
      return;
    }

    closeAllResalts();
    deleteSearchedCardsLS();
    setShowPreloader(true);

    getNews(searchValue)
      .then((res) => {

        const params = {
          currentPosition: AddCardsOnStep,
          lastCategory: searchValue,
        }

        res.articles.forEach((item, index) => {
          item.category = searchValue.slice(0, 1).toUpperCase() + searchValue.slice(1);
          item.cardIndex = index;
        });

        setSearchResult(res.articles);
        setSearchedCardsLS(res.articles);

        if (res.articles && res.articles.length < AddCardsOnStep) {
          params.currentPosition = res.articles.length;
        }

        setSearchParams(params);
        setSearchParamsLS(params);

        setShowPreloader(false);

        if (res.articles.length === 0) {
          setShowNotFound(true);
        } else {
          setShowNewsResult(true);
        }
      })
      .catch((error) => {
        setShowPreloader(false);
        setNotFoundMessage(NotFoundErrorMessage);
        setShowNotFound(true);
      });
  }

  const onSubmitLogin = ({ email, password }) => {
    api.signIn(email, password)
      .then((res) => {
        if (res.message) {
          setLoginError(res.message);
          return;
        } else {
          setLoggedIn(true);
          setLogInLS();
          setToken(res.token);
          setPopupLoginOpened(false);
          handleTokenCheck();
        }
      })
      .catch((error) => {
        setLoginError('Ошибка авторизации');
      });
  }

  const onSubmitRegistration = ({ email, password, name }) => {
    api.signUp(email, password, name)
      .then((res) => {
        if (res.message) {
          setRegistrationError(res.message);
        } else {
          setRegistrationError('');
          setPopupRegestrationOpened(false);
          openSuccess();
        }
      })
      .catch((error) => {
        setRegistrationError('Ошибка регистрации');
      })
  }

  // ↑↑↑ Сабмиты

  // Работа с карточками
  // Сохранение
  const saveCurrentCard = ({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    cardIndex
  }, setCardId) => {

    api.saveCard({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    })
      .then((res) => {
        const newRes = [...searchResult];
        newRes[cardIndex]._id = res._id;
        setSearchResult(newRes);
        setSearchedCardsLS(newRes);
        if (setCardId) {
          setCardId(res._id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Удаление
  const deleteCurrentCard = (id, delFromLS = false) => {
    api.deleteCard(id)
      .then((res) => {
        const newRes = [...searchResult];
        const index = newRes.findIndex(item => item._id === res._id);

        if (index !== -1) {
          newRes[index]._id = '';
          setSearchResult(newRes);
          setSearchedCardsLS(newRes);
        }

        if (delFromLS) {
          const savedCards = [...savedUserCards];
          const index = savedCards.findIndex(item => item._id === res._id);
          if (index !== -1) {
            savedCards.splice(index, 1);
            setSavedUserCards(savedCards);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Получить список сохраненных карточек пользователя
  const getUserCards = () => {
    api.getSavedCards()
      .then((res) => {
        setSavedUserCards(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // ↑↑↑ Работа с карточками

  // На старте формы покажем карточки если они есть
  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    const savedCards = getSearchedCardsLS();
    const savedParam = getSearchParamsLS();
    if (savedCards) {
      setSearchResult(savedCards);
    }

    if (savedParam) {
      setSearchParams(savedParam);
    }
  }, []);

  useEffect(() => {
    const cards = getSearchedCardsLS();
    if (cards) {
      setShowNewsResult(true);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      closeAllPopups();
      return;
    }

    if (history.location.open && !loggedIn) {
      switch (history.location.open) {
        case 'Login':
          openLogin();
          break;
        case 'Registration':
          openRegestration();
          break;
        default:
          break;
      }
    }
  }, [history, loggedIn]);

  // ↓↓↓↓↓↓↓↓↓↓↓  Рендер
  return (
    <UserContextProvider value={currentUser}>
      <div className="application">
        <Login
          isOpened={popupLoginOpened}
          onClose={closeAllPopups}
          onLinkClick={onLoginLinkClick}
          onSubmitLogin={onSubmitLogin}
          loginError={loginError}
        />

        <Registration
          isOpened={popupRegestrationOpened}
          onClose={closeAllPopups}
          onLinkClick={onRegistrationLinkClick}
          onSubmitRegistration={onSubmitRegistration}
          registrationError={registrationError}
        />

        <Success
          isOpened={popupSuccessOpened}
          onClose={closeAllPopups}
          onLinkClick={onSuccessLinkClick}
          formLink='/'
          linkText='Войти'
        />

        <Switch>
          <ProtectedRoute path='/saved-news' loggedIn={loggedIn} onRedirect={openLogin}>
            <SavedNews
              loggedIn={loggedIn}
              onButtonClick={loggedIn ? logout : openLogin}
              savedUserCards={savedUserCards}
              onGetCards={getUserCards}
              onDeleteCard={deleteCurrentCard}
            />
          </ProtectedRoute>

          <Route exact path='/'>
            <Main
              loggedIn={loggedIn}
              onSubmit={searchSubmitHandler}
              showPreloader={showPreloader}
              showNotFound={showNotFound}
              showMessage={notFoundMessage}
              showNewsResult={showNewsResult}
              onButtonClick={loggedIn ? logout : openLogin}
              onNext={onNext}
              onSaveCard={saveCurrentCard}
              onDeleteCard={deleteCurrentCard}
            />
          </Route>

          <Route
            path='/fb'
            component={() => {
              window.location.href = 'https://www.facebook.com';
              return null;
            }}
          />
          <Route
            path='/gh'
            component={() => {
              window.location.href = 'https://www.github.com';
              return null;
            }}
          />
          <Route
            path='/yap'
            component={() => {
              window.location.href = 'https://praktikum.yandex.ru';
              return null;
            }}
          />

        </Switch>

      </div>
    </UserContextProvider>
  );
}