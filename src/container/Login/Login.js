import React, { Component, Fragment } from 'react';
import './Login.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  errorSelector,
  isAuthSelector,
  isLoadingUserSelector,
  userSelector
} from '../../store/selectors/usersSelector';
import { loginUser } from "../../store/actions/userActionCreator";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      statusOfToolTip: false,
      textForToolTip: '',
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
      const { isLoading, user } = this.props;
      const {
        login,
        password,
        statusOfToolTip,
        textForToolTip,
      } = this.state;

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
                <form onSubmit={this.handleLogin}>
                  <input
                    type="email"
                    name="login"
                    placeholder="Login"
                    value={login}
                    required
                    onChange={this.onChange}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.onChange}
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
            {statusOfToolTip && (
            <div className="toolTip">{textForToolTip}</div>
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

const mapDispatchToProps = dispatch =>  bindActionCreators({
  loginUserAction: loginUser
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
