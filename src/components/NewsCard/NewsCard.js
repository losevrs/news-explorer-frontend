import './NewsCard.css';
import { getCardDate } from '../../utils/utils';

export default function NewsCard(props) {
  const title = props.data ? props.data.title : '';
  const publishedAt = props.data ? props.data.publishedAt : '';
  const description = props.data ? props.data.description : '';
  const urlToImage = props.data ? props.data.urlToImage : '';
  const name = props.data ? props.data.source.name : '';

  return (
    <>
      {
        props.data ?
          <li className='news-card' >
            <img className='news-card__image'
              src={urlToImage}
              alt={title}
            />
            <p className='news-card__date'>{getCardDate(publishedAt)}</p>
            <div className='news-card__content'>
              <h2 className='news-card__title'>
                {title}
              </h2>
              <p className='news-card__description'>
                {description}
              </p>
            </div>
            <p className='news-card__name'>
              {name}
            </p>
          </li>
          :
          null
      }
    </>
  )
}