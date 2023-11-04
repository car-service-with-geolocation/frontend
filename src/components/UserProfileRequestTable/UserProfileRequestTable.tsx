import styles from './styles/styles.module.css';

export type TUserRequestData = {
  id: number;
  autoservice: string;
  carmodel: string;
  problem: string;
  status: string;
};
type TUserProfileRequestTable = {
  requests: TUserRequestData[];
};

export function UserProfileRequestTable({ requests }: TUserProfileRequestTable) {
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
        <tr>
          <td colSpan={4} className={styles.body__date}>
            Дата 20.20.1000
          </td>
        </tr>
        {requests.map((item) => {
          return (
            <tr key={item.id} className={styles.body__row}>
              <td className={styles.body__cell}>{item.autoservice}</td>
              <td className={styles.body__cell}>{item.carmodel}</td>
              <td className={styles.body__cell}>{item.problem}</td>
              <td className={styles.body__cell}>{item.status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
