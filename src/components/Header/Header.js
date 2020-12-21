import './Header.css';

import Navigation from '../Navigation/Navigation';
import HeaderButton from '../UIComponents/HeaderButton/HeaderButton';

export default function Header(props) {
  return (
    <header className={`header ${props.headerStyle === 'white' && 'header_white'}`}>
      <p className={`${props.headerStyle !== 'white' ? 'header__logo' : 'header__logo_white'}`}>NewsExplorer</p>
      <Navigation
        headerStyle={props.headerStyle}
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
      />
    </header>
  );
}
