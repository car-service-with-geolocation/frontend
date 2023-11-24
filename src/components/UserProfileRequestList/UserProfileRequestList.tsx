import { TUserRequestData } from '../../utils/types';
import UserRequestCard from '../UserRequestCard/UserRequestCard';
import styles from './styles/styles.module.css';

interface IUserProfileRequestTable {
  requests: TUserRequestData[];
}

function UserProfileRequestList({ requests }: IUserProfileRequestTable) {
  return (
    <ul className={styles.requestList}>
      {requests.map((item) => {
        return (
          <li key={item.id} className={styles.requestList__item}>
            <UserRequestCard requestData={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default UserProfileRequestList;
