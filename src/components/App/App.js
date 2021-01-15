import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { UserContextProvider } from '../../contexts/UserContext';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { getNews, getNewsTemp } from '../../utils/NewsApi';

import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';

import Login from '../Popups/Login/Login';
import Registration from '../Popups/Registration/Registration';
import Success from '../Popups/Success/Success';

import {
  userDataDelete,
  userDataSet,
  searchedCardsGet,
  searchedCardsDelete,
  searchedCardsSet,
  searchParamGet,
  searchParamSet,
} from '../../utils/ActiveCards';

import {
  NotFoundErrorMessage,
  NotFoundMessage,
  NotKeyword,
  AddCardsOnStep,
} from '../../utils/Constants';

import { api } from '../../utils/MainApi';
import { tokenGet, tokenSet, tokenDelete } from '../../utils/token';

export default function App() {
  const [userData, setUserData] = useState({ _id: '', email: '', password: '', name: '' });
  const [searchResult, setSearchResult] = useState([]);
  const [searchParams, setSearchParams] = useState({ currentPosition: 0, lastCategory: '' });

  const [loggedIn, setLoggedIn] = useState(false);

  // Проверка токена
  const handleTokenCheck = () => {
    const token = tokenGet();
    if (!token) {
      return;
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
          setUserData(authData);
          userDataSet(userData);
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        setLoggedIn(false);
        console.log(error);
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
    tokenDelete();
    setLoggedIn(false);
    setUserData({ _id: '', email: '', password: '', name: '' });
    userDataDelete();
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
    searchParamSet(newParams);
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
    searchedCardsDelete();
    setShowPreloader(true);

    getNewsTemp(searchValue) // !!!!!!!!!!! убрать temp и из апи потом
      .then((res) => {

        const params = {
          currentPosition: AddCardsOnStep,
          lastCategory: searchValue,
        }

        setSearchResult(res.articles);
        searchedCardsSet(res.articles);

        if (res.articles && res.articles.length < AddCardsOnStep) {
          params.currentPosition = res.articles.length;
        }

        setSearchParams(params);
        searchParamSet(params);

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
          tokenSet(res.token);
          setLoggedIn(true);
          setPopupLoginOpened(false);
        }
        handleTokenCheck();
      })
      .catch((error) => {
        setLoginError(error);
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
        setRegistrationError(error);
      })
  }

  // ↑↑↑ Сабмиты

  // На старте формы покажем карточки если они есть
  useEffect(() => {
    const savedCards = searchedCardsGet();
    const savedParam = searchParamGet();
    if (savedCards) {
      setSearchResult(savedCards);
    }

    if (savedParam) {
      setSearchParams(savedParam);
    }
  }, []);

  useEffect(() => {
    const cards = searchedCardsGet();
    if (cards) {
      setShowNewsResult(true);
    }
  }, []);

  useEffect(() => {
    handleTokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ↓↓↓↓↓↓↓↓↓↓↓  Рендер
  return (
    <UserContextProvider value={userData}>
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
              onButtonClick={loggedIn ? logout : openLogin}
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
    </UserContextProvider>
  );
}