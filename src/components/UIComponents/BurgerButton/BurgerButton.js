import React from 'react';
import './BurgerButton.css';

export default function BurgerButton(props) {
  const [isActive, setIsActive] = React.useState(false);

  const onClickHandle = () => {
    setIsActive(!isActive);
    if (props.onToggle) {
      props.onToggle();
    }
  }

  return (
    <button
      className={`burger-button ${isActive && 'burger-button_active'}`}
      onClick={onClickHandle}>
      <span className={`burger-button__lines ${props.headerStyle && 'burger-button__lines_white'}`}></span>
    </button>
  );
}
