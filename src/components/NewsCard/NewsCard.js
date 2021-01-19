import './NewsCard.css';
import React, { useState, useEffect } from 'react';

import { getCardDate } from '../../utils/utils';

import ImageWithError from '../UIComponents/ImageWithError';
import CardTool from '../CardTool/CardTool';

export default function NewsCard(props) {
  const title = props.data ? props.data.title : '';
  const publishedAt = props.data ? (props.type === 'main' ? props.data.publishedAt : props.data.date) : '';
  const description = props.data ? (props.type === 'main' ? props.data.description : props.data.text) : '';
  const urlToImage = props.data ? (props.type === 'main' ? props.data.urlToImage : props.data.image) : '';
  const urlToNews = props.data ? (props.type === 'main' ? props.data.url : props.data.link) : '';
  const name = props.data ? (props.type === 'main' ? props.data.source.name : props.data.source) : '';
  const category = props.data ? (props.type === 'main' ? props.data.category : props.data.keyword) : '';
  const _id = props.data ? props.data._id : '';

  const [toSaveCardData, setToSaveCardData] = useState({});

  useEffect(() => {
    setToSaveCardData({
      keyword: category,
      title: title,
      text: description,
      date: publishedAt,
      source: name,
      link: urlToNews,
      image: urlToImage,
      _id: _id,
    })
  }, [category, description, name, publishedAt, title, urlToImage, urlToNews, _id]);

  const setCardId = (id) => {
    const newCard = { ...toSaveCardData };
    newCard._id = id;
    setToSaveCardData(newCard);
  }

  const onSaveCardHandler = () => {
    if (props.onSaveCard) {
      props.onSaveCard(toSaveCardData, setCardId);
    }
  }

  const onDeleteCardHandler = () => {
    if (props.onDeleteCard) {
      props.onDeleteCard(toSaveCardData._id, props.type !== 'main');
    }
  }

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
              onSaveCard={onSaveCardHandler}
              onDeleteCard={onDeleteCardHandler}
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