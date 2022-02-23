/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { retrieveLocalStorage } from '../services/storageServices';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      retrieveLocalStorage('userLogin') ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { openLoginModel: true } }} />
    )}
  />
);

export default PrivateRoute;
