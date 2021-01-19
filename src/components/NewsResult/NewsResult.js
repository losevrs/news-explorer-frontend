import './NewsResult.css';

import NewsCard from '../NewsCard/NewsCard';

import {
  getSearchParamsLS,
  getSearchedCardsLS,
} from '../../utils/ActiveCards';


export default function NewsResult(props) {
  const showParams = getSearchParamsLS();
  if (!showParams) { // Значит баг
    return;
  }

  let showCards = [];
  let showNextButton = false;

  if (props.type === 'main') {
    showCards = getSearchedCardsLS();
    showCards = showCards.slice(0, showParams.currentPosition);
    showNextButton = showCards.length < getSearchedCardsLS().length;
  } else {
    if (props.savedUserCards) {
      showCards = props.savedUserCards;
    }
  }

  const onNextHandler = () => {
    if (props.onNext) {
      props.onNext();
    }
  }

  return (
    <div className='search-result'>
      {props.type === 'main' ? <h2 className='search-result__title'>Результаты поиска</h2> : ''}
      <ul className='search-result__cards'>
        {showCards
          ? showCards.map((news, index) => (
            <NewsCard
              key={index}
              loggedIn={props.loggedIn}
              type={props.type}
              data={news}
              onSaveCard={props.onSaveCard}
              onDeleteCard={props.onDeleteCard}
            />
          ))
          : ''}
      </ul>
      {props.type === 'main' && showNextButton
        ? <button className='search-result__next'
          type='button'
          onClick={onNextHandler}>
          Показать еще</button>
        : ''}
    </div>
  )
}
