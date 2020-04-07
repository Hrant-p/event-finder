import React  from 'react';
import {Link, useLocation} from 'react-router-dom';

import './Navbar.scss';
import {logOut} from "../../store/actions/userActionCreator";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


const Navbar = ({ logOutAction }) => {

  const { pathname } = useLocation();
  const loginPage =
    pathname.includes("login") ||
    pathname.includes("registration") ||
    pathname === "/";

    return (
      <div className="navbar">
        {!loginPage && (
          <ul className="nav-list-1">
            <li>
              <a
                  href="#"
                  className="nav-item"
                  onClick={e => {
                    e.preventDefault();
                    logOutAction()
                  }}
              >
                Log Out
              </a>
            </li>
          </ul>
        )}
        {loginPage  && (<ul className="nav-list-2">
          <li>
            <Link to="/registration" className="nav-item">
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav-item">
              Login
            </Link>
          </li>
        </ul>)}
      </div>
    );
};

const mapDispatchToProps = dispatch => bindActionCreators({
  logOutAction: logOut
}, dispatch);

export default connect(null, mapDispatchToProps)(Navbar);
