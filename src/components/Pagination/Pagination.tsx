import { Dispatch, SetStateAction } from 'react';

import style from './Pagination.module.css';

type TPropsPagination = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  pages: number[];
};

const Pagination = ({ setCurrentPage, currentPage, pages }: TPropsPagination) => {
  return (
    <div className={style.container}>
      {pages.map((page) => {
        return (
          <button
            key={page}
            onClick={() => {
              setCurrentPage(page);
            }}
            className={
              page === currentPage ? `${style.link} ${style.link_activ}` : style.link
            }
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
