import styles from './styles/styles.module.css';

type TPropsCheckbox = {
  label: string;
  isChecked: boolean;
  checkHandler: () => void;
  index: number;
};

function Checkbox({ isChecked, label, checkHandler, index }: TPropsCheckbox) {
  return (
    <div className={styles.container}>
      <label
        className={`${styles.label} ${
          isChecked ? styles.checkboxLabel_active : styles.checkboxLabel
        } `}
        htmlFor={`checkbox-${index}`}
      >
        <input
          className={styles.checkbox}
          type="checkbox"
          name={label}
          id={`checkbox-${index}`}
          checked={isChecked}
          onChange={checkHandler}
        />
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
