import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: element, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        (window.location.href = '/auth/Login')
      )
    }
  />
);

export default PrivateRoute;
