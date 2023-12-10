import { ReactElement, useRef } from 'react';

import { TUserRequestData } from '../../utils/types';
import styles from './styles/styles.module.css';

interface IUserProfileRequestTable {
  requests: TUserRequestData[];
}

function UserProfileRequestTable({ requests }: IUserProfileRequestTable) {
  const lastDate = useRef<string>('');
  function addDateRow(req: TUserRequestData): ReactElement | null {
    if (req.pub_date && req.pub_date === String(lastDate)) {
      // lastDate = req.pub_date;
      return (
        <tr>
          <td colSpan={4} className={styles.body__date}>
            Дата 20.20.1000
          </td>
        </tr>
      );
    }
    return null;
  }
  return (
    <table className={styles.table}>
      <thead className={styles.table__head}>
        <tr className={styles.head__row}>
          <th className={styles.head__cell}>Автосервис</th>
          <th className={styles.head__cell}>Данные авто</th>
          <th className={styles.head__cell}>Описание проблемы</th>
          <th className={styles.head__cell}>Статус</th>
        </tr>
      </thead>
      <tbody className={styles.table__body}>
        {requests.map((item) => {
          const dateElement = addDateRow(item);
          return (
            <>
              {dateElement}
              <tr key={item.id} className={styles.body__row}>
                <td className={styles.body__cell}>{item.info}</td>
                <td className={styles.body__cell}>{item.car}</td>
                <td className={styles.body__cell}>{item.task}</td>
                <td className={styles.body__cell}>{item.id}</td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
}

export default UserProfileRequestTable;
