import React, { useState } from 'react';

import './CardTool.css';

export default function CardTool(props) {
  const [chacked, setChacked] = useState(false);

  const notLoggedIn = 'Войдите, чтобы сохранять статьи';
  const deleteNews = 'Убрать из сохранённых';

  const onClickHandler = () => {
    setChacked(!chacked);
  }

  const mainClasses = ['card-tool'];
  const toolClasses = ['card-tool__tool'];

  switch (props.type) {
    case 'main':
      toolClasses.push('card-tool__tool_add');
      break;
    case 'seved-news':
      mainClasses.push('card-tool_del');
      toolClasses.push('card-tool__tool_del');
      break;
    default:
      break
  }

  if (!props.loggedIn) {
    mainClasses.push('card-tool_disabled');
    toolClasses.push('card-tool__tool_add-disabled')
  }

  return (
    <div className={mainClasses.join(' ')}>
      <div className={`${toolClasses.join(' ')} ${props.type === 'main' && chacked ? 'card-tool__tool_add-checked' : ''} `}
        onClick={onClickHandler}></div>
      <div className='card-tool__tool card-tool__tool_tooltip'>
        <p className='card-tool__tool-text'>
          {props.type === 'main' ? notLoggedIn : deleteNews}
        </p>
      </div>
    </div>
  );
}