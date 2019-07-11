import React, { Component } from 'react';
import './SignUp.scss';
import { fromJS } from "immutable";
import {
  isLoadingUserSelector,
  allUsersSelector
} from "../../store/selectors/usersSelector";
import { createNewUserRequest } from "../../store/actions/userActionCreator";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

 class SignUp extends Component {
   constructor(props) {
     super(props);

     this.state = {
       login: "",
       password: ""
     };
   }

   onChange = ({ currentTarget: { value, name } }) => {
     this.setState({
       [name]: value
     });
   };

   handleClick = () => {
        const { createNewUserRequest, allUsers } = this.props;
        const { login, password } = this.state;
        const newUser = allUsers.set(login, fromJS({login, password}));

        if (allUsers.has(login) && (login.length < 1 || password.length < 1)) {
        this.setState({
            statusOfToolTip: true,
            textForToolTip: "This userName is already used"
        });

        setTimeout(() => {
            this.setState({
            statusOfToolTip: false,
            textForToolTip: ""
            });
        }, 3000);
        } else {
            const { history } = this.props;
            
            createNewUserRequest(newUser, history);
}
   }

   render() {
    const { isLoading } = this.props;
     const {
       login,
       password,
       statusOfToolTip,
       textForToolTip
     } = this.state;

     return (
       <div className="signup-page">
         {isLoading && (
           <div className="lds-hourglass" style={{ marginLeft: 0 }} />
         )}
         <div className="input-field">
           <div className="forms">
             <input
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
             <button type="submit" onClick={this.handleClick}>
               Sign Up
             </button>
           </div>
         </div>
         {statusOfToolTip && (
           <div className="toolTip">{textForToolTip}</div>
         )}
       </div>
     );
   }
 };

const mapStateToProps = state => ({
  isLoading: isLoadingUserSelector(state),
  allUsers: allUsersSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createNewUserRequest
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)