import './SearchResult.css';
import { useDataContext } from '../../contexts/DataContext';

import NewsCard from '../NewsCard/NewsCard';

export default function SearchResult(props) {
  const context = useDataContext();
  const onNextHandler = (count = 3) => {
    if (props.onNext) {
      props.onNext(count);
    }
  }

  return (
    <div className='search-result'>
      <h2 className='search-result__title'>Результаты поиска</h2>
      <ul className='search-result__cards'>
        <NewsCard
          mode='serched'
          data={context.activeCards[0]}
        />
        <NewsCard
          mode='serched'
          data={context.activeCards[1]}
        />
        <NewsCard
          mode='serched'
          data={context.activeCards[2]}
        />
      </ul>
      <button className='search-result__next'
        type='button'
        onClick={onNextHandler}>
        Показать еще
      </button>
    </div>
  )
}
