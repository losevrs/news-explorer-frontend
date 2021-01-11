import './About.css';
import ava from '../../images/About/ava2.jpg';

export default function About() {
  return (
    <article className='about'>
      <img className='about__avatar' src={ava} alt='Автор проекта' />
      <section className='about__container'>
        <h2 className='about__title'>
          Об авторе
      </h2>
        <p className='about__text'>
          Это дипломная работа Một Sinh Viên Tốt по курсу Яндекс Практикума - веб разработка.
          В ней задействованы NodeJS и Mongodb для бэкэнда. Так же React для разработки 
          фронта.
      </p>
        <p className='about__text'>
          Все эти технологии теоретически и на практике рассматривались в течении курса.
          Настаящая работа призвана подтвердить, что они усвоены студентом.
      </p>
      </section>
    </article>
  );
}