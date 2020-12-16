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
            <Main />
          </Route>

          <Route path='/saved-news'>
            <SavedNews />
          </Route>

        </Switch>

      </div>
    </AuthDataContextProvider>
  );
}