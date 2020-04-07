import React, { useCallback, useState } from 'react';
import './SignUp.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Redirect, useHistory} from 'react-router';
import { createNewUserRequest } from '../../store/actions/userActionCreator';
import {
  isLoadingUserSelector,
  userSelector,
} from '../../store/selectors/usersSelector';

const SignUp = ({ registerAction, user, isLoading }) => {
  // const [statusOfToolTip, setStatusOfToolTip] = useState(false);
  // const [textForToolTip, setTextForToolTip] = useState('');
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const { login, password } = formData;
  const history = useHistory();

  const onChange = ({ target: { value, name } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = e => {
    e.preventDefault();
    const { login, password } = formData;
    registerAction(login, password);

    // if (allUsers.has(login)) {
    //   setStatusOfToolTip(true);
    //   setTextForToolTip('This userName is already used');
    //   setTimeout(() => {
    //     setStatusOfToolTip(false);
    //     setTextForToolTip('');
    //   }, 3000);
    // } else if (login.length < 1 || password.length < 1) {
    //   setStatusOfToolTip(true);
    //   setTextForToolTip('Please type correct mail & password');
    //   setTimeout(() => {
    //     setStatusOfToolTip(false);
    //     setTextForToolTip('');
    //   }, 3000);
    // } else {
    //   const newUser = allUsers.set(login, fromJS({ login, password }));
    //   createNewUserRequest(newUser, history);
    // }
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
              onChange={e => onChange(e)}
              minLength={6}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={e => onChange(e)}
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
      {/* {statusOfToolTip && ( */}
      {/* <div className="toolTip">{textForToolTip}</div> */}
      {/* )} */}
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: isLoadingUserSelector(state),
  user: userSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
      registerAction: createNewUserRequest
    }, dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
