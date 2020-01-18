import React, { Component } from 'react';
import './Login.scss';
import { isLoadingUserSelector, allUsersSelector } from "../../store/selectors/usersSelector";
import { getAllUsersRequest } from "../../store/actions/userActionCreator";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
          login: "",
          password: "",
          statusOfToolTip: false,
          textForToolTip: ""
        };
    };

    onChange = ({currentTarget: {value, name} }) => {
        this.setState({
          [name]: value
        });
    };

    handleLogin = () => {
        const { login, password } = this.state;
        const { allUsers } = this.props;

        if (
          login &&
          password &&
          allUsers.has(login) &&
          allUsers.getIn([login, "password"]) === password
        ) {
            const { history } = this.props;
            sessionStorage.setItem(
              "id",
              allUsers.getIn([login, "login"])
            );

            history.push("/dashboard");

        } else {
          this.setState({
            statusOfToolTip: true,
            textForToolTip: "Login or Password is incorrect"
          });

          setTimeout(() => {
            this.setState({
              statusOfToolTip: false,
              textForToolTip: ""
            });
          }, 3000);
        }
    }

    componentDidMount() {
        const { history } = this.props;
        const { pathname } = history.location

        if (!pathname.includes("login")) {
          history.push("/login");
        }

        if (sessionStorage.id && sessionStorage.id !== "") {
          history.push("/dashboard");
        } else {
          const { getAllUsersRequestActionCreator } = this.props;

          getAllUsersRequestActionCreator();
        };
    };

    render() {
        const { isLoading } = this.props;
        const {
          login,
          password,
          statusOfToolTip,
          textForToolTip
        } = this.state;

        return (
            <React.Fragment>
              <h2 style={{'textAlign': 'center', color: '#44469'}}>Events Search Application</h2>
              <div className="signup-page">
                {isLoading && (
                  <div
                    className="lds-hourglass"
                    style={{ marginLeft: 0 }}
                  />
                )}
                <div className="input-field">
                  <div className="forms">
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
                      onClick={() => this.handleLogin(login, password)}
                    >
                      Login
                    </button>
                  </div>
                </div>
                {statusOfToolTip && (
                  <div className="toolTip">{textForToolTip}</div>
                )}
              </div>
            </React.Fragment>
        );
    };
};

const mapStateToProps = state => ({
  isLoading: isLoadingUserSelector(state),
  allUsers: allUsersSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllUsersRequestActionCreator: getAllUsersRequest
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
