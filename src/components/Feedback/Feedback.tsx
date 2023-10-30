import styles from './styles/styles.module.css';

export type TFeedbackProps = {
  onClick: () => void;
};

function Feedback({ onClick }: TFeedbackProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={styles.form}
      action="submit"
    >
      <h2 className={styles.formHeading}>Поделитесь своим мнением!</h2>
      <p className={styles.formDescription}>
        Расскажите об опыте использования нашего сервиса. Это поможет нам стать лучше
      </p>
      <textarea
        className={styles.formText}
        wrap="soft"
        name=""
        id=""
        placeholder="Хочу особенно выделить ..."
      />
      <button className={styles.button} type="submit" onClick={onClick}>
        Отправить
      </button>
    </form>
  );
}

export default Feedback;
