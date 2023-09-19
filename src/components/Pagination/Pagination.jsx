import PropTypes from 'prop-types';

import style from './Pagination.module.css';

const Pagination = ({ setCurrentPage, currentPage, pages }) => {
  return (
    <div className={style.container}>
      {pages.map((page, index, value) => {
        return (
          <button
            key={value}
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

Pagination.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
};
