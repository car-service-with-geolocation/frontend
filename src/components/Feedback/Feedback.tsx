import styles from './styles/styles.module.css';

function Feedback() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={styles.form}
      action="submit"
    >
      <h2 className={styles.formHeading}>Ваше мнение для нас важно!</h2>
      <p className={styles.formDescription}>
        Поделитесь опытом использования нашего сервиса. Это поможет нам стать лучше
      </p>
      <textarea
        className={styles.formText}
        wrap="soft"
        name=""
        id=""
        placeholder="Хочу особенно выделить ..."
      />
      <input className={styles.button} type="submit" />
    </form>
  );
}

export default Feedback;
