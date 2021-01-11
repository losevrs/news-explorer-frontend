import React, { useState } from 'react';

import PopupWithForm from '../PopupWithForm/PopupWithForm';
import InputWithValidation from '../../UIComponents/InputWithValidation/InputWithValidation';

import './Registration.css';

export default function Registration(props) {

  const [userLogin, setUserLogin] = useState('');
  const [userLoginIsValid, setUserLoginIsValid] = useState(true);
  const [isLoginTouched, setIsLoginTouched] = useState(false);

  const [userPassword, setUserPassword] = useState('');
  const [userPasswordIsValid, setUserPasswordIsValid] = useState(true);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const [userName, setUserName] = useState('');
  const [userNameIsValid, setUserNameIsValid] = useState(true);
  const [isNameTouched, setIsNameTouched] = useState(false);

  const resetInput = () => {
    setUserLogin('');
    setIsLoginTouched(false);
    setUserPassword('');
    setIsPasswordTouched(false);
    setUserName('');
    setIsNameTouched(false);
  }

  const handleChangeLogin = (event) => {
    setIsLoginTouched(true);
    setUserLogin(event.target.value);
  }

  const handleChangePassword = (event) => {
    setIsPasswordTouched(true);
    setUserPassword(event.target.value);
  }

  const handleChangeName = (event) => {
    setIsNameTouched(true);
    setUserName(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.onSubmitRegistration) {
      props.onSubmitRegistration(userLogin);
    }
    resetInput();
  }

  const handleOnClose = () => {
    props.onClose();
    resetInput();
  }

  return (
    <PopupWithForm
      className='registration'
      name='registration'
      title='Регистрация'
      buttonTitle='Зарегистрироваться'
      buttonEnabled={userLoginIsValid && userPasswordIsValid && userNameIsValid}
      isOpened={props.isOpened}
      onClose={handleOnClose}
      onSubmit={handleSubmit}
      formError='Ошибка регистрации будет тут'
      formLink='/'
      onLinkClick={props.onLinkClick}
      linkText='Войти'
    >

      <InputWithValidation
        className='registration__field'
        wrapClasses='registration__email'
        label='Email'
        type='email'
        name='login'
        top={true}
        placeholder='Введите почту'
        value={userLogin}
        onChange={handleChangeLogin}
        required={true}
        isTouched={isLoginTouched}
        onButtonStatusChange={setUserLoginIsValid} />

      <InputWithValidation
        className='registration__field'
        wrapClasses='registration__password'
        label='Пароль'
        type='password'
        name='password'
        placeholder='••'
        minLength={8}
        value={userPassword}
        onChange={handleChangePassword}
        required={true}
        isTouched={isPasswordTouched}
        onButtonStatusChange={setUserPasswordIsValid} />

      <InputWithValidation
        className='registration__field'
        wrapClasses='registration__name'
        label='Имя'
        type='text'
        name='username'
        top={true}
        placeholder='Введите своё имя'
        value={userName}
        onChange={handleChangeName}
        required={true}
        isTouched={isNameTouched}
        onButtonStatusChange={setUserNameIsValid} />
    </PopupWithForm>
  );
}
