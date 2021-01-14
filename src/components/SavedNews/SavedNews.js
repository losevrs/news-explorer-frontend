import Header from '../Header/Header';
import SavedNewsInfo from '../SavedNewsInfo/SavedNewsInfo';
import NewsResult from '../NewsResult/NewsResult';
import Footer from '../Footer/Footer';

import './SavedNews.css';

export default function SavedNews(props) {
  return (
    <section className='savednews'>
      <Header 
        headerStyle = 'white'
        loggedIn={props.loggedIn}
        onButtonClick={props.onButtonClick}
      />
      <SavedNewsInfo />
      <NewsResult type='seved-news'/>
      <Footer />
    </section>
  );
}
