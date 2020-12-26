import React, { useState, useEffect } from 'react';

import './CardTool.css';

export default function CardTool(props) {
  const [chacked, setChacked] = useState(false);

  const notLoggedIn = 'Войдите, чтобы сохранять статьи';
  const deleteNews = 'Убрать из сохранённых';

  useEffect(() => {
    if (props.isSaved) {
      setChacked(true);
    };
  }, [props.isSaved]);

  const onClickHandler = () => {
    setChacked(!chacked);
  }

  return (
    // card-tool_disabled   card-tool__tool_add-disabled card-tool_del
    <div className='card-tool card-tool_disabled'>
      <div className={`card-tool__tool card-tool__tool_add ${chacked ? 'card-tool__tool_add-checked' : ''} `}
        onClick={onClickHandler}></div>
      <div className='card-tool__tool card-tool__tool_tooltip'>
        <p className='card-tool__tool-text'>
          {props.mode === 'searched' ? notLoggedIn : deleteNews}
        </p>
      </div>
    </div>
  );
}