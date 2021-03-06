import React, { Fragment, useState } from 'react';
import './SignUp.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  createNewUserRequest,
} from '../../store/actions/userActionCreator';
import {
  errorSelector,
  isLoadingUserSelector,
  userSelector,
} from '../../store/selectors/usersSelector';
import { Title } from '../../components/Title/Title';

const SignUp = ({
  registerAction,
  user,
  error,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    password2: '',
  });

  const { login, password, password2 } = formData;

  const onChange = ({ target: { value, name } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = e => {
    e.preventDefault();
    registerAction(login, password, password2);
  };

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Title />
      <div className="sign-page">
        {isLoading && (
          <div className="lds-hourglass" style={{ marginLeft: 0 }} />
        )}
        <div className="form-area">
          <div className="forms">
            <form
              onSubmit={handleSignUp}
              className="body"
            >
              <input
                type="email"
                name="login"
                placeholder="Email"
                value={login}
                onChange={onChange}
                minLength={6}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
                minLength="6"
                maxLength="12"
                required
              />
              <input
                type="password"
                name="password2"
                placeholder="Repeat Password"
                value={password2}
                onChange={onChange}
                minLength="6"
                maxLength="12"
                required
              />
              <button
                type="submit"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
              <p className="form-bottom">
                Already have an account?
                {' '}
                <Link to="/login">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
        {error && (
          <div className="toolTip">{error.message}</div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: userSelector(state),
  isLoading: isLoadingUserSelector(state),
  error: errorSelector(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  registerAction: createNewUserRequest,
}, dispatch);

SignUp.defaultProps = {
  user: null
};

SignUp.propTypes = {
  registerAction: PropTypes.func.isRequired,
  user: PropTypes.object,
  isLoading: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
