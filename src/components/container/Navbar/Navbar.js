import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './Navbar.scss';


class Navbar extends Component {
  removeId = () => {
    sessionStorage.setItem("id", "")
  }

  render() {
    const loginPage =
      window.location.pathname.includes("login") ||
      window.location.pathname.includes("registration") ||
      window.location.pathname === "/";

    return (
      <div className="navbar">
        {!loginPage && (
          <ul className="nav-list-1">
            <li>
              <Link to="/" className="nav-item" onClick={this.removeId}>
                Log Out
              </Link>
            </li>
          </ul>
        )}
        <ul className="nav-list-2">
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
        </ul>
      </div>
    );
  }
};

export default Navbar;