import React, { useCallback, useState } from 'react';
import './SignUp.scss';
import { fromJS } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { app } from '../../API/firebase';
import { createNewUserRequest } from '../../store/actions/userActionCreator';
import {
  isLoadingUserSelector,
  userSelector,
} from '../../store/selectors/usersSelector';

const SignUp = ({ createNewUserRequest, allUsers, isLoading }) => {
  // const [statusOfToolTip, setStatusOfToolTip] = useState(false);
  // const [textForToolTip, setTextForToolTip] = useState('');
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const { login, password } = formData;
  const history = useHistory();
  console.log(formData);

  const onChange = ({ target: { value, name } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = useCallback(e => {
    e.preventDefault();
    const { login, password } = formData;
    const { registerAction } = this.props;
    registerAction(login, password, history);

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
  }, [history]);

  return (
    <div className="signup-page">
      {isLoading && (
      <div className="lds-hourglass" style={{ marginLeft: 0 }} />
      )}
      <div className="input-field">
        <div className="forms">
          <form onSubmit={handleSignUp}>
            <input
              name="login"
              placeholder="Login"
              value={login}
              onChange={onChange}
              minLength={5}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
              minLength={5}
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

const mapDispatchToProps = dispatch => bindActionCreators(
  {registerAction: createNewUserRequest},
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
