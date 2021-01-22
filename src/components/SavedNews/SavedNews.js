import React, { useEffect } from 'react';

import Header from '../Header/Header';
import SavedNewsInfo from '../SavedNewsInfo/SavedNewsInfo';
import NewsResult from '../NewsResult/NewsResult';
import Footer from '../Footer/Footer';

import './SavedNews.css';



export default function SavedNews(props) {

  useEffect(() => {
    if (props.onGetCards) {
      props.onGetCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='savednews'>
      <Header
        headerStyle='white'
        loggedIn={props.loggedIn}
        onButtonClick={props.onButtonClick}
      />
      <SavedNewsInfo
        savedUserCards={props.savedUserCards}
      />
      <NewsResult
        type='seved-news'
        savedUserCards={props.savedUserCards}
        loggedIn={props.loggedIn}
        onDeleteCard={props.onDeleteCard}
      />
      <Footer />
    </section>
  );
}
