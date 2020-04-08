import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Navbar.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOut } from '../../store/actions/userActionCreator';


const Navbar = ({ logOutAction }) => {
  const { pathname } = useLocation();
  const loginPage = pathname.includes('login')
    || pathname.includes('registration')
    || pathname === '/';

  return (
    <div className="navbar">
      {!loginPage && (
      <ul className="nav-list-1">
        <li>
          <a
            href="#"
            className="nav-item"
            rel="noreferrer noopener"
            onClick={e => {
              e.preventDefault();
              logOutAction();
            }}
          >
            Log Out
          </a>
        </li>
      </ul>
      )}
      {loginPage && (
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
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({
  logOutAction: logOut
}, dispatch);

Navbar.propTypes = {
  logOutAction: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Navbar);
