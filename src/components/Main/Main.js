import './Main.css';
import About from '../About/About';
import Footer from '../Footer/Footer';

export default function Main() {
  return (
    <main className='main'>
      <section>
        <p>Тут будет Header и SF !!!</p>
      </section>
      <section>
        <p>Тут будет результат поиска !!!</p>
      </section>
      <About />
      <Footer />
    </main>
  );
}