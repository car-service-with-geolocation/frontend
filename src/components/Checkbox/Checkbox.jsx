import PropTypes from 'prop-types';

import styles from './styles/styles.module.css';

function Checkbox({ isChecked, label, checkHandler, index }) {
  // console.log(isChecked);
  return (
    <div className={styles.phoneInfo}>
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

Checkbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  checkHandler: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
