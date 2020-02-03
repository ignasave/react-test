import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { checkExpired } from '../../utils';

const PrivateRoute = ({ children, ...props }) => {
  // COMPONENTE QUE RENDERIZA EL CHILDREN SI HAY UN TOKEN Y NO ESTA EXPIRADO
  // SINO, REDIRIJE HACIA LOGIN
  return (
    <Route
      {...props}
      render={() =>
        localStorage.getItem('token') && checkExpired() ? (
          children
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default PrivateRoute;
