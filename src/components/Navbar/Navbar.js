import React  from 'react';
import {Link, useLocation} from 'react-router-dom';

import './Navbar.scss';


const Navbar = () => {
  const removeId = () => {
    sessionStorage.setItem("id", "")
  };

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
              <Link to="/" className="nav-item" onClick={removeId}>
                Log Out
              </Link>
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

export default Navbar;
