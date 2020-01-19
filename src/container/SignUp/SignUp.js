import React, { useState } from 'react';
import './SignUp.scss';
import { fromJS } from "immutable";
import {
  isLoadingUserSelector,
  allUsersSelector
} from "../../store/selectors/usersSelector";
import { createNewUserRequest } from "../../store/actions/userActionCreator";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {useHistory} from "react-router";

 const SignUp = ({createNewUserRequest, allUsers, isLoading}) => {

    const [ statusOfToolTip, setStatusOfToolTip ] = useState(false);
    const [ textForToolTip, setTextForToolTip ] = useState('');
     const [ formData, setFormData ] = useState({
       login: "",
       password: ""
     });
     const { login, password } = formData;
     const history  = useHistory();

     const onChange = ({ currentTarget: { value, name } }) => {
     setFormData({ ...formData,
       [name]: value
     });
   };

   const handleClick = () => {
        if (allUsers.has(login)) {
            setStatusOfToolTip(true);
            setTextForToolTip("This userName is already used");
            setTimeout(() => {
                setStatusOfToolTip(false);
                setTextForToolTip("");
                }, 3000);
        } else if (login.length < 1 || password.length < 1) {
            setStatusOfToolTip(true);
            setTextForToolTip("Please type correct mail & password");
            setTimeout(() => {
                setStatusOfToolTip(false);
                setTextForToolTip("");
            }, 3000);
        } else {
            const newUser = allUsers.set(login, fromJS({login, password}));
            createNewUserRequest(newUser, history);
        }
   };

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
               onChange={e => onChange(e)}
             />
             <input
               type="password"
               name="password"
               placeholder="Password"
               value={password}
               required
               onChange={e => onChange(e)}
             />
             <button
                 type="submit"
                 onClick={handleClick}
             >
               Sign Up
             </button>
           </div>
         </div>
         {statusOfToolTip && (
           <div className="toolTip">{textForToolTip}</div>
         )}
       </div>
     );
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
)(SignUp);
