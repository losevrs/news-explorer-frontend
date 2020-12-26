import React, { useState } from 'react';
import { DataContextProvider } from '../../contexts/DataContext';
import { Route, Switch, useHistory } from 'react-router-dom';

import { getNews } from '../../utils/NewsApi';

import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';

export default function App() {
  const [userData, setUserData] = useState({
    user: { _id: '', email: '', password: '', name: 'Родион' },
    searchResult: null,
    activeCards: [ // инициализируем тестовыми данными (но запрос уже работает тоже)
      {
        author: "Onliner",
        content: null,
        description: "В Бресте вчера вечером приключилась интересная и опасная история с участием вагона щебенки и семерых щенков. Прохожая заметила псов с моста над путями. Забеспокоилась: сколько времени животные находились в этой ловушке без еды и воды — непонятно, выбраться са…",
        publishedAt: "2020-12-01T07:13:42Z",
        source: { id: null, name: "Onliner.by" },
        title: "Вагон и семеро щенков. Странная история из Бреста",
        url: "https://people.onliner.by/2020/12/01/vagon-i-semero-shhenkov",
        urlToImage: "https://content.onliner.by/news/default/e5918eae0f58b24a4b2a62460c8697f2.jpeg",
      },
      {
        author: "https://rightmusicvideo.d3.ru",
        content: null,
        description: "https://www.youtube.com/watch?v=jG3znw-t_08↵↵↵↵ ↵↵Написал mku↵ на rightmusicvideo.d3.ru↵ /↵ комментировать",
        publishedAt: "2020-11-28T16:24:11Z",
        source: {id: null, name: "Rightmusicvideo.d3.ru"},
        title: "Небо полное звезд",
        url: "https://rightmusicvideo.d3.ru/nebo-polnoe-zvezd-2077409/",
        urlToImage: "https://cdn.jpg.wtf/futurico/c6/d1/1606579961-c6d1b502945ecd6e848b745f4d0e1371.jpeg",
      },
      {
        author: "https://zakat.d3.ru",
        content: null,
        description: "https://prokipr.pro↵ ↵↵ Как всегда декабрь дарит красивое небо.↵↵↵ ↵↵Написал Mnemon↵ на zakat.d3.ru↵ /↵ комментировать",
        publishedAt: "2020-12-12T18:09:33Z",
        source: { id: null, name: "Zakat.d3.ru" },
        title: "Декабрьский закат на Кипре",
        url: "https://zakat.d3.ru/dekabrskii-zakat-na-kipre-2086376/",
        urlToImage: "https://cdn.jpg.wtf/futurico/57/6f/1607795688-576f523ce13596fc803e0ed618abca03.jpeg",
      }
    ],
  });

  const [loggedIn, setLoggedIn] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const [showNotFound, setShowNotFound] = useState(true);
  const [showSearchResult, setShowSearchResult] = useState(true);

  const searchSubmitHandler = (searchValue) => {
    getNews(searchValue)
      .then((res) => {
        const newUserdata = { ...userData };
        newUserdata.searchResult = res;
        newUserdata.activeCards = res.articles.slice(0, 5);
        setUserData(newUserdata);
        console.log(userData.searchResult);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <DataContextProvider value={userData}>
      <div className="application">

        <Switch>

          <Route exact path='/'>
            <Main
              loggedIn={loggedIn}
              onSubmit={searchSubmitHandler}
              showPreloader={showPreloader}
              showNotFound={showNotFound}
              showSearchResult={showSearchResult}
            />
          </Route>

          <Route path='/saved-news'>
            <SavedNews
              loggedIn={loggedIn}
            />
          </Route>

          <Route
            path='/fb'
            component={() => {
              window.location.href = 'https://www.facebook.com';
              return null;
            }}
          />
          <Route
            path='/gh'
            component={() => {
              window.location.href = 'https://www.github.com';
              return null;
            }}
          />
          <Route
            path='/yap'
            component={() => {
              window.location.href = 'https://praktikum.yandex.ru';
              return null;
            }}
          />

        </Switch>

      </div>
    </DataContextProvider>
  );
}