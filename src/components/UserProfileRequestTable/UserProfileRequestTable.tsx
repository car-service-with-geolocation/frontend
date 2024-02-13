import React, { ReactElement, useRef } from 'react';

import { dataConversion, setStatus } from '../../utils/conversions';
import { TUserRequestData } from '../../utils/types';
import styles from './styles/styles.module.css';

interface IUserProfileRequestTable {
  requests: TUserRequestData[];
}

function UserProfileRequestTable({ requests }: IUserProfileRequestTable) {
  const lastDate = useRef('');

  function addDateRow(req: TUserRequestData): ReactElement | null {
    if (req.pub_date) {
      const date = dataConversion(req.pub_date);
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
                <td className={styles.body__cell}>
                  {item.autoservice_name || 'Нет данных'}
                </td>
                <td className={styles.body__cell}>{item.car || 'Нет данных'}</td>
                <td className={styles.body__cell}>{item.task || 'Нет данных'}</td>
                <td className={`${styles.body__cell} ${styles.cell_textCenter}`}>
                  {setStatus(item.status)}
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
