import './NewsResult.css';
import { useDataContext } from '../../contexts/DataContext';

import NewsCard from '../NewsCard/NewsCard';

import {
  activeCardsGet,
} from '../../utils/ActiveCards';


export default function NewsResult(props) {
  const showCards = activeCardsGet();
  const context = useDataContext();

  const showNextButton = context.currentPosition < context.searchResult.length;

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
