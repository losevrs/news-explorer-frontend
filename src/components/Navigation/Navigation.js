import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

export default function Navigation(props) {
  const classes = `navigation__link ${props.headerStyle === 'white' && 'navigation__link_white'}`;
  const classActive = `navigation__linkactive ${props.headerStyle === 'white' ? 'navigation__linkactive_white' : ''}`;

  return (
    <nav className={`navigation ${props.show && 'navigation_show'}`}>
      {
        props.linkList.map((element, index) => {
          return (
            element.show
              ? <NavLink
                key={index}
                exact to={element.link}
                className={classes}
                activeClassName={classActive}>
                {element.name}
              </NavLink>
              : null)
        })
      }
    </nav>
  );
}
