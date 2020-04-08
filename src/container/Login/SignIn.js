import React, { Component, Fragment } from 'react';
import './SignIn.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  errorSelector,
  isLoadingUserSelector,
  userSelector
} from '../../store/selectors/usersSelector';
import { loginUser } from '../../store/actions/userActionCreator';
import {Title} from "../../components/Title/Title";

class SignIn extends Component {
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
        <Title />
        <div className="sign-page">
          {isLoading && (
          <div className="lds-hourglass" />
          )}
          <div className="form-area">
            <div className="forms">
              <form
                onSubmit={this.handleLogin}
                className="body"
              >
                <input
                  type="email"
                  name="login"
                  placeholder="Email"
                  value={login}
                  onChange={this.onChange}
                  minLength="6"
                  disabled={isLoading}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.onChange}
                  disabled={isLoading}
                  maxLength="30"
                  minLength="6"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={this.handleLogin}
                >
                  Sign In
                </button>
                <p className="form-bottom">
                  {"Don't have an account? "}
                  <Link to="/registration">Sign Up</Link>
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

SignIn.defaultProps = {
  user: null
};

SignIn.propTypes = {
  loginUserAction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
