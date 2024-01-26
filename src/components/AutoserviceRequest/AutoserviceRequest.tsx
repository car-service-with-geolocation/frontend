import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { useAppDispatch, useAppSelector } from '../../store';
import selectUserRequests from '../../store/selectors';
import { fetchUserRequestsData } from '../../store/userRequestsSlice';
import { autoserviceRequestPerPage } from '../../utils/constants';
import { TUserRequestData } from '../../utils/types';
import AutoserviceRequestTable from '../AutoserviceRequestTable/AutoserviceRequestTable';
import Preloader from '../Preloader/Preloader';
import styles from './styles/styles.module.css';

function AutoserviceRequest() {
  // pagination state
  const [itemOffset, setItemOffset] = useState(0);
  const [userRequestData, setUserRequestData] = useState<TUserRequestData[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const dispatch = useAppDispatch();
  const userRequestsStatus = useAppSelector((store) => store.userRequests.status);

  const userRequests = useAppSelector((store) => selectUserRequests(store));

  useEffect(() => {
    if (userRequestsStatus === 'idle') {
      dispatch(fetchUserRequestsData());
    }
  }, [dispatch, userRequestsStatus]);

  useEffect(() => {
    const endOffset = itemOffset + autoserviceRequestPerPage;
    setUserRequestData(userRequests.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(userRequests.length / autoserviceRequestPerPage));
  }, [itemOffset, userRequests]);
  // pagination
  const handlePageClick = (evt: { selected: number }) => {
    const newOffset = (evt.selected * autoserviceRequestPerPage) % userRequests.length;
    setItemOffset(newOffset);
  };

  return (
    <section className={styles.userRequest}>
      <h1 className={styles.title}>Заявки автосервиса</h1>
      {userRequestsStatus === 'loading' ? (
        <Preloader />
      ) : (
        <AutoserviceRequestTable requests={userRequestData} />
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
        activeLinkClassName={styles.link_active}
        breakClassName={`${styles.link} ${styles.break}`}
      />
      {userRequests.length === 0 && userRequestsStatus !== 'loading' && (
        <div className={styles.noRequestsView}>
          <h3 className={styles.noRequestsView__title}>У вас еще нет заявок.</h3>
        </div>
      )}
    </section>
  );
}

export default AutoserviceRequest;
