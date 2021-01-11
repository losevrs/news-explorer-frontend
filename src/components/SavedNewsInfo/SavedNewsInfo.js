import './SavedNewsInfo.css';
import { useDataContext } from '../../contexts/DataContext';

export default function SavedNewsInfo(props) {
  const context = useDataContext();

  return (
    <section className='seved-news-info'>
      <h2 className='seved-news-info__title'>
        Сохранённые статьи
      </h2>
      <p className='seved-news-info__title__total'>
        {context.user.name}, у вас 5 сохранённых статей
      </p>
      <p className='seved-news-info__title__count'>
        По ключевым словам: <strong>Природа, Тайга</strong> и <strong>2-м другим</strong>
      </p>
    </section>
  );
}