import React, { useState } from 'react';
import { AuthDataContextProvider } from '../../contexts/AuthDataContext';
import { Route, Switch, useHistory } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';

export default function App() {
  const [authData, setAuthData] = useState({ _id: '', email: '', password: '' });
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AuthDataContextProvider value={authData}>
      <div className="application">

        <Switch>

          <Route exact path='/'>
            <Main
              loggedIn={loggedIn}
            />
          </Route>

          <Route path='/saved-news'>
            <SavedNews />
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
    </AuthDataContextProvider>
  );
}