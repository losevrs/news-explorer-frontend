import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

export default function Navigation(props) {
  let navClass = '';

  props.show
    ? navClass = 'navigation'
    : navClass = 'navigation_hide';

  const classes = `navigation__link ${props.headerStyle === 'white' && 'navigation__link_white'}`;
  const classActive = `navigation__linkactive ${props.headerStyle === 'white' && 'navigation__linkactive_white'}`;

  return (
    <nav className={navClass}>
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
