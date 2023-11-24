import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { userRequestPerPage } from '../../utils/constants';
import { TUserRequestData } from '../../utils/types';
import useWindowWidth from '../../utils/windowWidth';
import UserProfileRequestList from '../UserProfileRequestList/UserProfileRequestList';
import UserProfileRequestTable from '../UserProfileRequestTable/UserProfileRequestTable';
import requestdata from './requestdata';
import styles from './styles/styles.module.css';

function UserProfileRequest() {
  // pagination state
  const [itemOffset, setItemOffset] = useState(0);
  const [userRequestData, setUserRequestData] = useState<TUserRequestData[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const { width } = useWindowWidth();

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

  return (
    <section className={styles.userRequest}>
      <h1 className={styles.title}>Мои заявки</h1>
      {width > 900 ? (
        <UserProfileRequestTable requests={userRequestData} />
      ) : (
        <UserProfileRequestList requests={userRequestData} />
      )}
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
    </section>
  );
}

export default UserProfileRequest;
