import React, { useEffect, useRef, useState } from 'react'
import './InputWithValidation.css';

export default function InputWithValidation(props) {

  const emailRegExp = /.+@.+\..+/i;
  const urlRegExp = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');

  let input = useRef(null);

  const isValidField = () => {
    if (props.minLength) {
      if (props.value.length < props.minLength) {
        const lastDigit = props.minLength % 10;
        setIsValid(false);
        setValidationMessage(`Минимальная длина поля ${props.minLength} символ${lastDigit > 1 ? (lastDigit < 5 ? 'a' : 'ов') : ''}`);
        return;
      }
    }

    if (props.maxLength) {
      if (props.value.length > props.minLength) {
        const lastDigit = props.maxLength % 10;
        setIsValid(false);
        setValidationMessage(`Максимальная длина поля ${props.maxLength} символ${(lastDigit > 1 && lastDigit) < 5 ? 'a' : 'ов'}`);
        return;
      }
    }

    if (props.required) {

      if (props.value === '') {
        setIsValid(false);
        setValidationMessage(`Это обязательное поле`);
        return;
      }

      switch (props.type) {
        case 'email':
          if (!emailRegExp.test(props.value)) {
            setIsValid(false);
            setValidationMessage(`Неправильный формат email`);
            return;
          }
          break;
        case 'url':
          if (!urlRegExp.test(props.value)) {
            setIsValid(false);
            setValidationMessage(`Неправильный формат URL`);
            return;
          }
          break;
        default:
          break;
      };
    }

    setIsValid(true);
    setValidationMessage('');
  }

  const validate = () => {
    isValidField();
    if (props.onButtonStatusChange !== undefined) {
      props.onButtonStatusChange(isValid);
    }
  }

  useEffect(() => {
    validate();
  });

  return (
    <div className={props.wrapClasses}>
      {props.label
        ? <label className={`input-label ${props.top ? 'input-label_top' : ''}`} htmlFor={props.name}>
          {props.label}
        </label>
        : null}
      <input
        className={props.className}
        type={props.type}
        name={props.name ? 'n-' + props.name : ''}
        id={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        minLength={props.minLength}
        maxLength={props.maxLength}
        ref={input}
      />
      <span className={`input-error ${(!isValid && props.isTouched) ? 'input-error_visible' : ''}`}>
        {validationMessage}
      </span>
    </div>
  );
}