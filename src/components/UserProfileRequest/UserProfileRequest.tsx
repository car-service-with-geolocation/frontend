import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { userRequestPerPage } from '../../utils/constants';
import {
  TUserRequestData,
  UserProfileRequestTable,
} from '../UserProfileRequestTable/UserProfileRequestTable';
import { requestdata } from './requestdata';
import styles from './styles/styles.module.css';

function UserProfileRequest() {
  // const [screenWidth, setScreenWidth] = useState('');
  // pagination state
  const [itemOffset, setItemOffset] = useState(0);
  const [userRequestData, setUserRequestData] = useState<TUserRequestData[]>([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setUserRequestData(requestdata);
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + userRequestPerPage;
    setUserRequestData(requestdata.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(requestdata.length / userRequestPerPage));
  }, [itemOffset]);
  // pagination
  const handlePageClick = (evt: { selected: number }) => {
    const newOffset = (evt.selected * userRequestPerPage) % requestdata.length;
    setItemOffset(newOffset);
  };

  // function windowWidth() {
  //   const width = window.innerWidth;

  //   if (width >= 1100) {
  //     setScreenWidth('desktop');
  //   } else {
  //     setScreenWidth('mobile');
  //   }
  // }

  return (
    <div className={styles.userRequest}>
      <h1 className={styles.title}>Мои заявки</h1>
      <UserProfileRequestTable requests={userRequestData} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=""
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel=""
        renderOnZeroPageCount={null}
        containerClassName={styles.pagination}
        pageLinkClassName={styles.link}
        previousLinkClassName={`${styles.prevlink} ${styles.arrowlink}`}
        nextLinkClassName={`${styles.nextlink} ${styles.arrowlink}`}
        activeLinkClassName={styles.link_activ}
        breakClassName={`${styles.link} ${styles.break}`}
      />
    </div>
  );
}

export default UserProfileRequest;
