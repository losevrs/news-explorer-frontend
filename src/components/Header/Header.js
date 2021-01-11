import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import Navigation from '../Navigation/Navigation';
import HeaderButton from '../UIComponents/HeaderButton/HeaderButton';
import BurgerButton from '../UIComponents/BurgerButton/BurgerButton';
import Substrate from '../Substrate/Substrate';

export default function Header(props) {
  const [showOpened, setShowOpened] = useState(false);

  const onToggle = () => {
    setShowOpened(!showOpened);
  }

  return (
    <header className={`header ${props.headerStyle === 'white' ? 'header_white' : ''} ${showOpened ? 'header_opened' : ''}`}>
      <div className={`header__container ${props.headerStyle === 'white' ? 'header__container_white' : ''} ${showOpened ? 'header__container_opened' : ''}`}>
        <Substrate
          show={showOpened}
          onClick={onToggle}
        />
        <div className={`header__logo-container ${showOpened ? 'header__logo-container_opened' : ''}`}>
          <Link
            to='/'
            className={`header__logo ${props.headerStyle === 'white' ? 'header__logo_white' : ''}`}>
            NewsExplorer</Link>
          <BurgerButton
            headerStyle={props.headerStyle}
            show={showOpened}
            onToggle={onToggle}
          />
        </div>
        <Navigation
          headerStyle={props.headerStyle}
          show={showOpened}
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
          show={showOpened}
          onButtonClick={props.onButtonClick}
        />
      </div>
    </header>
  );
}
