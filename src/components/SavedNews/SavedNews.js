import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './SavedNews.css';

export default function SavedNews(props) {
  return (
    <section className='savednews'>
      <Header 
        headerStyle = 'white'
        loggedIn={props.loggedIn}
      />
      <Footer />
    </section>
  );
}