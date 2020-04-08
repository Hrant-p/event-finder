import React, { Component, Fragment } from 'react';
import './Login.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  errorSelector,
  isLoadingUserSelector,
  userSelector
} from '../../store/selectors/usersSelector';
import { loginUser } from '../../store/actions/userActionCreator';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };
  }

  onChange = ({ currentTarget: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleLogin = e => {
    e.preventDefault();
    const { login, password } = this.state;
    const { loginUserAction } = this.props;
    loginUserAction(login, password);
  };

  render() {
    const { isLoading, user, error } = this.props;
    const { login, password } = this.state;

    if (user && localStorage.getItem('id')) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Fragment>
        <h2 style={{ textAlign: 'center', color: '#44469' }}>Events Search Application</h2>
        <div className="signup-page">
          {isLoading && (
          <div
            className="lds-hourglass"
            style={{ marginLeft: 0 }}
          />
          )}
          <div className="input-field">
            <div className="forms">
              <form
                onSubmit={this.handleLogin}
                className="body"
              >
                <input
                  type="email"
                  name="login"
                  placeholder="Login"
                  value={login}
                  onChange={this.onChange}
                  minLength="6"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.onChange}
                  maxLength="30"
                  minLength="6"
                  required
                />
                <button
                  type="submit"
                  onClick={this.handleLogin}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
          {error && (
          <div className="toolTip">{error.message}</div>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: isLoadingUserSelector(state),
  user: userSelector(state),
  error: errorSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loginUserAction: loginUser
}, dispatch);

Login.defaultProps = {
  user: null
};

Login.propTypes = {
  loginUserAction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
