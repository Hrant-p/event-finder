import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <p>
        Copyright ©
        {new Date().getFullYear()}
        {' '}
        Event Finder
      </p>
    </div>
  );
}

export default Footer;
