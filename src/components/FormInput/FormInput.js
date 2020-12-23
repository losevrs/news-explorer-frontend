import './FormInput.css';
import SearchButton from '../UIComponents/SearchButton/SearchButton';

export default function FormInput(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if(props.onSubmit) {
      props.onSubmit('valUe');
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
        className='searchform__input'
        type='text'
        name='searchformInput'
        placeholder='Введите тему новости'
      />
      <SearchButton />
    </form>
  );
}