import styles from "./RadioButton.module.css";
const RadioButton = () => {
  return (
    <div className={styles.radio__button}>
      <label className={styles.radio}>
        <input type="radio" value="first" name="date" />
        Select date
        <span></span>
      </label>
    </div>
  );
};

export default RadioButton;
