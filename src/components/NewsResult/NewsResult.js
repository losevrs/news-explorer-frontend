import './NewsResult.css';
import { useDataContext } from '../../contexts/DataContext';

import NewsCard from '../NewsCard/NewsCard';

export default function NewsResult(props) {
  const context = useDataContext();
  const onNextHandler = (count = 3) => {
    if (props.onNext) {
      props.onNext(count);
    }
  }

return (
  <div className='search-result'>
    {props.type === 'main' ? <h2 className='search-result__title'>Результаты поиска</h2> : ''}
    <ul className='search-result__cards'>
      {context.activeCards.map((news, index) => (
        <NewsCard
          key={index}
          loggedIn={props.loggedIn}
          type={props.type}
          data={news}
        />
      ))}
    </ul>
    {props.type === 'main' ? <button className='search-result__next'
      type='button'
      onClick={onNextHandler}>
      Показать еще
      </button> : ''}
  </div>
)
}
