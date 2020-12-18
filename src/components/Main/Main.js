import './Main.css';
import About from '../About/About';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

export default function Main(props) {
  return (
    <main className='main'>
      <section className='main__top'>
        <Header
          loggedIn={props.loggedIn}
        />
        <SearchForm />
      </section>
      <section>
        <p>Тут будет результат поиска !!!</p>
      </section>
      <About />
      <Footer />
    </main>
  );
}