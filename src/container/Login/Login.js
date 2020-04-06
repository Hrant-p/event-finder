import React, { Component, Fragment } from 'react';
import './Login.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { isLoadingUserSelector, allUsersSelector } from '../../store/selectors/usersSelector';
import { getAllUsersRequest } from '../../store/actions/userActionCreator';
import { app } from '../../API/firebase';

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

    handleLogin = async e => {
      e.preventDefault();
      const { login, password } = this.state;
      const { history } = this.props;


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

    componentDidMount() {
      const { history } = this.props;
      if (sessionStorage.id && sessionStorage.id !== '') {
        history.push('/dashboard');
      }
    }

    render() {
      const { isLoading } = this.props;
      const {
        login,
        password,
        statusOfToolTip,
        textForToolTip,
      } = this.state;

      // if (currentUser) {
      //   return <Redirect to="/dashboard" />;
      // }

      return (
        <>
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
        </>
      );
    }
}

const mapStateToProps = state => ({
  isLoading: isLoadingUserSelector(state),
});


export default connect(
  mapStateToProps,
  null,
)(Login);
