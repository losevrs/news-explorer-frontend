import './NewsCard.css';
import { getCardDate } from '../../utils/utils';

import ImageWithError from '../UIComponents/ImageWithError';
import CardTool from '../CardTool/CardTool';

export default function NewsCard(props) {
  const title = props.data ? props.data.title : '';
  const publishedAt = props.data ? props.data.publishedAt : '';
  const description = props.data ? props.data.description : '';
  const urlToImage = props.data ? props.data.urlToImage : '';
  const urlToNews = props.data ? props.data.url : '';
  const name = props.data ? props.data.source.name : '';
  const category = props.data ? props.data.category : '';

  return (
    <>
      {
        props.data ?
          <li className='news-card' >
            {
              props.type !== 'main'
                ? <p className='news-card__category'>
                  {category}
                </p>
                : null
            }
            <CardTool
              type={props.type}
              loggedIn={props.loggedIn}
            />
            <ImageWithError className='news-card__image'
              src={urlToImage}
              alt={title}
            />
            <a className='news-card__link' href={urlToNews} target='_blank' rel='noreferrer'>
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
            </a>
          </li>
          :
          null
      }
    </>
  )
}