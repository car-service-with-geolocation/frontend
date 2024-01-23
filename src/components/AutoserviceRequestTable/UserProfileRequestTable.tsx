import React, { ReactElement, useRef } from 'react';

import { TUserRequestData } from '../../utils/types';
import styles from './styles/styles.module.css';

interface IUserProfileRequestTable {
  requests: TUserRequestData[];
}

function UserProfileRequestTable({ requests }: IUserProfileRequestTable) {
  const lastDate = useRef('');

  function addDateRow(req: TUserRequestData): ReactElement | null {
    if (req.pub_date) {
      const date = new Date(req.pub_date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      if (date !== lastDate.current) {
        lastDate.current = date;
        return (
          <tr>
            <td colSpan={4} className={styles.body__date}>
              {`Дата ${date}`}
            </td>
          </tr>
        );
      }
      return null;
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
          <th className={`${styles.head__cell} ${styles.cell_textCenter}`}>Статус</th>
        </tr>
      </thead>
      <tbody className={styles.table__body}>
        {requests.map((item) => {
          const dateElement = addDateRow(item);
          return (
            <React.Fragment key={item.id}>
              {dateElement}
              <tr className={styles.body__row}>
                <td className={styles.body__cell}>{item.info}</td>
                <td className={styles.body__cell}>{item.car}</td>
                <td className={styles.body__cell}>{item.task}</td>
                <td className={`${styles.body__cell} ${styles.cell_textCenter}`}>
                  {item.id}
                </td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

export default UserProfileRequestTable;
