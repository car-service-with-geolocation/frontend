import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store';
import { fetchUserRequestsData } from '../../store/userRequestsSlice';
import { userRequestPerPage } from '../../utils/constants';
import { TUserRequestData } from '../../utils/types';
import useWindowWidth from '../../utils/windowWidth';
import Preloader from '../Preloader/Preloader';
import UserProfileRequestList from '../UserProfileRequestList/UserProfileRequestList';
import UserProfileRequestTable from '../UserProfileRequestTable/UserProfileRequestTable';
import styles from './styles/styles.module.css';

function UserProfileRequest() {
  // pagination state
  const [itemOffset, setItemOffset] = useState(0);
  const [userRequestData, setUserRequestData] = useState<TUserRequestData[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const dispatch = useAppDispatch();
  const userRequestsStatus = useAppSelector((store) => store.userRequests.status);

  const userRequests = useAppSelector((store) => store.userRequests.data);

  const { width } = useWindowWidth();

  useEffect(() => {
    if (userRequestsStatus === 'idle') {
      dispatch(fetchUserRequestsData());
    }
  }, [dispatch, userRequestsStatus]);

  useEffect(() => {
    const endOffset = itemOffset + userRequestPerPage;
    setUserRequestData(userRequests.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(userRequests.length / userRequestPerPage));
  }, [itemOffset, userRequests]);
  // pagination
  const handlePageClick = (evt: { selected: number }) => {
    const newOffset = (evt.selected * userRequestPerPage) % userRequests.length;
    setItemOffset(newOffset);
  };

  return (
    <section className={styles.userRequest}>
      <h1 className={styles.title}>Мои заявки</h1>
      {userRequestsStatus === 'loading' && <Preloader />}
      {userRequestData.length !== 0 && width > 900 ? (
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
        activeLinkClassName={styles.link_active}
        breakClassName={`${styles.link} ${styles.break}`}
      />
      {userRequests.length === 0 && userRequestsStatus !== 'loading' && (
        <div className={styles.noRequestsView}>
          <h3 className={styles.noRequestsView__title}>У вас еще нет заявок.</h3>
          <p className={styles.noRequestsView__text}>Самое время начать</p>
          <NavLink to="/search" className={styles.userRequest_btn}>
            Поиск автосервисов
          </NavLink>
        </div>
      )}
    </section>
  );
}

export default UserProfileRequest;
