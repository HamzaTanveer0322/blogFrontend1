import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-containerr'>
      <div className='footer-content'>
        <div className='footer-left'>
          <h5>Hamza Tanveer</h5>
          <p>Creating innovative solutions, one blog at a time.</p>
          <p>Email: <a href="mailto:your-email@example.com">hamzatanveer7729@gmail.com</a></p>
        </div>
        <div className='footer-right'>

          <a className='contact-btn' href="/Contact"> Contact Us</a>
          <ul className='footer-menu'>
            <li><a href='/about'>About</a></li>
            <li><a href='/privacy'>Privacy Policy</a></li>
            <li><a href='/terms'>Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className='social-media'>
        <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-facebook'></i>
        </a>
        <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-twitter'></i>
        </a>
        <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-linkedin'></i>
        </a>
      </div>
      <div className='footer-bottom'>
        <p>&copy; {new Date().getFullYear()} Hamza Tanveer. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
