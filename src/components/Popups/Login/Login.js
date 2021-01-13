import React, { useState } from 'react';

import PopupWithForm from '../PopupWithForm/PopupWithForm';
import InputWithValidation from '../../UIComponents/InputWithValidation/InputWithValidation';

import './Login.css';

export default function Login(props) {

  const [userLogin, setUserLogin] = useState('');
  const [userLoginIsValid, setUserLoginIsValid] = useState(true);
  const [isLoginTouched, setIsLoginTouched] = useState(false);

  const [userPassword, setUserPassword] = useState('');
  const [userPasswordIsValid, setUserPasswordIsValid] = useState(true);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const resetInput = () => {
    setUserLogin('');
    setIsLoginTouched(false);
    setUserPassword('');
    setIsPasswordTouched(false);
  }

  const handleChangeLogin = (event) => {
    setIsLoginTouched(true);
    setUserLogin(event.target.value);
  }

  const handleChangePassword = (event) => {
    setIsPasswordTouched(true);
    setUserPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.onSubmitLogin) {
      props.onSubmitLogin({ 'email': userLogin, 'password': userPassword });
    }
    resetInput();
  }

  const handleOnClose = () => {
    props.onClose();
    resetInput();
  }

  return (
    <PopupWithForm
      className='login'
      name='login'
      title='Вход'
      buttonTitle='Войти'
      buttonEnabled={userLoginIsValid && userPasswordIsValid}
      isOpened={props.isOpened}
      onClose={handleOnClose}
      onSubmit={handleSubmit}
      formError={props.loginError}
      formLink='/'
      onLinkClick={props.onLinkClick}
      linkText='Зарегистрироваться'
    >

      <InputWithValidation
        className='login__field'
        wrapClasses='login__email'
        label='Email'
        type='email'
        name='login-name'
        top={true}
        placeholder='Введите почту'
        value={userLogin}
        onChange={handleChangeLogin}
        required={true}
        isTouched={isLoginTouched}
        onButtonStatusChange={setUserLoginIsValid} />

      <InputWithValidation
        className='login__field'
        wrapClasses='login__password'
        label='Пароль'
        type='password'
        name='login-password'
        placeholder='••'
        minLength={8}
        value={userPassword}
        onChange={handleChangePassword}
        required={true}
        isTouched={isPasswordTouched}
        onButtonStatusChange={setUserPasswordIsValid} />
    </PopupWithForm>
  );
}
