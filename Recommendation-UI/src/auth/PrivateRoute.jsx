import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './Auth';

function PrivateRoute({ element, ...rest }) {
  const { user } = useAuth();

  return user ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace state={{ from: rest.location }} />
  );
}

export default PrivateRoute;
