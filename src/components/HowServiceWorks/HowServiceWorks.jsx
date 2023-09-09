import styles from './style/style.module.css';

function HowServiceWorks() {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.header}>Как работает сервис?</h2>
      <div className={styles.cardsWrapper}>
        <div className={styles.card}>
          <p className={styles.cardStep}>1 шаг</p>
          <h3 className={styles.cardHeader}>Поиск автосервиса</h3>
          <p className={styles.cardDescription}>
            Посмотрите список ближайших автосервисов. Оцените их рейтинги, отзывы и
            расположение, чтобы выбрать подходящий.
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.cardStep}>2 шаг</p>
          <h3 className={styles.cardHeader}>Подача заявки</h3>
          <p className={styles.cardDescription}>
            Выберите дату и время удобные для вас, а затем оставьте заявку. Мы передадим
            ваш запрос автосервису.
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.cardStep}>3 шаг</p>
          <h3 className={styles.cardHeader}>Подтверждение заявки</h3>
          <p className={styles.cardDescription}>
            После успешного оформления заявки автосервис свяжется с вами для подтверждения
            даты и времени обслуживания.
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.cardStep}>4 шаг</p>
          <h3 className={styles.cardHeader}>Обратная связь</h3>
          <p className={styles.cardDescription}>
            Поделитесь своим мнением об оказанной услуге. Расскажите о вашем опыте,
            помогая другим пользователям выбрать лучший автосервис.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowServiceWorks;
