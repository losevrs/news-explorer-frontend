import React, { useState } from 'react';
import { DataContextProvider } from '../../contexts/DataContext';
import { Route, Switch, useHistory } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';

export default function App() {
  const [authData, setAuthData] = useState({
    user: { _id: '', email: '', password: '', name: 'Родион' },
  });
  const [loggedIn, setLoggedIn] = useState(true);

  const searchSubmitHandler = (searchValue) => {
    console.log('search submited ! ->  ', searchValue);
  }

  return (
    <DataContextProvider value={authData}>
      <div className="application">

        <Switch>

          <Route exact path='/'>
            <Main
              loggedIn={loggedIn}
              onSubmit={searchSubmitHandler}
            />
          </Route>

          <Route path='/saved-news'>
            <SavedNews
              loggedIn={loggedIn}
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
    </DataContextProvider>
  );
}