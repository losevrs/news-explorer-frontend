import React, { useState } from 'react';

import './Header.css';

import Navigation from '../Navigation/Navigation';
import HeaderButton from '../UIComponents/HeaderButton/HeaderButton';
import BurgerButton from '../UIComponents/BurgerButton/BurgerButton';

export default function Header(props) {
  const [showElement, setShowElement] = useState(window.screen.width < 550 ? false : true);

  const onToggle = () => {
    setShowElement(!showElement);
  }

  return (
    <header className={`header 
                        ${!showElement && 'header_hide'} 
                        ${props.headerStyle === 'white' && 'header_white'}`}>
      <p className={`${props.headerStyle !== 'white' ? 'header__logo' : 'header__logo_white'}`}>NewsExplorer</p>
      <BurgerButton
        headerStyle={props.headerStyle}
        onToggle={onToggle}
      />
      <Navigation
        headerStyle={props.headerStyle}
        show={showElement}
        linkList={[
          {
            name: 'Главная',
            link: '/',
            show: true
          },
          {
            name: 'Сохранённые статьи',
            link: '/saved-news',
            show: props.loggedIn
          },
        ]} />
      <HeaderButton
        headerStyle={props.headerStyle}
        loggedIn={props.loggedIn}
        show={showElement}
      />
    </header>
  );
}
