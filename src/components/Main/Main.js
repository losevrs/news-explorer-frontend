import './Main.css';
import About from '../About/About';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import NewsResult from '../NewsResult/NewsResult';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';

export default function Main(props) {
  return (
    <main className='main'>
      <section className='main__top'>
        <Header
          loggedIn={props.loggedIn}
        />
        <SearchForm
          onSubmit={props.onSubmit}
        />
      </section>
      <section className='main__search-result'>
        {props.showNewsResult ? <NewsResult /> : null}
        {props.showPreloader ? <Preloader /> : null}
        {props.showNotFound ? <NotFound /> : null}
      </section>
      <About />
      <Footer />
    </main>
  );
}
