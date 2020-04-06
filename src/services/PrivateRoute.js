import React, from 'react';
import { Redirect, Route } from 'react-router-dom';
import {connect} from "react-redux";
import {isAuthSelector} from "../store/selectors/usersSelector";

const PrivateRoute = ({ component: RouteComponent, isAuth, ...rest }) => {

  return (
    <Route
      {...rest}
      render={routeProps => (isAuth ? (
        <RouteComponent {...routeProps} />
      ) : (
        <Redirect to="/login" />
      ))}
    />
  );
};

export default connect(state => ({
    isAuth: isAuthSelector(state)
}), null)(PrivateRoute);
