import React from 'react';

import './Success.css';

import Popup from '../Popup/Popup';
import { Link } from 'react-router-dom';

export default function Success(props) {

  const onLinkClick = () => {
    if (props.onClose) {
      props.onClose();
    }

    if (onLinkClick) {
      props.onLinkClick();
    }
  }

  return (
    <Popup
      name={props.name}
      isOpened={props.isOpened}
      onClose={props.onClose}>
      <form className='success-form'
        action='#'
        method='POST'
        name={`success`}
        noValidate>
        <h2 className='success-form__title'>{`Пользователь успешно зарегистрирован!`}</h2>
        <button className='success-form__reset'
          type='button'
          onClick={props.onClose} />
        {props.formLink
          ? <Link to={props.formLink} className='success-form__link' onClick={onLinkClick}>{props.linkText}</Link>
          : null}
      </form>
    </Popup>
  );
}
