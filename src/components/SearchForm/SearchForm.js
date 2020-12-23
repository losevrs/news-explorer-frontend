import './SearchForm.css';
import FormInput from '../FormInput/FormInput';

export default function SearchForm(props) {
  return (
    <section className='searchform'>
      <article className='searchform__article'>
        <h2 className='searchform__title'>Что творится в мире?</h2>
        <p className='searchform__text'>
          Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.
        </p>
        <FormInput
          onSubmit={props.onSubmit}
        />
      </article>
    </section>
  );
}