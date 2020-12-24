import React, { useState } from 'react';

import './FormInput.css';
import SearchButton from '../UIComponents/SearchButton/SearchButton';

export default function FormInput(props) {
  const [searchValue, setSearchValue] = useState('');
  const setSerchValueHandler = (event) => {
    setSearchValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(props.onSubmit) {
      props.onSubmit(searchValue);
    }
  }

  return (
    <form className='forminput'
      action='#'
      method='POST'
      name={`searchform`}
      noValidate
      onSubmit={handleSubmit}>
        <input
        value={searchValue}
        onChange={setSerchValueHandler}
        className='searchform__input'
        type='text'
        name='searchformInput'
        placeholder='Введите тему новости'
      />
      <SearchButton />
    </form>
  );
}