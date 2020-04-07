import React, { Component, Fragment } from 'react';
import './Login.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  isAuthSelector,
  isLoadingUserSelector,
  userSelector
} from '../../store/selectors/usersSelector';
import { loginUser } from "../../store/actions/userActionCreator";
import {app} from "../../API/firebase";

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

    //   } else {
    //     this.setState({
    //       statusOfToolTip: true,
    //       textForToolTip: 'Login or Password is incorrect',
    //     });
    //
    //     setTimeout(() => {
    //       this.setState({
    //         statusOfToolTip: false,
    //         textForToolTip: '',
    //       });
    //     }, 3000);
    //   }
    };

    // componentDidMount() {
      // const { history } = this.props;
      // if (sessionStorage.id && sessionStorage.id !== '') {
      //   history.push('/dashboard');
      // }
    // }

    render() {
      const { isLoading, user, isAuth } = this.props;
      const {
        login,
        password,
        statusOfToolTip,
        textForToolTip,
      } = this.state;

      if (user) {
        return <Redirect to="/dashboard" />;
      }

      return (
        <Fragment>
          <h2 style={{ textAlign: 'center', color: '#44469' }}>Events Search Application</h2>
          <button onClick={() => app.auth().signOut()}>signout</button>
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
                    required
                    onChange={this.onChange}
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
  isAuth: isAuthSelector(state)
});

const mapDispatchToProps = dispatch =>  bindActionCreators({
  loginUserAction: loginUser
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
