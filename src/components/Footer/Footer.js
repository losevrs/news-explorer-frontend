import React from 'react';
import { Link } from 'react-router-dom';

import fb from '../../images/footer/fb.jpg';
import gh from '../../images/footer/gh.jpg';

import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__copyright'>&copy; 2020 Supersite, Powered by News API</p>
      <div className='footer__menucontainer'>
        <nav className='footer__menu'>
          <Link to='/' className='footer__link'>Главная</Link>
          <Link to='/yap' target='_blank' className='footer__link'>Яндекс.Практикум</Link>
        </nav>
        <nav className='footer__social'>
          <Link to='/gh' target='_blank' className='footer__iconedlink'>
            <img className='footer__linkicon'
              src={gh}
              alt='Git Hub' />
          </Link>
          <Link to='/fb' target='_blank' className='footer__iconedlink'>
            <img className='footer__linkicon'
              src={fb}
              alt='Facebook' />
          </Link>
        </nav>
      </div>
    </footer>
  );
}