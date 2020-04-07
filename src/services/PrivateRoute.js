import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {connect} from "react-redux";
import {isAuthSelector, userSelector} from "../store/selectors/usersSelector";
import { PropTypes } from 'prop-types'

const PrivateRoute = ({component: RouteComponent, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => (user ? (
        <RouteComponent {...routeProps} />
      ) : (
        <Redirect to="/login" />
      ))}
    />
  );
};

PrivateRoute.defaultProps = {
    user: null
};

PrivateRoute.propTypes = {
    user: PropTypes.object,
};

const mapStateToProps = state => ({
    user: userSelector(state)
});

export default connect(mapStateToProps, null)(PrivateRoute);
