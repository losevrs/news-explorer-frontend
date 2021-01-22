import React, { useState, useEffect } from 'react';

import './SavedNewsInfo.css';
import { useUserContext } from '../../contexts/UserContext';

export default function SavedNewsInfo(props) {
  const context = useUserContext();
  const [savedParams, setSavedParams] = useState([]);

  const sevedNewsToString = (sevedNewsCount) => {
    const lastDigit = sevedNewsCount.slice(-1);

    if (sevedNewsCount > 10 && sevedNewsCount < 21) {
      return 'сохраненных статей';
    }

    switch (lastDigit) {
      case '1':
        return 'сохраненная статья';
      case '2':
      case '3':
      case '4':
        return 'сохраненных статьи';
      default:
        return 'сохраненных статей';
    }
  }

  const restCountToString = (restCount) => {
    let ret = `${restCount}`;
    const lastDigit = ret.slice(-1);

    if (restCount < 1) {
      return '';
    }

    if (restCount > 4 && restCount < 21) {
      return ret + '-ти другим';
    }

    switch (lastDigit) {
      case '1':
        ret += '-му другому';
        break;
      case '2':
      case '3':
      case '4':
        ret += '-м другим';
        break;
      case '7':
      case '8':
        ret += '-ми другим';
        break;
      default:
        ret += '-ти другим';
    }

    return ret;
  }

  const categoryCounts = {};
  function compareCategory(categoryA, categoryB) {
    if (categoryCounts[categoryA] < categoryCounts[categoryB]) return 1; 
    if (categoryCounts[categoryA] === categoryCounts[categoryB]) return 0;
    if (categoryCounts[categoryA] > categoryCounts[categoryB]) return -1;
  }

  useEffect(() => {
    if (props.savedUserCards) {
      const newParams = [];

      props.savedUserCards.forEach(element => {
        const index = newParams.findIndex(item => item === element.keyword);
        categoryCounts[element.keyword] ? categoryCounts[element.keyword] += 1 : categoryCounts[element.keyword] = 1;
        if (index === -1) {
          newParams.push(element.keyword);
        }
      });

      newParams.sort(compareCategory);
      setSavedParams(newParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.savedUserCards]);

  const firstCategory = savedParams.slice(0, 2);
  const savedNewsCount = props.savedUserCards !== undefined ? props.savedUserCards.length : 0;

  return (
    <section className='seved-news-info'>
      <h2 className='seved-news-info__title'>
        Сохранённые статьи
      </h2>
      <p className='seved-news-info__title__total'>
        {`${context.name}, у вас ${savedNewsCount} ${sevedNewsToString(savedNewsCount.toString())}`}
      </p>
      <p className='seved-news-info__title__count'>
        По ключевым словам: <strong>{firstCategory.join(', ')}</strong>
        {savedParams.length > 2
          ? ' и '
          : ''}
        <strong>
          {savedParams.length > 2
            ? restCountToString(savedParams.length - 2)
            : ''}
        </strong>
      </p>
    </section>
  );
}