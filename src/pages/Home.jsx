import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import CigaretBlock from '../components/CigaretBlock';
import Skeleton from '../components/CigaretBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

const Home = () => {
  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = id => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  };

  const sortBy = sort.sortProperty.replace('-', '');
  const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://645177bea322196911640982.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then(res => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [category, sortBy, order, search, currentPage]);

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
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Весь товар</h2>
      <div className="content__items">{isLoading ? skeletons : cigaret}</div>
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
