import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={e => onChangePage(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      forcePage={currentPage}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
