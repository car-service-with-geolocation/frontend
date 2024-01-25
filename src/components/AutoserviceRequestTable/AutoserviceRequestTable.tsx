import { TUserRequestData } from '../../utils/types';
import styles from './styles/styles.module.css';

interface IAutoserviceRequestTable {
  requests: TUserRequestData[];
}

function AutoserviceRequestTable({ requests }: IAutoserviceRequestTable) {
  function addDateRow(req: TUserRequestData): string {
    if (req.pub_date) {
      const date = new Date(req.pub_date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      return date;
    }
    return 'Нет данных';
  }

  return (
    <table className={styles.table}>
      <thead className={styles.table__head}>
        <tr className={styles.head__row}>
          <th className={styles.head__cell}>№</th>
          <th className={styles.head__cell}>Дата</th>
          <th className={styles.head__cell}>Контакты</th>
          <th className={styles.head__cell}>Автомобиль</th>
          <th className={styles.head__cell}>Описание проблемы</th>
          <th className={styles.head__cell}>Статус</th>
        </tr>
      </thead>
      <tbody className={styles.table__body}>
        {requests.map((item) => {
          const date = addDateRow(item);
          return (
            <tr key={item.id} className={styles.body__row}>
              <td className={styles.body__cell}>{item.id}</td>
              <td className={styles.body__cell}>{date}</td>
              <td className={styles.body__cell}>{item.info}</td>
              <td className={styles.body__cell}>{item.car}</td>
              <td className={styles.body__cell}>{item.task}</td>
              <td className={styles.body__cell}>{item.id}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default AutoserviceRequestTable;
