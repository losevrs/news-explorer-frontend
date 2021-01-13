import React, { useState, useEffect } from 'react';
import { DataContextProvider } from '../../contexts/DataContext';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { getNews, getNewsTemp } from '../../utils/NewsApi';

import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';

import Login from '../Popups/Login/Login';
import Registration from '../Popups/Registration/Registration';
import Success from '../Popups/Success/Success';

import {
  activeCardsSet,
  activeCardsGet,
  activeCardsDelete,
} from '../../utils/ActiveCards';

import {
  NotFoundErrorMessage,
  NotFoundMessage,
  NotKeyword
} from '../../utils/Constants';

export default function App() {
  const initState = {
    user: { _id: '', email: '', password: '', name: 'Родион' },
    searchResult: [],
    currentPosition: 0,
    lastCategory: '',
  };

  const [userData, setUserData] = useState(initState);

  const clearState = () => {
    setUserData(initState);
  }

  const [loggedIn, setLoggedIn] = useState(false);

  // Попапы
  const [showPreloader, setShowPreloader] = useState(false);
  const [showNewsResult, setShowNewsResult] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState(NotFoundMessage);

  const [popupLoginOpened, setPopupLoginOpened] = useState(false);
  const openLogin = () => {
    setPopupLoginOpened(true);
  }

  const [popupRegestrationOpened, setPopupRegestrationOpened] = useState(false);
  const openRegestration = () => {
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
    setLoggedIn(false);
    clearState();
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

  // добавит в сторидж карточки из резалтсета - но стейт не поменяет 
  const addActiveCards = (fromSet, count) => {
    let tmp = activeCardsGet() || [];

    const addCards = fromSet.searchResult.slice(fromSet.currentPosition, fromSet.currentPosition + count);
    addCards.forEach((item) => item.category = fromSet.lastCategory);

    tmp = tmp.concat(addCards);
    activeCardsSet(tmp);
  }

  // на нажатие 'показать еще'
  const onNext = (count = 3) => {
    let newUserdata = {};
    newUserdata = JSON.parse(JSON.stringify(userData));

    addActiveCards(newUserdata, count);
    newUserdata.currentPosition = newUserdata.currentPosition + count;
    setUserData(newUserdata);
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
    activeCardsDelete();
    setShowPreloader(true);
    getNewsTemp(searchValue) // !!!!!!!!!!! убрать temp и из апи потом
      .then((res) => {
        const newUserdata = { ...userData };

        newUserdata.searchResult = res.articles;
        newUserdata.currentPosition = 0;
        newUserdata.lastCategory = searchValue;

        addActiveCards(newUserdata, 3);
        newUserdata.currentPosition = newUserdata.currentPosition + 3;

        setUserData(newUserdata);
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

  const onSubmitRegistration = () => {
    setPopupRegestrationOpened(false);
    openSuccess();
  }

  // ↑↑↑ Сабмиты

  // На старте формы покажем карточки если они есть уже в сторидже
  useEffect(() => {
    const cards = activeCardsGet();
    if (!cards) {
      return;
    }
    setShowNewsResult(true);
  }, []);

  // ↓↓↓↓↓↓↓↓↓↓↓  Рендер
  return (
    <DataContextProvider value={userData}>
      <div className="application">
        <Login
          isOpened={popupLoginOpened}
          onClose={closeAllPopups}
          onLinkClick={onLoginLinkClick}
        />

        <Registration
          isOpened={popupRegestrationOpened}
          onClose={closeAllPopups}
          onLinkClick={onRegistrationLinkClick}
          onSubmitRegistration={onSubmitRegistration}
        />

        <Success
          isOpened={popupSuccessOpened}
          onClose={closeAllPopups}
          onLinkClick={onSuccessLinkClick}
          formLink='/'
          linkText='Войти'
        />

        <Switch>

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
            />
          </Route>

          <ProtectedRoute path='/saved-news' loggedIn={loggedIn}>
            <SavedNews
              loggedIn={loggedIn}
            />
          </ProtectedRoute>

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
    </DataContextProvider>
  );
}