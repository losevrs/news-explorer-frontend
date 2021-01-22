import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute(props) {

  return (
    <Route path={props.path}>
      {() => props.loggedIn
        ? <>
          {props.children}
        </>
        : <Redirect to={{
          pathname: '/',
          open: 'Login',
        }} />
      }
    </Route>
  )
}
