import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import CigaretBlock from '../components/CigaretBlock';
import Skeleton from '../components/CigaretBlock/Skeleton';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности (DESC)',
    sortProperty: 'rating',
  });

  const sortBy = sortType.sortProperty.replace('-', '');
  const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const category = categoryId > 0 ? `category=${categoryId}` : '';

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://645177bea322196911640982.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then(res => res.json())
      .then(arr => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={id => setCategoryId(id)}
        />
        <Sort value={sortType} onChangeSort={id => setSortType(id)} />
      </div>
      <h2 className="content__title">Весь товар</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map(obj => <CigaretBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
