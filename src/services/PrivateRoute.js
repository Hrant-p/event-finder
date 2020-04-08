import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { userSelector } from '../store/selectors/usersSelector';

const PrivateRoute = ({ component: RouteComponent, user, ...rest }) => (
  <Route
    {...rest}
    render={routeProps => (user ? (
      <RouteComponent {...routeProps} />
    ) : (
      <Redirect to="/login" />
    ))}
  />
);

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
