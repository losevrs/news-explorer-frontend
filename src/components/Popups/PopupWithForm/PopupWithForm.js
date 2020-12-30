import React from 'react';

import './PopupWithForm.css';
import Popup from '../Popup/Popup';
import { Link } from 'react-router-dom';

export default function PopupWithForm(props) {

  let enabled = true; // если извне статус не задан - значит не учитываем его
  if (props.buttonEnabled !== undefined) {
    enabled = props.buttonEnabled;
  }

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
      <form className='popup-form'
        action='#'
        method='POST'
        name={`${props.name}`}
        noValidate
        onSubmit={props.onSubmit}>
        <h2 className='popup-form__title'>{`${props.title}`}</h2>

        {props.children}

        {props.formError
          ? <span className={`popup-form__error`}>
            {props.formError}
          </span>
          : null
        }
        <button
          className={`popup-form__submit ${props.formError ? 'popup-form__submit_error' : ''} ${enabled ? '' : 'popup-form__submit_disabled'}`}
          disabled={enabled ? '' : 'disabled'}
          type='submit'>{props.buttonTitle}</button>
        <button className='popup-form__reset'
          type='button'
          onClick={props.onClose} />
        {props.formLink
          ? <p className='popup-form__link-container'>
            или <Link to={props.formLink} className='popup-form__link' onClick={onLinkClick}>{props.linkText}</Link>
          </p>
          : null}
      </form>
    </Popup>
  );
}