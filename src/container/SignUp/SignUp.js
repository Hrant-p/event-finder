import React, { useState } from 'react';
import './SignUp.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Redirect, useHistory} from 'react-router';
import {
  createNewUserRequest,
  errorState
} from '../../store/actions/userActionCreator';
import {
  errorSelector,
  isLoadingUserSelector,
  userSelector,
} from '../../store/selectors/usersSelector';

const SignUp = ({
  registerAction,
  errorAction,
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
  const history = useHistory();

  const onChange = ({ target: { value, name } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = e => {
    e.preventDefault();
    if (password === password2) {
      registerAction(login, password);
    } else {
      errorAction({
        message: "Passwords doesn't match"
      })
    }
  };

  if (user) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="signup-page">
      {isLoading && (
      <div className="lds-hourglass" style={{ marginLeft: 0 }} />
      )}
      <div className="input-field">
        <div className="forms">
          <form onSubmit={handleSignUp}>
            <input
              type="email"
              name="login"
              placeholder="Login"
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
              minLength={6}
              required
            />
            <input
              type="password"
              name="password2"
              placeholder="Repeat Password"
              value={password2}
              onChange={onChange}
              minLength={6}
              required
            />
            <button
              type="submit"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
       {error && (
       <div className="toolTip">{error.message}</div>
       )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: userSelector(state),
  isLoading: isLoadingUserSelector(state),
  error: errorSelector(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    registerAction: createNewUserRequest,
    errorAction: errorState
  }, dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
