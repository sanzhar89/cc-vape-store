import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import CigaretBlock from '../components/CigaretBlock';
import Skeleton from '../components/CigaretBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'популярности ↓',
    sortProperty: 'rating',
  });

  const sortBy = sortType.sortProperty.replace('-', '');
  const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://645177bea322196911640982.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then(res => res.json())
      .then(arr => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sortBy, order, searchValue, currentPage]);

  const cigaret = items
    .filter(obj => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map(obj => <CigaretBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

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
      <div className="content__items">{isLoading ? skeletons : cigaret}</div>
      <Pagination onChangePage={number => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
